const Gig = require('../models/Gig');
const User = require('../models/User');
const { getDistance } = require('geolib');


exports.createGig = async (req, res) => {
  try {
    const { title, description, priceRange, location } = req.body;
    
    
    if (!location || !location.lat || !location.lon) {
      return res.status(400).json({ error: 'Location with latitude and longitude is required.' });
    }

    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude in location.' });
    }

    const newGig = await Gig.create({
      customerId: req.user.id,
      title,
      description,
      priceRange,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude], // GeoJSON format [lon, lat]
      },
    });
    res.status(201).json(newGig);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
    
  }
};


exports.getGigs = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude.' });
    }

    // Fetch all open gigs
    const gigs = await Gig.find();

    // Filter gigs within a 5 km radius
    const nearbyGigs = gigs.filter((gig) => {
      if (!gig.location || !gig.location.coordinates) return false;

      const [gigLon, gigLat] = gig.location.coordinates;
      const distance = getDistance(
        { latitude, longitude },
        { latitude: gigLat, longitude: gigLon }
      );

      return distance <= 5000; // Distance in meters (5 km)
    });

    if (nearbyGigs.length === 0) {
      return res.status(404).json({ message: 'No gigs found nearby.' });
    }
    // console.log(nearbyGigs, latitude, longitude);
    
    res.status(200).json(nearbyGigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGigById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Gig ID is required.' });
    }

    // Find the gig by ID
    const gig = await Gig.findById(id);

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found.' });
    }

    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getGigByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user
    console.log(userId);
    
    // Find all gigs where the customerId is the logged-in user
    const gigs = await Gig.find({ customerId: userId });

    if (gigs.length === 0) {
      return res.status(404).json({ error: 'No gigs found for this user.' });
    }

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.bidOnGig = async (req, res) => {
  try {
    const { bidAmount } = req.body;
    const gigId = req.params.id;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    // Check if the user has already placed a bid
    const existingBid = gig.bids.find((bid) => bid.ecoHeroId.toString() === req.user.id);
    if (existingBid) {
      return res.status(400).json({ message: 'You have already placed a bid on this gig' });
    }
    const user = await User.findById(req.user.id);
    // Add the new bid
    gig.bids.push({
      ecoHeroId: req.user.id,
      bidAmount,
      bidEcoHero: user.name,
      status: 'pending',
    });

    // Update finalBidAmt to the new bidAmount
   

    // Save the gig with the new bid and finalBidAmt
    await gig.save();

    res.status(201).json({ message: 'Bid placed successfully', gig });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a single bid
exports.deleteBid = async (req, res) => {
  try {
    const { bidId } = req.params; // Bid ID from request parameters
    const gigId = req.params.gigId;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    // Filter out the bid with the given bidId
    const updatedBids = gig.bids.filter((bid) => bid._id.toString() !== bidId);

    if (updatedBids.length === gig.bids.length) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    gig.bids = updatedBids;
    await gig.save();

    res.status(200).json({ message: 'Bid deleted successfully', gig });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all bids for a gig
exports.deleteAllBids = async (req, res) => {
  try {
    const gigId = req.params.id;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    gig.bids = []; // Clear all bids
    await gig.save();

    res.status(200).json({ message: 'All bids deleted successfully', gig });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.assignGigToUser = async (req, res) => {
  try {
    const { userId, bidAmount } = req.body;
    const { gigId} = req.params;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user is an EcoHero
    if (user.role !== 'ecohero') {
      return res.status(400).json({ message: 'Only EcoHeroes can be assigned gigs' });
    }

    // Find the gig
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    gig.finalBidAmt = bidAmount;
    gig.finalEcoHero = user.name

    // Check if the gig is already assigned
    if (gig.status === 'approved') {
      return res.status(400).json({ message: 'This gig is already assigned' });
    }

    // Assign the gig
    user.assignedGigs.push(gigId);
    await user.save();

    // Update gig status to 'assigned'
    gig.status = 'approved';
    gig.assignedTo = userId;
    await gig.save();

    res.status(200).json({ message: 'Gig assigned successfully', user, gig });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAssignedGigs = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user and populate assigned gigs
    const user = await User.findById(userId).populate('assignedGigs');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ assignedGigs: user.assignedGigs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    type: {
      type: String, // GeoJSON type
      enum: ['Point'], // Must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  title: { type: String, required: true },
  description: { type: String },
  priceRange: {
    min: Number,
    max: Number,
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'approved'],
    default: 'open',
  },
  assignedTo : {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  bids: [
    {
      ecoHeroId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      bidAmount: Number,
      bidEcoHero: String,
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
      },
      bidDate: { type: Date, default: Date.now },
    },
  ],
  finalBidAmt: Number,
  finalEcoHero: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create geospatial index for the location field
gigSchema.index({ location: '2dsphere' });

const Gig = mongoose.model('Gig', gigSchema);

module.exports = Gig;

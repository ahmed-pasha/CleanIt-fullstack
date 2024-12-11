import React, { useState } from 'react';
import { bidOnGig } from '../../api/gigs';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BidForm = ({ gigId, onBidPlaced, gig }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  const handleBid = async () => {
    if (!bidAmount || bidAmount <= 0 ) {
      setError('Please enter a valid bid amount');
      return;
    }
    if ( bidAmount > gig.priceRange.max ) {
      setError('Please enter bid amount more than minimum ', gig.priceRange.min);
      return;
    }

    try {
      // Call the bidOnGig function to place the bid
      
      const response = await bidOnGig(gigId, bidAmount );
      // Update bids list after successful bid
      onBidPlaced(response.gig.bids);
      setBidAmount(''); // Clear the input field
      setError(''); // Clear any previous error messages
      toast.success("Bid added successfully !!")
    } catch (error) {
      setError(error.response.data.message || 'Failed to place bid');
      toast.error(error.response.data.message || 'Failed to place bid')
      // console.log(error.response.data.message);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Place Your Bid</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid amount"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleBid}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit Bid
        </button>
      </div>
    </div>
  );
};

export default BidForm;

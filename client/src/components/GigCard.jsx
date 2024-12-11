import React from 'react';

const GigCard = ({ gig }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold">{gig.title}</h3>
      <p className="text-gray-700">{gig.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Price Range: ${gig.priceRange.min} - ${gig.priceRange.max}
        </span>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded boarder">
          Bid Now
        </button>
      </div>
    </div>
  );
};

export default GigCard;

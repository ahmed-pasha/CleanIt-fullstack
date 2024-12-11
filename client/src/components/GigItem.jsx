import React from 'react';
import { Link } from 'react-router-dom';

const GigItem = ({ gig }) => {
  return (
    <div className="border p-4 mb-4 rounded-lg shadow-md">
      <Link to={"/gigs/"+gig._id} className="text-xl font-bold">{gig.title}</Link>
      <p>{gig.description}</p>
      <p>
        Price: ₹{gig.priceRange.min} - ₹{gig.priceRange.max}
      </p>

      {
        gig.status === 'approved' ?
        <p className="text-red-500 p-1 rounded border w-32">Closed</p>
        :
        <p className="text-green-500 border rounded p-1">Open to bid</p>
      }
    </div>
  );
};

export default GigItem;

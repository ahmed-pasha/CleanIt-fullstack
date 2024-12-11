import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {getAssignedGigs} from '../api/gigs'
import { Link } from 'react-router-dom';
const AssignedGigsCard = () => {
  const { user } = useAuth(); // Get user details from context
  const [assignedGigs, setAssignedGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'ecohero') {
      const fetchAssignedGigs = async () => {
        try {
          setLoading(true);
          const gigs = await getAssignedGigs(user._id); // Fetch gigs assigned to the user
          setAssignedGigs(gigs);
        } catch (err) {
          setError('Failed to fetch assigned gigs');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchAssignedGigs();
    }
  }, [user]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-100 transition duration-200">
      <h3 className="text-lg font-medium text-blue-600">Gigs Assigned to You</h3>
      {loading ? (
        <p className="text-sm text-gray-600 mt-2">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      ) : assignedGigs.length > 0 ? (
        <ul className="mt-4 text-left">
          {/* {assignedGigs.map((gig) => (
            <li
              key={gig._id*2}
              className="p-2 border-b border-gray-200 last:border-none flex felx-col gap-2"
            >
              <Link to={'/gigs/ecoHero/'+gig._id} className="text-gray-800 font-semibold">{gig.title}</Link>
              <Link to={'/gigs/ecoHero/'+gig._id} className="text-gray-500 text-sm">Status: {gig.status}</Link>
            </li>
          ))} */}
           {assignedGigs.map((gig) => (
            <li
              key={gig._id}
              className="p-4 border-b border-gray-200 last:border-none flex flex-col gap-2"
            >
              <Link to={`/gigs/ecoHero/${gig._id}`} className="text-gray-800 font-semibold">{gig.title}</Link>
              <p className="text-gray-500 text-sm">Status: {gig.status}</p>
              <p className="text-gray-500 text-sm">Description: {gig.description}</p>
            {gig.finalEcoHero &&  <p className="text-gray-500 text-sm">Final EcoHero: {gig.finalEcoHero}</p>}
              {gig.finalBidAmt &&  <p className="text-gray-500 text-sm">Final Bid Amount: ₹{gig.finalBidAmt}</p>}
              <p className="text-gray-500 text-sm">Price Range: ₹{gig.priceRange.min} - ₹{gig.priceRange.max}</p>
              <p className="text-gray-500 text-sm">Location: ({gig.location.coordinates[0]}, {gig.location.coordinates[1]})</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600 mt-2">No gigs assigned yet.</p>
      )}
    </div>
  );
};

export default AssignedGigsCard;

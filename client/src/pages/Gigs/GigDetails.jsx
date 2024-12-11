import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiurl } from "../../api";
import { useAuth } from "../../context/AuthContext";
import BidForm from "./BidForm"; // Import the BidForm component
import { assignGigToUser } from "../../api/gigs";
import { toast } from "react-toastify";

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Get user details from Auth Context
  const [gig, setGig] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  const handleAssign = async (ecoHeroId, bidAmount) => {
    try {
      const gigId = gig._id;

      // Construct the payment details object
      const paymentDetails = {
        gigId,
        ecoHeroId,
        amount: bidAmount,
      };

      // Call the API to assign the gig to the user
      const res = await assignGigToUser(gigId, ecoHeroId, bidAmount);
      console.log(res);

      // Store the payment details in localStorage
      localStorage.setItem("payment", JSON.stringify(paymentDetails));

      // Navigate to the payments page for the specific gig
      navigate(`/payments/${gigId}`);
    } catch (error) {
      console.error("Error assigning the gig:", error);
      toast.error("Failed to assign the gig.");
    }
  };

  useEffect(() => {
    const fetchGigDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/gigs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setGig(data);
          setBids(data.bids || []); // Extract bids if available
        } else {
          setError("Failed to fetch gig details.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigDetails(); // Fetch gig details on mount or when ID changes
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{gig.title}</h1>
      <p>{gig.description}</p>
      <p>
        Price Range: ₹{gig.priceRange?.min} - ₹{gig.priceRange?.max}
      </p>
      <p>Status: {gig.status}</p>

      {/* Display the list of bids for everyone */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Bids</h2>
        {bids.length > 0 ? (
          <ul>
            {bids.map((bid, index) => (
              <li
                key={index}
                className="mb-2 p-2 border rounded-lg shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>EcoHero:</strong> {bid.bidEcoHero}
                    </p>
                    <p>
                      <strong>Bid Amount:</strong> ₹{bid.bidAmount}
                    </p>
                    <p>
                      <strong>Status:</strong> {bid.status}
                    </p>
                  </div>

                  {/* Show Approve button for the gig owner */}
                  {user?._id === gig.customerId && gig.status !== "approved" && (
                    <button
                      className="text-lg font-bold bg-green-500 rounded-md p-1 h-10 shadow-sm"
                      onClick={() => handleAssign(bid.ecoHeroId, bid.bidAmount)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bids yet.</p>
        )}
      </div>

      {/* Show BidForm for EcoHero role */}
      {user?.role === "ecohero" && gig.status !== "approved" && (
        <BidForm gigId={gig._id} gig={gig} onBidPlaced={setBids} />
      )}
    </div>
  );
};

export default GigDetails;

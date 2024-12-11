import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bidOnGig, fetchGigsById } from '../../api/gigs';
import { createPayment } from '../../api/payments';
import { toast } from 'react-toastify';

const PaymentDetails = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [gigs, setGigs] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const gigDetails = await fetchGigsById(id);
        setGigs(gigDetails);
        console.log(gigDetails);
        
        const data = JSON.parse(localStorage.getItem('payment'));
        setPayment(data);
      } catch (error) {
        console.error('Error fetching payment or gig details:', error);
      }
    };

    fetchPaymentDetails();
  }, [id]);

  const handleAssign = async()=>{
    try {
      const gigId = gigs._id
      const ecoHeroId = payment.ecoHeroId;
      const amount = payment.amount;
      console.log(gigId, ecoHeroId, amount);

   
      
      const result = await createPayment({gigId, ecoHeroId, amount});
      toast.success("Payment initiated  ")
      navigate('/payments')
      setMessage(result.message);
    } catch (err) {
      console.log(err);
      toast.error(err)
    }
  }

  if (!payment || !gigs) return <p className="text-center text-xl text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Payment Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Details */}
        <div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Payment Information</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold text-gray-600">Amount:</span> ₹{payment.amount}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-600">Status:</span> Pending
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-600">Gig ID:</span> {payment.gigId}
            </p>
          </div>
        </div>

        {/* Gig Details */}
        <div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Gig Information</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold text-gray-600">Title:</span> {gigs.title}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-600">Description:</span> {gigs.description}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-600">Location:</span> Lat: {gigs.location.coordinates[0]}, Lon :{gigs.location.coordinates[1]}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-600">Date:</span> {new Date(gigs.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <button className="px-2 py-2 text-lg bg-blue-500 my-5 rounded border font-semibold text-white " onClick={handleAssign}>Pay</button>
    </div>
  );
};

export default PaymentDetails;

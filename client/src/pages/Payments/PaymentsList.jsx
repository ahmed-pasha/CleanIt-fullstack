import React, { useState, useEffect } from "react";
import { completePayment, getPayments } from "../../api/payments";
import { fetchGigsById } from "../../api/gigs";
import { toast } from "react-toastify";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [gigDetails, setGigDetails] = useState({});

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPayments();
        const paymentData = response.payment;

        // Fetch gig details for each payment
        const gigData = {};
        for (const payment of paymentData) {
          const gigDetail = await fetchGigsById(payment.gigId);
          gigData[payment.gigId] = gigDetail;
        }

        setPayments(paymentData);
        setGigDetails(gigData);
      } catch (error) {
        console.error("Error fetching payments or gigs:", error);
      }
    };

    fetchPayments();
  }, []);

  const approvePayment = async (paymentId) => {
    try {
      const response = await completePayment(paymentId);

      // Update the payment status in state
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === paymentId
            ? { ...payment, status: response.payment.status }
            : payment
        )
      );

      // Update the gig status in state (optional if needed)
      const updatedGig = await fetchGigsById(response.payment.gigId);
      setGigDetails((prevGigDetails) => ({
        ...prevGigDetails,
        [response.payment.gigId]: updatedGig,
      }));

      toast.success("Payment approved successfully!");
    } catch (error) {
      console.error("Error approving payment:", error);
      toast.error("Failed to approve payment.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Your Payments
      </h1>
      {payments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Payment Details
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>
                  <span className="font-bold">Amount:</span> ₹{payment.amount}
                </p>
                <p>
                  <span className="font-bold">Status:</span> {payment.status}
                </p>
                <p>
                  <span className="font-bold">Customer ID:</span>{" "}
                  {payment.customerId}
                </p>
                <p>
                  <span className="font-bold">EcoHero ID:</span>{" "}
                  {payment.ecoHeroId}
                </p>
              </div>
              {gigDetails[payment.gigId] && (
                <>
                  <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
                    Gig Details
                  </h3>
                  <div className="text-gray-600 space-y-2">
                    <p>
                      <span className="font-bold">Title:</span>{" "}
                      {gigDetails[payment.gigId].title}
                    </p>
                    <p>
                      <span className="font-bold">Description:</span>{" "}
                      {gigDetails[payment.gigId].description}
                    </p>
                    <p>
                      <span className="font-bold">Price Range:</span> ₹
                      {gigDetails[payment.gigId].priceRange.min} - ₹
                      {gigDetails[payment.gigId].priceRange.max}
                    </p>
                    <p>
                      <span className="font-bold">Status:</span>{" "}
                      {payment.status === "pending" ? (
                        "Payment Pending.."
                      ) : (
                        <div className="text-green-700 font-semibold">
                          Payment Approved ✅
                        </div>
                      )}
                    </p>
                    <p>
                      <span className="font-bold">Created At:</span>{" "}
                      {new Date(
                        gigDetails[payment.gigId].createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {payment.status === "pending" ? (
                    <button
                      onClick={() => approvePayment(payment._id)}
                      className="w-full text-white bg-green-700 hover:bg-green-800 font-semibold px-3 py-2 mt-4 rounded"
                    >
                      Approve Payment
                    </button>
                  ) : (
                    <div className="text-lg text-center text-gray-600 mt-4">
                      Payment Completed
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl mt-16">
          No payments available.
        </div>
      )}
    </div>
  );
};

export default PaymentsList;

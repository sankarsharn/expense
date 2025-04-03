import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { paymentInitiated , paymentSuccess , paymentFailure , paymentVerified , paymentVerificationFailed , updatePaymentStatus} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
const Payment = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser); // Check if user is signed in
    if (!user) {
      return <div>Please sign in to access this page.</div>;
    }
  const handlePayment = async () => {
    dispatch(paymentInitiated());
    try {
      // Step 1: Create an order (call backend API)
      const { data } = await axios.post("http://localhost:4000/api/payment/create-order", {
        amount: 500 * 100,  // Convert ₹500 to paise
        currency: "INR",
      });

      // Step 2: Open Razorpay payment popup
      const options = {
        key: "rzp_test_JcvRejJLTuV3OX", // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: data.id,  // Order ID from backend
        handler: async function (response) {
          // Step 3: Verify payment
          const verifyRes = await axios.post("http://localhost:4000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email: user.email, // Pass user's email to update payment status
          });

          if (verifyRes.data.success) {
            alert("Payment Successful!");
            dispatch(paymentSuccess());
            dispatch(paymentVerified());
            dispatch(updatePaymentStatus());
          } else {
            alert("Payment Failed!");
            dispatch(paymentFailure());
            dispatch(paymentVerificationFailed());
          }
        },
        prefill: {
          name: "Sankarsharn",
          email: "sankarsharn@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Razorpay Payment</h2>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Pay ₹500
      </button>
    </div>
  );
};

export default Payment;

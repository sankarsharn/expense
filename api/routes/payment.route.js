import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../model/user.model.js"; 
dotenv.config();
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Route to create a payment order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `order_rcpt_${Math.floor(Math.random() * 1000000)}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// Route to verify payment signature
router.post("/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;
  
      const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");
  
      if (generatedSignature === razorpay_signature) {
        // ✅ Update user's payment status in DB
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { payment: true },
            { new: true } // This ensures you get the updated document
          );
          
          if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
          }
          
  
        res.json({ success: true, message: "Payment verified and updated successfully" });
      } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error verifying payment", error });
    }
  });



export default router;

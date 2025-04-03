import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import formRoute from "./routes/form.route.js";
import morgan from "morgan";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})

const connectDB = await mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
console.error("Error connecting to MongoDB:", error);
});


app.use("/api/auth" , authRoute);
app.use("/api/form" , formRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ 
        success: false,
        message: message,
        statusCode: statusCode
    });
});
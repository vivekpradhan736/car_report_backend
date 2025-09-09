import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['https://car-report-frontend.vercel.app/'];
// app.use(
//   cors({
//     origin: allowedOrigins, // only allow your frontend
//     credentials: true,         // allow cookies to be sent
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(cors({
origin: (origin, callback) => {
if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
callback(null, true);
} else {
callback(new Error('Not allowed by CORS'));
}
},
credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

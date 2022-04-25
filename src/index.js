import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGOOSE_CREDS);

const app = new express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/pet", petRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Pet adoption app listening on port ${process.env.PORT}...`);
});

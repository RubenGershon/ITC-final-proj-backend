import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import petRoutes from "./routes/petRoutes.js";
import mongoose from "mongoose"


mongoose.connect(
  "mongodb+srv://ruben:1234@petadoption.e0jz5.mongodb.net/PetAdoption?retryWrites=true&w=majority"
);

const app = new express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/pet", petRoutes);

app.listen(8080, () => {
  console.log(`Pet adoption app listening on port ${8080}...`);
});

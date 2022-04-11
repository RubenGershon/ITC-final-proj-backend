import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = new express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log(`Pet adoption app listening on port ${8080}...`);
});

import express from "express";
import petController from "../controllers/petController.js";

const router = express.Router();

router.post("/", petController.add);

export default router;

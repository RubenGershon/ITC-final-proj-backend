import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.put("/:id", userController.update);

export default router;

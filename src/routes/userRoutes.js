import express from "express";
import userController from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const router = express.Router();

router.put("/:id", tokenValidation, userController.update);

export default router;

import express from "express";
import petController from "../controllers/petController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import adminValidation from "../middlewares/adminValidation.js";
import petIdValidation from "../middlewares/petIdValidation.js";
import userValidation from "../middlewares/userValidation.js";
import multer from "multer";

const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

const router = express.Router();
router.use(tokenValidation);

// Admin protected
router.post("/", adminValidation, petController.add);
router.put("/:id", adminValidation, petIdValidation, petController.update);

// Get pet(s) by query
router.get("/", petController.getByQuery);

// Get pet by ID
router.get("/:id", petIdValidation, petController.getById);
router.post("/:id/adopt", userValidation, petIdValidation, petController.adopt);
router.post(
  "/:id/return",
  userValidation,
  petIdValidation,
  petController.returnPet
);
router.post("/:id/save", userValidation, petIdValidation, petController.save);
router.delete("/:id/save", userValidation, petController.unsave);

export default router;

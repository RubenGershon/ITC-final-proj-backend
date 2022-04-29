import express from "express";
import multer from "multer";
import petController from "../controllers/petController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import adminValidation from "../middlewares/adminValidation.js";
import petIdValidation from "../middlewares/petIdValidation.js";
import userValidation from "../middlewares/userValidation.js";

const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

const router = express.Router();
router.use(tokenValidation);

// Admin protected
router.post("/", adminValidation, upload.single("image"), petController.add);
router.put("/:id", adminValidation, petIdValidation, petController.update);

// Get pet(s) by query
router.get("/", petController.getByQuery);

// Get multiple pets by list of IDs
router.get("/byIDs", petController.getByIds);

// Get specific pet by ID
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

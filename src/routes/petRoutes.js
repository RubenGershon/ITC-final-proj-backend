import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import petController from "../controllers/petController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import adminValidation from "../middlewares/adminValidation.js";
import petIdValidation from "../middlewares/petIdValidation.js";
import userValidation from "../middlewares/userValidation.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "PetAdoptionImages",
      allowed_formats: ["jpeg", "png", "jpg"],
      public_id: uuidv4(),
      access_type: "token",
    };
  },
});
const parser = multer({ storage: storage });
const router = express.Router();


// Admin protected
// Post a new pet
router.post(
  "/",
  tokenValidation,
  adminValidation,
  parser.single("image"),
  petController.add
);

// Update existing pet
router.post(
  "/:id",
  tokenValidation,
  adminValidation,
  petIdValidation,
  parser.single("image"),
  petController.update
);

// delete existing gpet
router.delete(
  "/:id",
  tokenValidation,
  adminValidation,
  petIdValidation,
  petController.deletePet
  );
  
// Get pet(s) by query
router.get("/", petController.getByQuery);

// Get multiple pets by list of IDs
router.get("/byIDs", petController.getByIds);

// Get specific pet by ID
router.get("/:id", petIdValidation, petController.getById);
router.post(
  "/:id/adopt",
  tokenValidation,
  userValidation,
  petIdValidation,
  petController.adopt
);
router.post(
  "/:id/return",
  tokenValidation,
  userValidation,
  petIdValidation,
  petController.returnPet
);
router.post(
  "/:id/save",
  tokenValidation,
  userValidation,
  petIdValidation,
  petController.save
);
router.delete(
  "/:id/save",
  tokenValidation,
  userValidation,
  petController.unsave
);



export default router;

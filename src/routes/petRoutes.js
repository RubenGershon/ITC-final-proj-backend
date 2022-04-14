import express from "express";
import petController from "../controllers/petController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import petIdValidation from "../middlewares/petIdValidation.js";

const router = express.Router();
router.use(tokenValidation);

// add a new pet to DB
router.post("/", petController.add);

// Get pet(s) by query
router.get("/", petController.getByQuery);

// Get pet by ID
router.get("/:id", petIdValidation, petController.getById);
router.put("/:id", petIdValidation, petController.update);
router.post("/:id/adopt", petIdValidation, petController.adopt);
router.post("/:id/return", petIdValidation, petController.returnPet);
router.post("/:id/save", petIdValidation, petController.save);
router.delete("/:id/save", petIdValidation, petController.unsave);

export default router;

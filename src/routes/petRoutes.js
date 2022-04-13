import express from "express";
import petController from "../controllers/petController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const router = express.Router();

router.post("/", tokenValidation, petController.add);
router.get("/", tokenValidation, petController.getByQuery);
router.get("/:id", tokenValidation, petController.getById);
router.put("/:id", tokenValidation, petController.update);
router.post("/:id/adopt", tokenValidation, petController.adopt);
router.post("/:id/return", tokenValidation, petController.returnPet);
router.post("/:id/save", tokenValidation, petController.save);
router.delete("/:id/save", tokenValidation, petController.unsave);

export default router;

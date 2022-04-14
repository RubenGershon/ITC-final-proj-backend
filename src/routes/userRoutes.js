import express from "express";
import userController from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import userIdValidation from "../middlewares/userIdValidation.js";

const router = express.Router();
router.use(tokenValidation);

// get all users, protected to admin
router.get("/", userController.getAllUsers);

// get a user
router.get("/:id", userIdValidation, userController.getUserById);

//get a user based on the user's id.
//Return all the user details (aside from password) and the users pets they own
router.get("/:id/full", userIdValidation, userController.getUserByIdFull);

// Modify a user
router.put("/:id", userIdValidation, userController.update);

export default router;

import express from "express";
import userController from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import userValidation from "../middlewares/userValidation.js";
import adminValidation from "../middlewares/adminValidation.js";

const router = express.Router();
router.use(tokenValidation);

// get all users, protected to admin
router.get("/all", adminValidation, userController.getAllUsers);

//get a user based on the user's id.
//Return all the user details (aside from password) and the users pets they own
router.get("/", userValidation, userController.getUser);

// Return all the pets saved/cared of the current user
router.get("/pets", userValidation, userController.getUserPets);

// Modify a user
router.put("/", userValidation, userController.update);

export default router;

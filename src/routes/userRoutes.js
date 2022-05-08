import express from "express";
import userController from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import userValidation from "../middlewares/userValidation.js";
import adminValidation from "../middlewares/adminValidation.js";

const router = express.Router();
router.use(tokenValidation);

// get all users, protected to admin
router.get("/all", adminValidation, userController.getAllUsers);

//Get any user, based on users Ids
router.get("/:id", adminValidation, userController.getUserById);

//get the currently loggIn user.
//Return all the user details (aside from password) and the users pets they own
router.get("/", userValidation, userController.getUser);

// Modify a user
router.put("/", userValidation, userController.update);

// Delete a user, admin protected
router.delete("/:id", adminValidation, userController.deleteUser);

export default router;

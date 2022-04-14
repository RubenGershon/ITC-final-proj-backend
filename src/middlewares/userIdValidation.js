import userModel from "../models/userModel.js";

async function userIdValidation(req, res, next) {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (user) {
      res.locals.validatedUser = user;
      next();
    } else {
      res.status(404).json({
        status: "error",
        message: "user-not-found",
      });
    }
  } catch {
    res.status(404).json({
      status: "error",
      message: "user-not-found",
    });
  }
}

export default userIdValidation;

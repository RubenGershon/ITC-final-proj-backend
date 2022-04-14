import petModel from "../models/petModel.js";

async function petIdValidation(req, res, next) {
  try {
    const pet = await petModel.findOne({ _id: req.params.id });
    if (pet) {
      res.locals.validatedPet = pet;
      next();
    } else {
      res.status(404).json({
        status: "error",
        message: "pet-not-found",
      });
    }
  } catch {
    res.status(404).json({
      status: "error",
      message: "pet-not-found",
    });
  }
}

export default petIdValidation;

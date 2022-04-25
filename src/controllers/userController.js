import userModel from "../models/userModel.js";
import userPetsModel from "../models/userPets.js";
import petModel from "../models/petModel.js";
import deleteWrapper from "../utils.js";

async function getUserById(req, res) {
  res.status(201).send({
    status: "ok",
    user: res.locals.validatedUser,
  });
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({});
    res.status(201).send({
      status: "ok",
      users: users,
    });
  } catch (err) {
    res.status(401).send({
      status: "error",
      message: err,
    });
  }
}

async function getUserByIdFull(req, res) {
  try {
    const user = res.locals.validatedUser;
    const userPets = await userPetsModel.findOne({ userId: req.params.id });
    const caredPets = await petModel.find({
      _id: { $in: userPets.caredPetsIds },
    });
    res.status(201).json({
      status: "ok",
      user: user,
      userPets: caredPets,
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err,
    });
  }
}

async function update(req, res) {
  const user = res.locals.validatedUser;

  // Use overwrite and save so we go by pre-save validation
  //  update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware
  try {
    user.overwrite(req.body);
    await user.save();
    res.json({
      status: "ok",
      message: "user successfully updated",
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "email-already-in-use",
    });
  }
}
export default { update, getUserById, getAllUsers, getUserByIdFull };

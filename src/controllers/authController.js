import userModel from "../models/userModel.js";
import userPetsModel from "../models/userPets.js";
import tokenUtils from "../authentication/token.js";
import bcrypt from "bcrypt";
import deleteWrapper from "../utils.js";

async function signUp(req, res) {
  try {
    const user = await userModel.create(req.body);
    await userPetsModel.create({ userId: user._id });
    const plainFilteredUser = deleteWrapper(user.toObject(), [
      "password",
      "__v",
      "role",
    ]);

    res.cookie("token", tokenUtils.createToken(plainFilteredUser), {
      httpOnly: true,
    });

    res.status(201).send({
      status: "ok",
      user: plainFilteredUser,
    });
    return
  } catch (error) {
    res.status(400).json({ status: "error", message: error });
  }
}

async function login(req, res) {
  const body = req.body;
  if (!body.email) {
    res.status(400).send({ status: "error", message: "email missing" });
    return;
  }

  if (!body.password) {
    res.status(400).send({ status: "error", message: "password missing" });
    return;
  }

  try {
    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      res.status(400).json({ status: "error", message: "invalid email" });
      return;
    }

    if (await bcrypt.compare(body.password, user.password)) {
      const plainFilteredUser = deleteWrapper(user.toObject(), [
        "password",
        "__v",
        "role",
      ]);

      res.cookie("token", tokenUtils.createToken(plainFilteredUser), {
        httpOnly: true,
      });

      res.status(201).json({
        status: "ok",
        user: plainFilteredUser,
      });
    } else {
      res.status(400).json({ status: "error", message: "invalid password" });
      return;
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
    return;
  }
}

async function logout(req, res) {}

export default { signUp, login, logout };

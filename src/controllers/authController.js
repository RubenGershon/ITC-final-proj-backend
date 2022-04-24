import userModel from "../models/userModel.js";
import userPetsModel from "../models/userPets.js";
import token from "../authentication/token.js";
import bcrypt from "bcrypt";
import filter from "../utils.js";

function handleErrors(err) {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "email already in use";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

async function signUp(req, res) {
  try {
    const user = await userModel.create(req.body);
    await userPetsModel.create({ userId: user._id });
    res.cookie("userId", user._id);
    const plainFilteredUser = filter(user.toObject(), [
      "password",
      "__v",
      "role",
    ]);
    const jwtToken = token.createToken(plainFilteredUser);

    res.status(201).json({
      status: "ok",
      user: plainFilteredUser,
      token: jwtToken,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

async function login(req, res) {
  const body = req.body;
  if (!(body.email && body.password)) {
    return res.status(400).send({ error: "username or password missing" });
  }

  try {
    const user = await userModel.findOne({ email: body.email });
    if (!user) res.status(401).json({ error: "User does not exist" });

    if (await bcrypt.compare(body.password, user.password)) {
      res.cookie("userId", user._id);
      const plainFilteredUser = filter(user.toObject(), [
        "password",
        "__v",
        "role",
      ]);

      const jwtToken = token.createToken(plainFilteredUser);
      res.status(200).json({
        user: plainFilteredUser,
        token: jwtToken,
      });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error,
    });
  }
}

async function logout(req, res) {}

export default { signUp, login, logout };

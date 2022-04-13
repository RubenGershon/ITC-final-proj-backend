import userModel from "../models/userModel.js";
import userPetsModel from "../models/userPets.js";
import token from "../authentication/token.js";
import bcrypt from "bcrypt";

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
    const jwtToken = token.createToken(user._id, user.firstName);

    res.status(201).json({
      status: "ok",
      user: user,
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
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  try {
    const user = await userModel.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.cookie("userId", user._id);
        const jwtToken = token.createToken(user._id, user.firstName);
        res.status(200).json({ message: "Valid password", token: jwtToken });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
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

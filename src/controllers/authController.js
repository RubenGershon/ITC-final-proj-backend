import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password: plainTextpassword,
  } = req.body;

  try {
    const password = await bcrypt.hash(plainTextpassword, 10);
    const user = await userModel.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
    return res.status(201).send({
      status: "ok",
      user: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "email-already-in-use",
    });
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
        res.status(200).json({ message: "Valid password" });
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

export default { signUp, login };

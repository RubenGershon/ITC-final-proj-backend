import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const JWT_SECRET = "jnsdcjns16sd51c6sdcserv16ef5v16df5v16";

async function update(req, res) {
  const token =
    req.header("Authorization").split(" ")[1] ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      status: "error",
      message: "A token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "Invalid token",
    });
  }

  let doc = "";
  try {
    doc = await userModel.findOne({ _id: req.params.id });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "user-not-found",
    });
  }

  // Use overwrite and save so we go by pre-save validation
  //  update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware
  try {
    doc.overwrite(req.body);
    await doc.save();
    res.json({
      status: "ok",
      message: "user successfully updated",
    });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "email-already-in-use",
    });
  }
}

export default { update };

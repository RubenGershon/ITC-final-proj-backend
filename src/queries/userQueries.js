import userModel from "../models/userModel.js";

async function findUser(email) {
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return { status: "ok", data: user };
    } else {
      return { status: "error", message: "user not found" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function findAllUsers() {
  try {
    const users = await userModel.find({});
    return { status: "ok", data: users };
  } catch (error) {
    return { status: "error", message: error };
  }
}

export default { findUser, findAllUsers };

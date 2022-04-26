import userModel from "../models/userModel.js";

async function createUser(data) {
  try {
    const user = await userModel.create(data);
    if (user) {
      return { status: "ok", data: user };
    } else {
      return { status: "error", message: "unknown" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

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

export default { createUser, findUser };

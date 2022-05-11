import userModel from "../models/userModel.js";


async function createUser(data) {
  try {
    const user = await userModel.create(data);
    if (user) {
      return { status: "ok", data: user.toObject() };
    } else {
      return { status: "error", message: "unknown" };
    }
  } catch (error) {
    return { status: "error", message: "email already in use" };
  }
}

async function findUser(
  email,
  userDataToReturn = {
    _id: 1,
    email: 1,
    role:1
  }
) {
  try {
    const user = await userModel.findOne({ email: email }, userDataToReturn);
    if (user) {
      return { status: "ok", data: user.toObject() };
    } else {
      return { status: "error", message: "user not found" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

export default { createUser, findUser };

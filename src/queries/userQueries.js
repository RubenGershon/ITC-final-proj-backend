import userModel from "../models/userModel.js";

const userDataObj = {
  _id: 1,
  firstName: 1,
  lastName: 1,
  role: 1,
  email: 1,
  phoneNumber: 1,
  caredPetsIds: 1,
  savedPetsIds: 1,
};

async function findUser(email) {
  try {
    const user = await userModel.findOne({ email: email }, userDataObj);
    if (user) {
      return { status: "ok", data: user };
    } else {
      return { status: "error", message: "user not found" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function findUserById(id) {
  try {
    const user = await userModel.findById(id, userDataObj);
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
    const users = await userModel.find({}, userDataObj);
    return { status: "ok", data: users };
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function deleteUser(id) {
  try {
    await userModel.deleteOne({ _id: id });
    return { status: "ok", message: "User successfully deleted" };
  } catch (error) {
    return { status: "error", message: error };
  }
}

export default { findUser, findUserById, findAllUsers, deleteUser };

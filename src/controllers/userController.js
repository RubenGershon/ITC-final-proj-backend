import userQueries from "../queries/userQueries.js";
import deleteWrapper from "../utils.js";

async function getUser(req, res) {
  res.status(200).send({
    status: "ok",
    data: deleteWrapper(req.user.toObject(), ["password", "__v"]),
  });
}

async function getUserById(req, res) {
  const response = await userQueries.findUserById(req.params.id)
  if (response.status === "ok") return res.status(200).send(response)
  else return res.status(400).send(response);
}

async function getAllUsers(req, res) {
  const response = await userQueries.findAllUsers();
  if (response.status !== "ok") {
    res.status(400).send(response);
    return;
  }

  const filteredUsers = [];
  response.data.forEach((user) => {
    filteredUsers.push(deleteWrapper(user.toObject(), ["password", "__v"]));
  });
  response.data = filteredUsers;
  res.status(201).send(response);
}

//TODO
async function update(req, res) {
  const user = req.user;

  try {
    if ("email" in req.body) user.email = req.body.email;
    if ("firstName" in req.body) user.firstName = req.body.firstName;
    if ("lastName" in req.body) user.lastName = req.body.lastName;
    if ("phoneNumber" in req.body) user.phoneNumber = req.body.phoneNumber;
    if ("bio" in req.body) user.bio = req.body.bio;
    if ("password" in req.body) user.password = req.body.password;
    await user.save();
    res.status(200).send({
      status: "ok",
      message: "user successfully updated",
    });
  } catch (error) {
    res.status(400).send({ status: "error", message: "email already in use" });
    return;
  }
}

export default { update, getUser, getAllUsers, getUserById };

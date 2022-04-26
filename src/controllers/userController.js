import userQueries from "../queries/userQueries.js";
import deleteWrapper from "../utils.js";

async function getUser(req, res) {
  res.status(200).send({
    status: "ok",
    data: deleteWrapper(req.user.toObject(), ["password", "__v"]),
  });
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

  // Use overwrite and save so we go by pre-save validation
  //  update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware
  try {
    user.overwrite(req.body);
    await user.save();
    res.status(200).send({
      status: "ok",
      message: "user successfully updated",
    });
  } catch (err) {
    res.status(401).send({
      status: "error",
      message: "email-already-in-use",
    });
  }
}
export default { update, getUser, getAllUsers, getUserPets };

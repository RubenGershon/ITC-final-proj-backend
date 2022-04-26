import authQueries from "../queries/authQueries.js";
import tokenUtils from "../authentication/token.js";
import bcrypt from "bcrypt";
import deleteWrapper from "../utils.js";

async function signUp(req, res) {
  const response = await authQueries.createUser(req.body);
  if (response.status !== "ok") {
    res.status(400).send(response);
    return;
  }

  const user = response.data;
  const plainFilteredUser = deleteWrapper(user.toObject(), [
    "password",
    "phoneNumber",
    "__v",
  ]);

  res.cookie("token", tokenUtils.createToken(plainFilteredUser), {
    httpOnly: true,
    sameSite: "lax",
  });

  res.status(201).send({
    status: "ok",
    data: plainFilteredUser,
  });
  return;
}

async function login(req, res) {
  const body = req.body;
  if (!body.email) {
    res.status(400).send({ status: "error", message: "email missing" });
    return;
  }

  if (!body.password) {
    res.status(400).send({ status: "error", message: "password missing" });
    return;
  }

  const response = await authQueries.findUser(body.email);
  if (response.status !== "ok") {
    res.status(404).send(response);
    return;
  }

  const user = response.data;
  if (await bcrypt.compare(body.password, user.password)) {
    const plainFilteredUser = deleteWrapper(user.toObject(), [
      "password",
      "phoneNumber",
      "__v",
    ]);

    res.cookie("token", tokenUtils.createToken(plainFilteredUser), {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).send({
      status: "ok",
      data: plainFilteredUser,
    });
  } else {
    res.status(400).json({ status: "error", message: "invalid password" });
    return;
  }
}

async function logout(req, res) {
  res.clearCookie();
  res.status(200).send({
    status: "ok",
  });
}

export default { signUp, login, logout };

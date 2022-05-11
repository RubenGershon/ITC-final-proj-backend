import authQueries from "../queries/authQueries.js";
import tokenUtils from "../authentication/token.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
  const response = await authQueries.createUser(req.body);
  if (response.status !== "ok") {
    res.status(400).send(response);
    return;
  }

  const newobj = { _id: response.data._id, email: response.data.email };
  res.cookie("token", tokenUtils.createToken(newobj), {
    httpOnly: true,
    sameSite: "lax",
  });

  res.status(201).send({
    status: "ok",
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

  const response = await authQueries.findUser(body.email, {
    password: 1,
  });
  if (response.status !== "ok") {
    res.status(404).send(response);
    return;
  }

  if (await bcrypt.compare(body.password, response.data.password)) {
    const response = await authQueries.findUser(body.email);
    res.cookie("token", tokenUtils.createToken(response.data), {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).send({
      status: "ok",
    });
  } else {
    res.status(400).json({ status: "error", message: "invalid password" });
    return;
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).send({
    status: "ok",
  });
}

export default { signUp, login, logout };

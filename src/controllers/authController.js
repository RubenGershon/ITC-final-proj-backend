import authModel from "../models/authModel.js";

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("username or password missing");
      return;
    }

    const user = await authModel.login(username, password);
    if (!user) {
      res.status(401).send("invalid username or password");
      return;
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

export default { login };

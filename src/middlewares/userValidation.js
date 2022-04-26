import userQueries from "../queries/userQueries.js";

async function userValidation(req, res, next) {
  const response = await userQueries.findUser(req.user.email);
  if (response.status === "ok") {
    req.user = response.data;
    next();
  } else {
    return res.status(401).send(response);
  }
}

export default userValidation;

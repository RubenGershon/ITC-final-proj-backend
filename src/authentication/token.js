import jwt from "jsonwebtoken";
const JWT_SECRET = "jnsdcjns16sd51c6sdcserv16ef5v16df5v16";

function createToken(id, firstName) {
  return jwt.sign({ id: id, firstName: firstName }, JWT_SECRET);
}

function tokenValidation(req) {
  const token =
    req.header("Authorization").split(" ")[1] ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];

  if (!token) {
    return {
      status: "error",
      message: "A token is required for authentication",
    };
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return {
      status: "error",
      message: "Invalid token",
    };
  }

  return "success";
}

export default { createToken, tokenValidation };

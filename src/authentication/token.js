import jwt from "jsonwebtoken";

function createToken(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET);
}

function tokenValidation(req) {
  let token = "";
  try {
    token =
      req.header("Authorization").split(" ")[1] ||
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"];
  } catch {
    return {
      status: "error",
      message: "A token is required for authentication",
    };
  }

  try {
    const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
    return { status: "ok", authenticatedUser: authenticatedUser };
  } catch (err) {
    return {
      status: "error",
      message: "Invalid token",
    };
  }
}

export default { createToken, tokenValidation };

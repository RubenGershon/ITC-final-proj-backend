import jwt from "jsonwebtoken";

function createToken(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET);
}

function tokenValidation(req) {
  try {
    const authenticatedUser = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    return { status: "ok", authenticatedUser: authenticatedUser };
  } catch (err) {
    return {
      status: "error",
      message: "Invalid or missing token",
    };
  }
}

export default { createToken, tokenValidation };

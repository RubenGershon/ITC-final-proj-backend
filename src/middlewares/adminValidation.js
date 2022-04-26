function adminValidation(req, res, next) {
  const authenticatedUser = req.user;
  if (authenticatedUser.role === "admin") {
    next();
  } else {
    res.status(401).send({
      status: "error",
      message: "unauthorized",
    });
    return;
  }
}

export default adminValidation;

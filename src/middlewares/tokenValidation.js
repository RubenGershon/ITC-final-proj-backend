import token from "../authentication/token.js";

function tokenValidation(req, res, next) {
  const response = token.tokenValidation(req);
  if (response === "success") next();
  else {
    return res.status(401).send(response);
  }
}

export default tokenValidation;

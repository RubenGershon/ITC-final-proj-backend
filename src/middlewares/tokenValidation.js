import tokenUtils from "../authentication/token.js";

function tokenValidation(req, res, next) {
  const response = tokenUtils.tokenValidation(req);
  if (response.status === "ok") {
    req.user = response.data;
    next();
  } else {
    return res.status(401).send(response);
  }
}

export default tokenValidation;

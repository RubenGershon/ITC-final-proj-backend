import petModel from "../models/petModel.js";
import token from "../authentication/token.js";

async function add(req, res) {
  const response = token.tokenValidation(req);
  if (response != "success") {
    return res.status(401).send(response);
  }

  try {
    const pet = await petModel.create(req.body);
    return res.status(201).send({
      status: "ok",
      pet: pet,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error,
    });
  }
}

export default { add };

import petQueries from "../queries/petQueries.js";

async function petIdValidation(req, res, next) {
  const response = await petQueries.findPetById(req.params.id);
  if (response.status === "ok") {
    req.pet = response.data;
    next();
  } else res.status(400).send(response);
}

export default petIdValidation;

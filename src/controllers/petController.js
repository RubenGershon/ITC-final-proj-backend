import petQueries from "../queries/petQueries.js";

async function add(req, res) {
  const response = await petQueries.createPet({
    ...req.body,
    imageUrl: req.file.path,
  });
  if (response.status === "ok") {
    return res.status(201).send(response);
  } else {
    res.status(400).send(response);
    return;
  }
}

async function update(req, res) {
  const response = await petQueries.updatePet(req);
  if (response.status === "ok") {
    return res.status(201).send(response);
  } else {
    res.status(400).send(response);
    return;
  }
}
async function getById(req, res) {
  res.status(200).send({
    status: "ok",
    data: req.pet,
  });
}

async function getByIds(req, res) {
  const response = await petQueries.findByQuery({
    _id: { $in: JSON.parse(req.query.listOfPetsIds) },
  });
  if (response.status === "ok") {
    return res.status(200).send(response);
  } else {
    res.status(400).send(response);
    return;
  }
}

  
async function getByQuery(req, res) {
  const query = Object.keys(req.query).length !== 0 ? req.query : {};

  const response = await petQueries.findByQuery(query);
  if (response.status === "ok") {
    return res.status(200).send(response);
  } else {
    res.status(400).send(response);
    return;
  }
}

async function adopt(req, res) {
  try {
    req.user.caredPetsIds.push(req.pet._id);
    await req.user.save();
  } catch (err) {
    //do nothing if pet is already in caredPetsIds
  }

  req.pet.adoptionStatus = req.body.adoptionStatus;
  await req.pet.save();
  res.status(201).send({
    status: "ok",
    message: "pet successfully " + req.body.adoptionStatus,
  });
}

async function returnPet(req, res) {
  req.user.caredPetsIds = req.user.caredPetsIds.filter(
    (id) => id !== req.params.id
  );
  req.pet.adoptionStatus = "available";
  await req.user.save();
  await req.pet.save();
  res.status(201).send({
    status: "ok",
    message: "pet successfully removed from care",
  });
}

async function save(req, res) {
  try {
    req.user.savedPetsIds.push(req.pet._id);
    await req.user.save();
  } catch (err) {
    //do nothing if pet is already in savedPetsIds
  }

  res.status(201).send({
    status: "ok",
    message: "pet successfully saved",
  });
}

async function unsave(req, res) {
  req.user.savedPetsIds = req.user.savedPetsIds.filter(
    (id) => id !== req.params.id
  );
  await req.user.save();
  res.status(201).send({
    status: "ok",
    message: "pet successfully unsaved",
  });
}

export default {
  add,
  getById,
  getByIds,
  update,
  getByQuery,
  adopt,
  returnPet,
  save,
  unsave,
};

import petModel from "../models/petModel.js";
import userPetsModel from "../models/userPets.js";

async function add(req, res) {
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

async function getById(req, res) {
  try {
    const pet = await petModel.findById({ _id: req.params.id });
    return res.status(201).send({
      status: "ok",
      pet: pet,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "pet-not-found",
    });
  }
}

async function update(req, res) {
  let doc = "";
  try {
    doc = await petModel.findOne({ _id: req.params.id });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "pet-not-found",
    });
  }

  try {
    doc.overwrite(req.body);
    await doc.save();
    res.json({
      status: "ok",
      message: "pet successfully updated",
    });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: err,
    });
  }
}

async function getByQuery(req, res) {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    const allPets = await petModel.find({});
    res.json({
      status: "ok",
      data: allPets,
    });
  }

  const queryResult = await petModel.find(query);
  res.json({
    status: "ok",
    data: queryResult,
  });
}

async function adopt(req, res) {
  try {
    // TODO Check for concurrency
    const pet = await petModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { adoptionStatus: req.body.adoptionStatus } }
    );
    await userPetsModel.findOneAndUpdate(
      { userId: req.cookies.userId },
      { $set: { caredPetsIds: pet._id } }
    );
    res.status(201).send({
      status: "ok",
      pet: "pet successfully " + req.body.adoptionStatus,
    });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "pet-not-found",
    });
  }
}

async function returnPet(req, res) {
  try {
    // TODO Check for concurrency
    const pet = await petModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { adoptionStatus: "available" } }
    );
    await userPetsModel.findOneAndUpdate(
      { userId: req.cookies.userId },
      { $pull: { caredPetsIds: pet._id } }
    );
    res.status(201).send({
      status: "ok",
      pet: "pet successfully removed from care",
    });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "pet-not-found",
    });
  }
}

async function save(req, res) {
  try {
    await userPetsModel.findOneAndUpdate(
      { userId: req.cookies.userId },
      { $set: { savedPetsIds: req.params.id } }
    );
    res.status(201).send({
      status: "ok",
      pet: "pet successfully saved",
    });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "pet-not-found",
    });
  }
}

async function unsave(req, res) {
  try {
    await userPetsModel.findOneAndUpdate(
      { userId: req.cookies.userId },
      { $pull: { savedPetsIds: req.params.id } }
    );
    res.status(201).send({
      status: "ok",
      pet: "pet successfully unsaved",
    });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "pet-not-found",
    });
  }
}

export default {
  add,
  getById,
  update,
  getByQuery,
  adopt,
  returnPet,
  save,
  unsave,
};

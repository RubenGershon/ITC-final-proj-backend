import petQueries from "../queries/petQueries.js";
import userQueries from "../queries/userQueries.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

async function add(req, res) {
  const uploadImg = await cloudinary.uploader.upload(req.file.path, {
    folder: "PetAdoption",
  });
  uploadImg && fs.promises.unlink(req.file.path);

  const response = await petQueries.createPet({
    ...req.body,
    imageUrl: uploadImg.secure_url,
    publicImageId: uploadImg.public_id,
  });

  if (response.status === "ok") {
    return res.status(201).send(response);
  } else {
    res.status(400).send(response);
    return;
  }
}

// Go over each user to remove the pet to delete from their lists
async function deletePet(req, res) {
  const usersResponse = await userQueries.findAllUsers();
  usersResponse.data.forEach(async (user) => {
    const caredPetsIds = user.caredPetsIds.toObject();
    const savedPetsIds = user.savedPetsIds.toObject();
    user.caredPetsIds = caredPetsIds.filter((id) => id !== req.params.id);
    user.savedPetsIds = savedPetsIds.filter((id) => id !== req.params.id);
    await user.save();
  });

  await cloudinary.uploader.destroy(req.pet.publicImageId);
  const response = await petQueries.deletePet(req.params.id);
  if (response.status === "ok") {
    return res.status(201).send(response);
  } else {
    res.status(400).send(response);
    return;
  }
}

async function update(req, res) {
  const pet = req.pet;
  try {
    if ("name" in req.body) {
      if (pet.name !== req.body.name) {
        pet.name = req.body.name;
      }
    }
    if ("type" in req.body) pet.type = req.body.type;
    if ("adoptionStatus" in req.body)
      pet.adoptionStatus = req.body.adoptionStatus;
    if ("color" in req.body) pet.color = req.body.color;
    if ("breed" in req.body) pet.breed = req.body.breed;
    if ("weight" in req.body) pet.weight = req.body.weight;
    if ("height" in req.body) pet.height = req.body.height;
    if ("hypoallergenic" in req.body)
      pet.hypoallergenic = req.body.hypoallergenic;
    if ("bio" in req.body) pet.bio = req.body.bio;
    if ("dietaryRestrictions" in req.body)
      pet.dietaryRestrictions = req.body.dietaryRestrictions;

    if (req.file) {
      try {
        await cloudinary.uploader.destroy(pet.publicImageId);
      } catch (err) { }
      
      const uploadImg = await cloudinary.uploader.upload(req.file.path, {
        folder: "PetAdoption",
      });

      uploadImg && fs.promises.unlink(req.file.path);
      pet.imageUrl = uploadImg.secure_url;
      pet.publicImageId = uploadImg.public_id;
    }

    await pet.save();
    res.status(201).send({
      status: "ok",
      message: "pet successfully updated",
    });
    return;
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
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
  let parsed = "";
  try {
    parsed = JSON.parse(req.query.listOfPetsIds);
  } catch (error) {
    res.status(400).send({ status: "error", message: "getByIds server error" });
    return;
  }
  const response = await petQueries.findByQuery({
    _id: { $in: parsed },
  });
  if (response.status === "ok") {
    return res.status(200).send(response);
  } else {
    res.status(400).send(response);
    return;
  }
}

async function getByQuery(req, res) {
  let query = req.query && req.query.queryStr && JSON.parse(req.query.queryStr);
  query = query ? query : {}

  const response = await petQueries.findByQuery(query);
  if (response.status === "ok") {
    return res.status(200).send(response);
  } else {
    res.status(400).send(response);
  }
  return;
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
  deletePet,
  getById,
  getByIds,
  update,
  getByQuery,
  adopt,
  returnPet,
  save,
  unsave,
};

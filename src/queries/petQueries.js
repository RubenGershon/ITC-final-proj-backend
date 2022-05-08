import petModel from "../models/petModel.js";

async function createPet(data) {
  try {
    const pet = await petModel.create(data);
    return { status: "ok", data: pet };
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function deletePet(id) {
  try {
    await petModel.deleteOne({ _id: id });
    return { status: "ok", message: "Pet succesfully deleted" };
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function findPetById(id) {
  try {
    const pet = await petModel.findById(id);
    if (pet) {
      return { status: "ok", data: pet };
    } else {
      return { status: "error", message: "pet not found" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function findByQuery(query) {
  try {
    const pets = await petModel.find(query);
    return { status: "ok", data: pets };
  } catch (error) {
    return { status: "error", message: error };
  }
}
  
async function updatePet(req) {
  const pet = req.pet;
  try {
    if ("name" in req.body) pet.name = req.body.name;
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
    if (req.file) pet.imageUrl = req.file.path;
    await pet.save();
    return {
      status: "ok",
      message: "pet successfully updated",
    };
  } catch (error) {
    return { status: "error", message: error };
  }
}
  
export default { createPet, deletePet, findPetById, updatePet, findByQuery };

import petModel from "../models/petModel.js";

async function createPet(data) {
  try {
    const pet = await petModel.create(data);
    return { status: "ok", data: pet };
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

async function findAndUpdate(searchParam, updateParam) {
  try {
    const pets = await petModel.findOneAndUpdate(searchParam, updateParam);
    return { status: "ok", data: pets };
  } catch (error) {
    return { status: "error", message: error };
  }
}

async function updatePet(req) {
  const pet = req.pet;
  try {
    pet.overwrite(req.body);
    await pet.save();
    return { status: "ok" };
  } catch (error) {
    return { status: "error", message: error };
  }
}

export default { createPet, findPetById, updatePet, findByQuery };

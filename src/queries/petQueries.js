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
  
  
export default { createPet, deletePet, findPetById, findByQuery };

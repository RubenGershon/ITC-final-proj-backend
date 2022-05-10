import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      maxlength: 50,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50,
    },
    adoptionStatus: {
      type: String,
      enum: ["available", "adopted", "fostered"],
      default: "available",
      maxlength: 50,
    },
    color: {
      type: String,
      required: true,
      maxlength: 50,
    },
    breed: {
      type: String,
      required: true,
      maxlength: 50,
    },
    imageUrl: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    publicImageId: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    height: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    hypoallergenic: {
      type: Boolean,
      required: true,
    },
    dietaryRestrictions: {
      type: String,
      maxlength: 300,
    },
    bio: {
      type: String,
      maxlength: 300,
    },
  },
  { collection: "pets" }
);

const petModel = mongoose.model("PetSchema", PetSchema);
export default petModel;

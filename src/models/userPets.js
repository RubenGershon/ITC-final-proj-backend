import mongoose from "mongoose";
import uniqueArray from "mongoose-unique-array";

const UserPetsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    caredPetsIds: [String],
    savedPetsIds: [String],
  },
  { collection: "userPets" }
);

UserPetsSchema.plugin(uniqueArray);
const userPetsModel = mongoose.model("UserPetsSchema", UserPetsSchema);
export default userPetsModel;

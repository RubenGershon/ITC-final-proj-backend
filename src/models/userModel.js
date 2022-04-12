import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 255,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: "user" },
    bio: { type: String, max: 300 },
  },
  { collection: "users" }
);

// Automatically hash new or updated password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});
const userModel = mongoose.model("UserSchema", UserSchema);

export default userModel;

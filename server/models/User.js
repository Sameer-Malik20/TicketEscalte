import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["RAISER", "L1", "L2", "L3"], default: "RAISER" },
});

const User = mongoose.model("User", UserSchema);
export default User;

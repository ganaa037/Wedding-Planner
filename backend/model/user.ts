import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: Boolean,
    role: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Usermodel = mongoose.model("user", userSchema);

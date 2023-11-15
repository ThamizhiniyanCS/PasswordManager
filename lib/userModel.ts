import mongoose from "mongoose";

import { userInterface } from "./typeDefinitions";

const UserSchema = new mongoose.Schema<userInterface>(
  {
    email_id: {
      type: String,
      required: [true, "Please provide a valid user ID"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a username"],
      maxlength: [60, "Username cannot be more than 60 characters"],
    },
    password: {
      type: String,
      required: [true, "Please give a strong password."],
      minlength: [12, "Password must be at least 12 characters"],
      maxlength: [50, "Password cannot be more than 50 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<userInterface>("User", UserSchema);

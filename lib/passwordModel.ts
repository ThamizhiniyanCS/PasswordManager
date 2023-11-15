import mongoose from "mongoose";

import { passwordInterface } from "./typeDefinitions";

const PasswordSchema = new mongoose.Schema<passwordInterface>(
  {
    user_id: {
      type: String,
      required: [true, "Please provide a valid user ID"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      maxlength: [60, "Username cannot be more than 60 characters"],
    },
    password: {
      type: String,
      required: [true, "Please give a strong password."],
      maxlength: [50, "password specified cannot be more than 50 characters"],
    },
    account_description: {
      type: String,
      required: true,
    },
    password_score: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Password ||
  mongoose.model<passwordInterface>("Password", PasswordSchema);

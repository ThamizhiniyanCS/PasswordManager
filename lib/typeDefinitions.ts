import mongoose from "mongoose";

export interface passwordInterface extends mongoose.Document {
  user_id: string;
  username: string;
  password: string;
  account_description: string;
  password_score: number;
  url: string;
}

export interface extendedPasswordType {
  _id: string;
  user_id: string;
  username: string;
  password: string;
  account_description: string;
  password_score: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface searchPasswordType {
  id: string;
  account_description: string;
}

export interface userInterface extends mongoose.Document {
  email_id: string;
  name: string;
  password: string;
}

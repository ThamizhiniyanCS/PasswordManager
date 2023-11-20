import mongoose from "mongoose";

export interface passwordInterface extends mongoose.Document {
  user_id: string;
  username: string;
  password: string;
  account_description: string;
  password_score: number;
  url: string;
}

export interface passwordType {
  user_id: string;
  username: string;
  password: string;
  account_description: string;
  password_score: number;
  url?: string | undefined;
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

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
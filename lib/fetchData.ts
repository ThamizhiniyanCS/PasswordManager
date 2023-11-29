import passwordModel from "./passwordModel";
import { unstable_noStore } from "next/cache";
import dbConnect from "./db-connect";
import {
  extendedPasswordType,
  passwordType,
  searchPasswordType,
} from "./typeDefinitions";
import mongoose from "mongoose";

export const getPassword = async (id: string) => {
  unstable_noStore();
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (isValidId) {
    try {
      const password = await passwordModel.findById(id);
      const reducedPassword: passwordType = {
        account_description: password.account_description,
        password_score: password.password_score,
        url: password.url,
        user_id: password.user_id,
        username: password.username,
        password: password.password,
      };

      return reducedPassword;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get password details to edit.");
    }
  } else {
    throw new Error("Invalid Password ID.");
  }
};

export const getPasswords = async () => {
  unstable_noStore();
  try {
    console.log("Getting passwords");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("After 3 seconds");
    await dbConnect();
    const fetchedPasswords = await passwordModel.find({}).lean().exec();
    const reducedPasswords: extendedPasswordType[] = fetchedPasswords.map(
      (password) => ({
        _id: `${password._id}`,
        account_description: password.account_description,
        user_id: password.user_id,
        username: password.username,
        password: password.password,
        password_score: password.password_score,
        url: password.url,
        createdAt: password.createdAt.toString(),
        updatedAt: password.updatedAt.toString(),
      })
    );

    return reducedPasswords;
  } catch (error) {
    console.log("Database Error", error);
    throw new Error("Failed to Fetch the Data");
  }
};

export const getPasswordsSearch = async () => {
  unstable_noStore();
  try {
    await dbConnect();
    const fetchedPasswords = await passwordModel.find({}).lean().exec();
    const reducedPasswords: searchPasswordType[] = fetchedPasswords.map(
      (password) => ({
        id: `${password._id}`,
        account_description: password.account_description,
      })
    );

    return reducedPasswords;
  } catch (error) {
    console.log("Database Error", error);
    throw new Error("Failed to Fetch the Data");
  }
};

import passwordModel from "./passwordModel";
import { unstable_noStore } from "next/cache";
import dbConnect from "./db-connect";
import { extendedPasswordType, searchPasswordType } from "./typeDefinitions";

export const getPasswords = async () => {
  unstable_noStore();
  try {
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

"use server";

import passwordModel from "./passwordModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodPasswordSchemaServer } from "./zodDefinitions";
import { passwordType } from "./typeDefinitions";
import mongoose from "mongoose";

const CreatePassword = ZodPasswordSchemaServer.omit({});
const UpdatePassword = ZodPasswordSchemaServer.omit({ user_id: true });

export type State = {
  errors?: {
    user_id?: string[];
    username?: string[];
    password?: string[];
    account_description?: string[];
    passwordScore?: string[];
    url?: string[];
  };
  message?: string | null;
};

export const createPassword = async (formData: passwordType) => {
  const parsedFormData = CreatePassword.safeParse(formData);

  if (parsedFormData.success === false) {
    console.log(parsedFormData.error);
    throw new Error("Invalid Form Data");
  } else {
    try {
      await passwordModel.create({
        user_id: parsedFormData.data.user_id,
        username: parsedFormData.data.username,
        password: parsedFormData.data.password,
        account_description: parsedFormData.data.account_description,
        password_score: parsedFormData.data.password_score,
        url: parsedFormData.data.url,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create password");
    }
  }

  revalidatePath("/dashboard/passwords");
  redirect("/dashboard/passwords");
};

export const updatePassword = async (
  // prevState: State,
  formData: passwordType,
  password_id: string
) => {
  const isValidId = mongoose.Types.ObjectId.isValid(password_id);

  if (isValidId) {
    const parsedFormData = UpdatePassword.safeParse(formData);

    if (parsedFormData.success === false) {
      return {
        errors: parsedFormData.error.flatten().fieldErrors,
        message: "Invalid Input Data. Failed to Create Password",
      };
    } else {
      try {
        await passwordModel.findByIdAndUpdate(password_id, {
          username: parsedFormData.data.username,
          password: parsedFormData.data.password,
          account_description: parsedFormData.data.account_description,
          password_score: parsedFormData.data.password_score,
          url: parsedFormData.data.url,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Failed to update password");
      }
    }
  } else {
    throw new Error("Invalid Password ID.");
  }

  revalidatePath("/dashboard/passwords");
  redirect("/dashboard/passwords");
};

export const deletePassword = async (password_id: string) => {
  await passwordModel.findByIdAndDelete(password_id);

  revalidatePath("/dashboard/passwords");
  redirect("/dashboard/passwords");
};

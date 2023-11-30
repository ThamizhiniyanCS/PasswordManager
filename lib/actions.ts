"use server";

import passwordModel from "./passwordModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodPasswordSchemaServer, ZodUserSchema } from "./zodDefinitions";
import { authenticateUser, CreateUser, passwordType } from "./typeDefinitions";
import mongoose from "mongoose";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import userModel from "./userModel";

const AuthenticateUser = ZodUserSchema.omit({ name: true });
const CreatePassword = ZodPasswordSchemaServer.omit({});
const UpdatePassword = ZodPasswordSchemaServer.omit({ user_id: true });

export async function authenticate(formData: authenticateUser) {
  const parsedData = AuthenticateUser.safeParse(formData);

  if (parsedData.success) {
    console.log(
      "Parsed Successfully_____________________________________________"
    );
    try {
      await signIn("credentials", formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return "Invalid credentials.";
          default:
            return "Something went wrong.";
        }
      }
      throw error;
    }
  } else {
    throw new Error("Invalid Credentials");
  }
}

export const createUser = async (formData: CreateUser) => {
  const parsedFormData = ZodUserSchema.safeParse(formData);

  if (parsedFormData.success === false) {
    console.log(parsedFormData.error);
    throw new Error("Invalid Form Data");
  } else {
    try {
      await userModel.create({
        email_id: parsedFormData.data.email_id,
        name: parsedFormData.data.name,
        password: parsedFormData.data.password,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create password");
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
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
  const isValidId = mongoose.Types.ObjectId.isValid(password_id);

  if (isValidId) {
    try {
      await passwordModel.findByIdAndDelete(password_id);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to Delete password");
    }
  } else {
    throw new Error("Invalid Password ID.");
  }

  revalidatePath("/dashboard/passwords");
  redirect("/dashboard/passwords");
};

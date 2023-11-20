"use server";

import passwordModel from "./passwordModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodPasswordSchemaServer } from "./zodDefinitions";
import { passwordType } from "./typeDefinitions";

const CreatePassword = ZodPasswordSchemaServer.omit({});
const UpdatePassword = ZodPasswordSchemaServer.omit({ user_id: true });

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
  password_id: string,
  formData: FormData
) => {
  const { account_description, password, password_score, username, url } =
    UpdatePassword.parse({
      username: formData.get("username"),
      password: formData.get("password"),
      account_description: formData.get("account_description"),
      password_score: formData.get("password_score"),
      url: formData.get("url"),
    });

  await passwordModel.findByIdAndUpdate(password_id, {
    username,
    password,
    account_description,
    password_score,
    url,
  });

  revalidatePath("/dashboard/passwords");
  redirect("/dashboard/passwords");
};

export const deletePassword = async (password_id: string) => {
  await passwordModel.findByIdAndDelete(password_id);

  revalidatePath("/dashboard/passwords");
  redirect("/dashboard/passwords");
};

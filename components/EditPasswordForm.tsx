"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodPasswordSchemaClient } from "@/lib/zodDefinitions";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updatePassword } from "@/lib/actions";
import { passwordType } from "@/lib/typeDefinitions";
import PasswordGenerator from "@/components/PasswordGenerator";
import Link from "next/link";
import { useFormStatus, useFormState } from "react-dom";

type Props = {
  currentPassword: passwordType;
  id: string;
};

const EditFormErrors = () => {
  const { pending, data, method, action } = useFormStatus();
  console.log(pending, data, method, action);

  return <></>;
};

const EditPasswordForm = ({ currentPassword, id }: Props) => {
  const [password, setPassword] = useState(currentPassword.password);
  const [passwordScore, setPasswordScore] = useState(
    currentPassword.password_score
  );

  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(updatePassword, initialState);

  const form = useForm<z.infer<typeof ZodPasswordSchemaClient>>({
    resolver: zodResolver(ZodPasswordSchemaClient),
    defaultValues: {
      account_description: currentPassword.account_description,
      username: currentPassword.username,
      password: currentPassword.password,
      url: currentPassword.url,
    },
  });

  function onSubmit(values: z.infer<typeof ZodPasswordSchemaClient>) {
    const data: passwordType = {
      account_description: values.account_description,
      username: values.username,
      password: values.password,
      password_score: passwordScore + 1,
      user_id: "something",
      url: values.url,
    };
    updatePassword(data, id);
  }

  return (
    <ScrollArea className="w-full h-full">
      <h2 className="text-2xl my-4">Edit Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
          <EditFormErrors />
          <FormField
            control={form.control}
            name="account_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Description</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full"
                    placeholder="Account Description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A description / name to your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your account username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full"
                    placeholder="Password"
                    {...field}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      form.setValue("password", event.target.value);
                    }}
                    value={password}
                  />
                </FormControl>
                <FormDescription>Enter your account password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordGenerator
            password={password}
            setPassword={setPassword}
            setPasswordScore={setPasswordScore}
            setFormValues={form.setValue}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL [ If Applicable ]</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-full"
                    placeholder="Website URL"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the website URL, if applicable.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-start items-center">
            <Button type="submit" className="rounded-full" size="lg">
              Submit
            </Button>
            <Link href="/dashboard/passwords/" className="ml-2">
              <Button
                type="button"
                className="rounded-full"
                size="lg"
                variant="outline"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EditPasswordForm;

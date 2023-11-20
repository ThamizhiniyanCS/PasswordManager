"use client";

import React, { useState, useEffect } from "react";
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
import { createPassword } from "@/lib/actions";
import { passwordType } from "@/lib/typeDefinitions";
import PasswordGenerator from "@/components/PasswordGenerator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getPassword } from "@/lib/fetchData";

const EditPasswordForm = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [currentPassword, setCurrentPassword] = useState<passwordType>();

  const idParam__Handler = (password_id?: string) => {
    if (password_id) {
      params.set("id", password_id);
    } else {
      params.delete("id");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const urlparams = new URLSearchParams(searchParams);
    if (urlparams.has("id") && urlparams.get("id") !== null) {
      // getPassword(urlparams.get("id") as string).then((password) => {
      //   setCurrentPassword(password);
      // });
    } else {
      // setCurrentPassword();
    }
  }, [searchParams]);

  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);

  const form = useForm<z.infer<typeof ZodPasswordSchemaClient>>({
    resolver: zodResolver(ZodPasswordSchemaClient),
    defaultValues: {
      account_description: "",
      username: "",
      password: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof ZodPasswordSchemaClient>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let data: passwordType = {
      ...values,
      password_score: passwordScore,
      user_id: "somethingSilly",
    };
    createPassword(data);
  }

  return (
    <ScrollArea className="w-full h-full">
      <h2 className="text-2xl my-4">Edit Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
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
          <div className="w-full flex justify-center items-center">
            <Button type="submit" className="rounded-full" size="lg">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EditPasswordForm;

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
import { createPassword } from "@/lib/actions";
import { passwordType } from "@/lib/typeDefinitions";
import PasswordGenerator from "@/components/PasswordGenerator";

const CreateForm = () => {
  const [password, setPassword] = useState("");

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
      password_score: 1,
      user_id: "somethingSilly",
    };
    createPassword(data);
  }

  return (
    <ScrollArea className="w-full h-full">
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
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />
                </FormControl>
                <FormDescription>Enter your account password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordGenerator password={password} setPassword={setPassword} />
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default CreateForm;

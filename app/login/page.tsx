"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ZodLoginSchema } from "@/lib/zodDefinitions";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authenticate, createUser } from "@/lib/actions";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  createUser({ email_id: "test@test.test", password: "123456789012", name: "test" });

  const form = useForm<z.infer<typeof ZodLoginSchema>>({
    resolver: zodResolver(ZodLoginSchema),
    defaultValues: {
      email_id: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof ZodLoginSchema>) {
    authenticate(values).then((result) => console.log(result));
  }

  return (
    <div className="w-screen h-[calc(100vh-80px)] flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to Access your Dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Email ID" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Email ID that you used to SignUp.
                    </FormDescription>
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
                      <div className="flex ">
                        <Input
                          placeholder="Password"
                          {...field}
                          type={isVisible ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-primary rounded-full ml-1"
                          onClick={() => setIsVisible(!isVisible)}
                        >
                          <span className="material-symbols-outlined">
                            {isVisible ? "visibility" : "visibility_off"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      You super strong password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-primary text-xs">Forgot Password ? Click Here</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

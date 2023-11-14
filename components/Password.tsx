"use client";

import { useToast } from "@/components/ui/use-toast";

import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Password = () => {
  const { toast } = useToast();

  return (
    <Dialog>
      <Card>
        <div className="w-full flex justify-between items-center">
          <DialogTrigger className="w-[calc(100%-64px)] border-none">
            <CardContent className="w-full flex flex-col items-start p-0 pl-2 h-36 justify-evenly rounded-l-xl">
              <div className="h-10 flex flex-col justify-evenly items-start">
                <CardDescription className="text-xs ">
                  Account Description
                </CardDescription>
                <CardDescription className="text-primary text-md">
                  lorem
                </CardDescription>
              </div>
              <div className="h-10 flex flex-col justify-evenly items-start">
                <CardDescription className="text-xs ">Username</CardDescription>
                <CardDescription className="text-primary text-md">
                  ipsum
                </CardDescription>
              </div>
              <div className="h-10 flex flex-col justify-evenly items-start">
                <CardDescription className="text-xs ">Password</CardDescription>
                <CardDescription className="text-primary text-md">
                  *******
                </CardDescription>
              </div>
            </CardContent>
          </DialogTrigger>

          <div className="flex ">
            <CardContent className="flex flex-col items-center p-0 h-36 justify-evenly">
              <Link
                href=""
                target="_blank"
                className="h-10 flex flex-col justify-evenly items-center"
              >
                <Button variant="outline" size="icon" className="text-primary">
                  <span className="material-symbols-outlined">open_in_new</span>
                </Button>
              </Link>
              <div className="h-10 flex flex-col justify-evenly items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-primary"
                  onClick={() => {
                    toast({
                      title: "Username Copied Successfully",
                    });
                  }}
                >
                  <span className="material-symbols-outlined">
                    content_copy
                  </span>
                </Button>
              </div>
              <div className="h-10 flex flex-col justify-evenly items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-primary"
                  onClick={() => {
                    toast({
                      title: "Password Copied Successfully",
                    });
                  }}
                >
                  <span className="material-symbols-outlined">
                    content_copy
                  </span>
                </Button>
              </div>
            </CardContent>

            <CardContent className="w-5 h-36 p-0 bg-red-500 rounded-r-xl ml-2"></CardContent>
          </div>
        </div>
      </Card>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>Account Descripton</DialogDescription>
        </DialogHeader>
        <div className=""></div>
        <DialogFooter className="flex flex-row items-center justify-end">
          <Link href="/dashboard/passwords/create">
            <Button
              type="button"
              variant="default"
              className="h-12 w-[100px] flex items-center justify-evenly rounded-full ml-2"
            >
              <span className="material-symbols-outlined">edit</span>
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="h-12 w-[100px] flex items-center justify-evenly rounded-full bg-red-500 ml-2"
              >
                <span className="material-symbols-outlined">delete</span>
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your credentials and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="rounded-full bg-red-500">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Password;

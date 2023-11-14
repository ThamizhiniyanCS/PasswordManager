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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

{
  /* <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>; */
}

const Password = () => {
  return (
    <Card>
      <div className="w-full flex justify-between items-center">
        <CardContent className="flex flex-col items-start p-0 pl-2 h-36 justify-evenly">
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
              <Button variant="outline" size="icon" className="text-primary">
                <span className="material-symbols-outlined">content_copy</span>
              </Button>
            </div>
            <div className="h-10 flex flex-col justify-evenly items-center">
              <Button variant="outline" size="icon" className="text-primary">
                <span className="material-symbols-outlined">content_copy</span>
              </Button>
            </div>
          </CardContent>

          <CardContent className="w-5 h-36 p-0 bg-red-500 rounded-r-xl ml-2"></CardContent>
        </div>
      </div>
    </Card>
  );
};

export default Password;

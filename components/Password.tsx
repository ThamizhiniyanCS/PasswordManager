"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deletePassword } from "@/lib/actions";

import { Card, CardContent, CardDescription } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Separator } from "./ui/separator";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import clsx from "clsx";
import { extendedPasswordType } from "@/lib/typeDefinitions";

const Password = ({
  _id,
  account_description,
  username,
  password,
  url,
  password_score,
  createdAt,
  updatedAt,
}: extendedPasswordType) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  const params = new URLSearchParams(searchParams);

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
    if (urlparams.has("id") && urlparams.get("id") === _id) {
      setDialogState(true);
    } else {
      setDialogState(false);
    }
  }, [searchParams, _id]);

  const copyToClipboard = (contentToCopy: string, name: string) => {
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() =>
        toast({
          title: `${name} Copied Successfully`,
        })
      )
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with copying to clipboard.",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => copyToClipboard(contentToCopy, name)}
            >
              Try again
            </ToastAction>
          ),
        });
      });
  };

  return (
    <Dialog
      open={dialogState}
      onOpenChange={(state) => {
        if (!state) idParam__Handler();
        setDialogState(state);
      }}
    >
      <Card className="my-2">
        <div className="w-full flex justify-between items-center">
          <DialogTrigger className="w-[calc(100%-64px)] border-none">
            <CardContent
              className="w-full flex flex-col items-start p-0 pl-2 h-36 justify-evenly rounded-l-xl"
              onClick={() => idParam__Handler(_id)}
            >
              <div className="h-10 flex flex-col justify-evenly items-start">
                <CardDescription className="text-xs ">
                  Account Description
                </CardDescription>
                <CardDescription className="text-primary text-md">
                  {account_description}
                </CardDescription>
              </div>
              <div className="h-10 flex flex-col justify-evenly items-start">
                <CardDescription className="text-xs ">Username</CardDescription>
                <CardDescription className="text-primary text-md">
                  {username}
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
              {url ? (
                <Link
                  href={{ pathname: url }}
                  target="_blank"
                  className="h-10 flex flex-col justify-evenly items-center"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-primary"
                  >
                    <span className="material-symbols-outlined">
                      open_in_new
                    </span>
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled size="icon" className="">
                  <span className="material-symbols-outlined">open_in_new</span>
                </Button>
              )}
              <div className="h-10 flex flex-col justify-evenly items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-primary"
                  onClick={() => copyToClipboard(username, "Username")}
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
                  onClick={() => copyToClipboard(password, "Password")}
                >
                  <span className="material-symbols-outlined">
                    content_copy
                  </span>
                </Button>
              </div>
            </CardContent>

            <CardContent
              className={clsx(
                "w-5 h-36 p-0 rounded-r-xl ml-2",
                { "bg-red-500": password_score === 1 },
                { "bg-orange-500": password_score === 2 },
                { "bg-yellow-500": password_score === 3 },
                { "bg-lime-500": password_score === 4 },
                { "bg-green-500": password_score === 5 }
              )}
            ></CardContent>
          </div>
        </div>
      </Card>
      <DialogContent className="w-[90%] max-w-[90vw] rounded-xl">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>{account_description}</DialogDescription>
        </DialogHeader>

        <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            person
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[80%] items-center">
            <p className="text-xs text-primary">Username</p>
            <ScrollArea className="max-w-[150px] xs:max-w-[300px]">
              <p onClick={() => copyToClipboard(username, "Username")}>
                {username}
              </p>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="text-primary rounded-full"
            onClick={() => copyToClipboard(username, "Username")}
          >
            <span className="material-symbols-outlined">content_copy</span>
          </Button>
        </div>

        <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            password
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[80%] items-center">
            <p className="text-xs text-primary">Password</p>
            <ScrollArea className="max-w-[150px] xs:max-w-[300px]">
              <p
                className=""
                onClick={() => copyToClipboard(password, "Password")}
              >
                {isVisible ? password : "******"}
              </p>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="text-primary rounded-full"
            onClick={() => setIsVisible(!isVisible)}
          >
            <span className="material-symbols-outlined">
              {isVisible ? "visibility" : "visibility_off"}
            </span>
          </Button>
        </div>

        <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            link
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[80%] items-center">
            <p className="text-xs text-primary">Website URL</p>
            <ScrollArea className="max-w-[150px] xs:max-w-[300px]">
              <p onClick={() => copyToClipboard(url, "Website URL")}>{url}</p>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          {url ? (
            <Link href={{ pathname: url }} target="_blank">
              <Button
                variant="outline"
                size="icon"
                className="text-primary rounded-full"
              >
                <span className="material-symbols-outlined">open_in_new</span>
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled
            >
              <span className="material-symbols-outlined">open_in_new</span>
            </Button>
          )}
        </div>

        <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            readiness_score
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[80%] items-center">
            <p className="text-xs text-primary">Password Strength</p>
            <p>
              {password_score}{" "}
              <span className="text-xs text-secondary-foreground">/5</span>
            </p>
          </div>
          <span
            className={clsx(
              "material-symbols-outlined w-10 h-10 flex justify-center items-center text-3xl",
              { "text-red-500": password_score === 1 },
              { "text-orange-500": password_score === 2 },
              { "text-yellow-500": password_score === 3 },
              { "text-lime-500": password_score === 4 },
              { "text-green-500": password_score === 5 }
            )}
          >
            flag_circle
          </span>
        </div>

        <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            date_range
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[90%] items-center">
            <p className="text-xs text-primary">Created on</p>
            <p>{createdAt}</p>
          </div>
        </div>

        <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            update
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[90%] items-center">
            <p className="text-xs text-primary">Last Updated</p>
            <p>{updatedAt}</p>
          </div>
        </div>

        <DialogFooter className="flex flex-row items-center justify-end">
          <Link
            href={{
              pathname: "/dashboard/passwords/edit",
              query: { id: _id },
            }}
          >
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
                <AlertDialogAction
                  className="rounded-full bg-red-500"
                  onClick={() => deletePassword(_id)}
                >
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

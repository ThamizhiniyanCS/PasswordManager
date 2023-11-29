"use client";

import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { extendedPasswordType } from "@/lib/typeDefinitions";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { deletePassword } from "@/lib/actions";

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

import { Button } from "./ui/button";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";

import dynamic from "next/dynamic";

type Props = {
  details: extendedPasswordType;
};

const PasswordDetails = ({ details }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    // ssr: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const keyDownHandler = (event: any) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (searchParams.has("id")) {
          params.delete("id");
          replace(`${pathname}?${params.toString()}`);
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pathname, replace, searchParams]);

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
    <ScrollArea
      className={cn(
        "hidden h-full w-full rounded-xl border p-2 lg:flex lg:w-[49%]"
      )}
    >
      <ScrollArea className="">
        <p className="text-3xl mb-3">{details.account_description}</p>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="mb-3" />

      <div className="w-full h-300 flex flex-col xl:flex-row">
        <div className="w-full xl:w-[calc(100%-300px)] flex flex-col justify-evenly">
          <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px] my-4">
            <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
              person
            </span>
            <Separator orientation="vertical" className="mx-1 " />
            <div className="w-[80%] items-center">
              <p className="text-xs text-primary">Username</p>
              <ScrollArea className="max-w-[150px] xs:max-w-[300px]">
                <p
                  onClick={() => copyToClipboard(details.username, "Username")}
                >
                  {details.username}
                </p>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="text-primary rounded-full"
              onClick={() => copyToClipboard(details.username, "Username")}
            >
              <span className="material-symbols-outlined">content_copy</span>
            </Button>
          </div>

          <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px] my-4">
            <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
              password
            </span>
            <Separator orientation="vertical" className="mx-1 " />
            <div className="w-[80%] items-center">
              <p className="text-xs text-primary">Password</p>
              <ScrollArea className="max-w-[150px] xs:max-w-[300px]">
                <p
                  className=""
                  onClick={() => copyToClipboard(details.password, "Password")}
                >
                  {isVisible ? details.password : "******"}
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

          <div className="w-full flex justify-between items-center rounded-full p-2 border-primary border-[1px] my-4">
            <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
              link
            </span>
            <Separator orientation="vertical" className="mx-1 " />
            <div className="w-[80%] items-center">
              <p className="text-xs text-primary">Website URL</p>
              <ScrollArea className="max-w-[150px] xs:max-w-[300px]">
                <p onClick={() => copyToClipboard(details.url, "Website URL")}>
                  {details.url}
                </p>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            {details.url ? (
              <Link href={{ pathname: details.url }} target="_blank">
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
        </div>
        <div className="w-full flex justify-center items-center flex-col xl:w-[300px] h-[300px]">
          <GaugeComponent
            value={details.password_score * 20}
            type="radial"
            labels={{
              valueLabel: {
                matchColorWithArc: true,
                formatTextValue: (value) => details.password_score + "/5",
              },
              tickLabels: {
                type: "inner",
                ticks: [
                  { value: 20 },
                  { value: 40 },
                  { value: 60 },
                  { value: 80 },
                  { value: 100 },
                ],
              },
            }}
            arc={{
              colorArray: [
                "#ef4444",
                "#f97316",
                "#eab308",
                "#84cc16",
                "#22c55e",
              ],
              subArcs: [{}, {}, {}, {}, {}],
              padding: 0.02,
              width: 0.3,
            }}
            pointer={{
              elastic: true,
              animationDelay: 0,
            }}
          />
          <p className="text-primary w-full text-center">Password Score</p>
        </div>
      </div>

      <div className="w-full flex justify-between my-2">
        <div className="w-[49%] flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            date_range
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[90%] items-center">
            <p className="text-xs text-primary">Created on</p>
            <p>{details.createdAt}</p>
          </div>
        </div>

        <div className="w-[49%] flex justify-between items-center rounded-full p-2 border-primary border-[1px]">
          <span className="material-symbols-outlined w-[10%] h-full flex justify-center items-center text-primary">
            update
          </span>
          <Separator orientation="vertical" className="mx-1 " />
          <div className="w-[90%] items-center">
            <p className="text-xs text-primary">Last Updated</p>
            <p>{details.updatedAt}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between my-2">
        <Link
          href={{
            pathname: "/dashboard/passwords/edit",
            query: { id: details._id },
          }}
        >
          <Button
            type="button"
            variant="default"
            className="h-20 w-[49%] flex items-center justify-center text-xl rounded-full my-4 "
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
              className="h-20 w-[49%] flex items-center justify-center text-xl rounded-full bg-red-500 my-4 "
            >
              <span className="material-symbols-outlined">delete</span>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90%]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                credentials and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-full bg-red-500"
                onClick={() => deletePassword(details._id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ScrollArea>
  );
};

export default PasswordDetails;

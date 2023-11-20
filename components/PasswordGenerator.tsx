import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Checkbox } from "@/components/ui/checkbox";
import generator from "generate-password";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "./ui/slider";
import { useState } from "react";
import PasswordStrength from "./usePasswordStrength";
import { UseFormSetValue, FieldValues } from "react-hook-form";
type Props = {
  password: string;
  setPassword: (val: string) => void;
  setFormValues: UseFormSetValue<{
    password: string;
    username: string;
    account_description: string;
    url?: string | undefined;
  }>;
};

const PasswordGenerator = ({ password, setPassword, setFormValues }: Props) => {
  const { toast } = useToast();
  const [passwordLength, setPasswordLength] = useState(12);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const copyToClipboard = (contentToCopy: string, name: string) => {
    if (contentToCopy === "") {
      toast({
        variant: "destructive",
        title: "Password is Empty.",
        description: "There is no password to Copy to Clipboard.",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => copyToClipboard(contentToCopy, name)}
          >
            Try again
          </ToastAction>
        ),
      });
    } else {
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
    }
  };

  const generatePassword = () => {
    const gPassword = generator.generate({
      length: passwordLength,
      numbers: numbers,
      symbols: symbols,
      uppercase: uppercase,
      lowercase: lowercase,
    });

    setPassword(gPassword);
    setFormValues("password", gPassword);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <PasswordStrength password={password} />
      <h3 className="w-full text-lg my-2 text-left">Password Generator</h3>
      <div className="w-full flex justify-evenly items-center">
        <Button
          variant="default"
          size="icon"
          type="button"
          onClick={generatePassword}
        >
          <span className="material-symbols-outlined">casino</span>
        </Button>
        <Button
          variant="default"
          size="icon"
          type="button"
          onClick={() => copyToClipboard(password, "Password")}
        >
          <span className="material-symbols-outlined">content_copy</span>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="icon" type="button">
              <span className="material-symbols-outlined">tune</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] max-w-[90vw] rounded-xl">
            <DialogHeader>
              <DialogTitle>Options</DialogTitle>
              <DialogDescription>
                Customize the way you want your password to be.
              </DialogDescription>
            </DialogHeader>

            <p>Length of the Password</p>
            <div className="w-full flex justify-center items-center">
              <div className="w-10 h-10 min-w-10 rounded-md flex justify-center items-center border border-primary">
                {passwordLength}
              </div>
              <Slider
                defaultValue={[passwordLength]}
                max={50}
                step={1}
                onValueChange={(value) => setPasswordLength(value[0])}
                className="ml-2"
                value={[passwordLength]}
              />
            </div>

            <div className="w-full flex justify-start items-center">
              <Checkbox
                id="numbers"
                className="mx-2"
                onCheckedChange={(value) => setNumbers(value as boolean)}
                checked={numbers}
              />
              <Label
                htmlFor="numbers"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Numbers
              </Label>
            </div>

            <div className="w-full flex justify-start items-center">
              <Checkbox
                id="symbols"
                className="mx-2"
                onCheckedChange={(value) => setSymbols(value as boolean)}
                checked={symbols}
              />
              <Label
                htmlFor="symbols"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Symbols
              </Label>
            </div>

            <div className="w-full flex justify-start items-center">
              <Checkbox
                id="uppercase"
                className="mx-2"
                onCheckedChange={(value) => setUppercase(value as boolean)}
                checked={uppercase}
              />
              <Label
                htmlFor="uppercase"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Uppercase Letters
              </Label>
            </div>

            <div className="w-full flex justify-start items-center">
              <Checkbox
                id="lowercase"
                className="mx-2"
                onCheckedChange={(value) => setLowercase(value as boolean)}
                checked={lowercase}
              />
              <Label
                htmlFor="lowercase"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Lowercase Letters
              </Label>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                >
                  Close
                </Button>
              </DialogClose>

              <Button
                className="rounded-full mb-2"
                type="button"
                onClick={() => {
                  setPasswordLength(12);
                  setNumbers(true);
                  setSymbols(true);
                  setUppercase(true);
                  setLowercase(true);
                }}
              >
                Reset Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PasswordGenerator;

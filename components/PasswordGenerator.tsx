import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "./ui/slider";
import { useState } from "react";
import usePasswordStrength from "./usePasswordStrength";

type Props = { password: string; setPassword: (val: string) => void };

const PasswordGenerator = ({ password, setPassword }: Props) => {
  const { toast } = useToast();

  //   console.log(usePasswordStrength(password)?.score);

  const [passwordLength, setPasswordLength] = useState(12);

  const [characters, setCharacters] = useState([
    "!",
    "#",
    "$",
    "%",
    "&",
    "`",
    "'",
    '"',
  ]);

  //   # $ % ^ & * () [] {} ! @ ~ + - | / \
  const specialCharacters = "!@#$%^&*()_+-={}[]\\|;:,<.>/?";
  let something = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

//   const [numbers, setNumbers] = useState(true);

//   const [uppercase, setUppercase] = useState(true);
//   const [lowercase, setLowercase] = useState(true);
//   const [symbols, setSymbols] = useState(true);
//   const [numbersAndSymbols, setNumbersAndSymbols] = useState(true);
//   const [uppercaseAndSymbols, setUppercaseAndSymbols] = useState(true);
//   const [uppercaseAndNumbers, setUppercaseAndNumbers] = useState(true);
//   const [lowercaseAndSymbols, setLowercaseAndSymbols] = useState(true);
//   const [lowercaseAndNumbers, setLowercaseAndNumbers] = useState(true);

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

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full flex justify-evenly items-center">
        <Button variant="default" size="icon" type="button">
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
                defaultValue={[12]}
                max={50}
                step={1}
                onValueChange={(value) => setPasswordLength(value[0])}
                className="ml-2"
              />
            </div>

            <p>Included Special Characters</p>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PasswordGenerator;

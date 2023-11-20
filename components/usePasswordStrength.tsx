"use client";

import { useState, useEffect, useDeferredValue } from "react";
import { zxcvbnOptions, zxcvbnAsync, ZxcvbnResult } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import { Progress } from "./ui/progress";
import clsx from "clsx";

// optional
const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher("pwned", matcherPwned);

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";

const options = {
  // recommended
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  // recommended
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  // recommended
  useLevenshteinDistance: true,
  // optional
  translations: zxcvbnEnPackage.translations,
};
zxcvbnOptions.setOptions(options);

const usePasswordStrength = (password: string) => {
  const [result, setResult] = useState<ZxcvbnResult | null>(null);
  // NOTE: useDeferredValue is React v18 only, for v17 or lower use debouncing
  const deferredPassword = useDeferredValue(password);

  useEffect(() => {
    zxcvbnAsync(deferredPassword).then((response) => setResult(response));
  }, [deferredPassword, setResult]);

  return result;
};

type Props = { password: string };

export default function PasswordStrength({ password }: Props) {
  const result = usePasswordStrength(password);
  const { toast } = useToast();

  return (
    <div className="mb-2 w-full">
      {password !== "" ? (
        <Progress
          className={clsx("mb-2 w-full")}
          value={result?.score ? (result.score + 1) * 20 : 20}
        />
      ) : (
        <Progress className={clsx("mb-2 w-full")} />
      )}
      {password !== "" && (
        <div>
          <p className="text-sm text-center text-slate-300 flex justify-center items-center">
            <span>
              It takes{" "}
              <span className={clsx("text-red-500")}>
                {result?.crackTimesDisplay.offlineFastHashing1e10PerSecond}
              </span>{" "}
              to crack your password.
            </span>
            <span
              className="material-symbols-outlined w-6 h-6 flex justify-center items-center text-primary font-extrabold"
              onClick={() => {
                toast({
                  variant: "default",
                  title: "For Your Info",
                  description:
                    "These crack times are basend on Offline Fast Hashing, at a speed of 1e10 per second ",
                });
              }}
            >
              info
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

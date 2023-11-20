import { useState, useEffect, useDeferredValue } from "react";
import { zxcvbnOptions, zxcvbnAsync, ZxcvbnResult } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
// import * as zxcvbnDePackage from "@zxcvbn-ts/language-de";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";

// optional
const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher("pwned", matcherPwned);

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

export default usePasswordStrength;

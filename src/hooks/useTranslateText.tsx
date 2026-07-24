import FastTranslator from "fast-mlkit-translate-text";
import { useCallback } from "react";

export function useTranslateText() {
  const translateText = useCallback(async (text: string) => {
    return FastTranslator.translate(text).then(
      (result) => result,
    ) as Promise<string>;
  }, []);

  return { translateText };
}

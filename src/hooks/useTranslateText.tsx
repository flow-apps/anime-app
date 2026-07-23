import FastTranslator from "fast-mlkit-translate-text";
import { useCallback, useEffect } from "react";

export function useTranslateText() {
  useEffect(() => {
    (async () => {
      await FastTranslator.prepare({
        source: "English",
        target: "Portuguese",
        downloadIfNeeded: true,
      });
    })();
  }, [FastTranslator]);

  const translateText = useCallback(
    async (text: string) => {
      return FastTranslator.translate(text).then(
        (result) => result,
      ) as Promise<string>;
    },
    [FastTranslator],
  );

  return { translateText };
}

import FastTranslator, { Languages } from "fast-mlkit-translate-text";
import { useCallback, useEffect } from "react";

export function useTranslateText(source?: Languages, target?: Languages) {
  useEffect(() => {
    (async () => {
      await FastTranslator.prepare({
        source: source || "English",
        target: target || "Portuguese",
        downloadIfNeeded: true,
      });
    })();
  }, [FastTranslator, source, target]);

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

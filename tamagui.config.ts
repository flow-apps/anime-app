import { getDefaultTamaguiConfig } from "@tamagui/config-default";
import { createFont, createTamagui } from "tamagui";

const fredoka = createFont({
  family: "Fredoka",
  size: {
    1: 12,
    2: 16,
    3: 32,
    4: 40,
  },
  lineHeight: {
    2: 22,
  },
  weight: {
    1: "300",
    2: "400",
    3: "600",
    4: "700",
  },
  letterSpacing: {
    1: 0,
    2: -1,
  },
  face: {
    "300": { normal: "Fredoka_300Light" },
    "400": { normal: "Fredoka_400Regular" },
    "600": { normal: "Fredoka_700Bold" },
    "700": { normal: "Fredoka_700Bold" },
  },
});

export const config = createTamagui({
  ...getDefaultTamaguiConfig(),
  fonts: {
    heading: fredoka,
    body: fredoka,
  },
  themes: {
    light: {
      bg: "#ffffff",
      shape: "#e1e1e1",
      grey: "#555",
      textColor: "#000",
      red: "#e63945",
    },
    dark: {
      bg: "#0F1A2A",
      shape: "#0a121d",
      textColor: "#fff",
      red: "#e63945",
      grey: "#aaa",
    },
  },
});

type OurConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}

import { ConfigState } from "@/redux/slices/configsSlice";
import { useSelector } from "react-redux";
import { TamaguiProvider } from "tamagui";
import { config } from "../../../tamagui.config";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme_name } = useSelector((state: ConfigState) => state);

  return (
    <TamaguiProvider config={config} defaultTheme={theme_name}>
      {children}
    </TamaguiProvider>
  );
};

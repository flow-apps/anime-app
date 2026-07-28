import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { TamaguiProvider } from "tamagui";
import { config } from "../../../tamagui.config";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme_name } = useSelector((state: RootState) => state.configs);

  return (
    <TamaguiProvider config={config} defaultTheme={theme_name}>
      {children}
    </TamaguiProvider>
  );
};

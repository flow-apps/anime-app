import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ConfigState {
  theme_name: "dark" | "light";
  translate_text: boolean;
  adult_content: boolean;
}

export interface IConfigPayload {
  configName: keyof ConfigState;
  value: ConfigState[keyof ConfigState];
}

const initialState: ConfigState = {
  theme_name: "dark",
  translate_text: true,
  adult_content: false,
};

export const configsSlice = createSlice({
  name: "configs",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<IConfigPayload>) => {
      const { configName, value } = action.payload;

      (state[configName] as ConfigState[typeof configName]) = value as any;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConfig } = configsSlice.actions;

export default configsSlice.reducer;

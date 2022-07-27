import React from "react";
import { theme } from "./stitches.config";
import { TridentThemeContext } from "./types";

export const defaultContext: TridentThemeContext = {
  isDark: false,
  theme,
  type: "light",
};

const ThemeContext: React.Context<TridentThemeContext> =
  React.createContext<TridentThemeContext>(defaultContext);

export default ThemeContext;

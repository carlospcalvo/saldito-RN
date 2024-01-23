import React from "react";

export type ThemeKey = "light" | "dark";

export const ThemeContext = React.createContext({
	theme: "light" as ThemeKey,
	toggleTheme: () => {},
});

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(true);

  const light = {
    text: "#28292E",
    header: "#FFFFFF",
    background: "#8FBEEA",
    primary: "#6097CB",
    card: "#F9FDFF",
    wall: "#FAFAFA",
    navHover: "#F8F8F8",
    btn: "#F4F4F4",
  };

  const dark = {
    text: "#FAFAFA",
    header: "#EEEEEE",
    background: "#1E1E1E",
    primary: "#6097CB",
    card: "#101010",
    wall: "#131313",
    navHover: "#1A1A1A",
    btn: "#282828",
  };

  const value = {
    lightMode,
    setLightMode,
    light,
    dark,
  };

  useEffect(() => {
    if (window.localStorage.getItem("lightMode") != null) {
      const theme = JSON.parse(window.localStorage.getItem("lightMode"));
      setLightMode(theme);
    }
    else window.localStorage.setItem("lightMode", lightMode);
  }, []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

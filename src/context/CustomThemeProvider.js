import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from '../themes/LightTheme';
import darkTheme from '../themes/DarkTheme';

export const ThemeContext = createContext({
  toggleTheme: () => { },
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

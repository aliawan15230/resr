import React, { createContext, useState } from 'react';

export const ModeConext = createContext();

export const ModeProvider = ({ children }) => {

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = {
    isDarkMode,
    toggleMode,
  };

  return (
    <ModeConext.Provider value={theme}>
      {children}
    </ModeConext.Provider>
  );
};

import { useState } from "react";
import AuthContextProvider from "./AuthContext";
import HeaderContext from "./HeaderContext";

export default function ContextWrapper({ children }) {
  const [isBlack, setIsBlack] = useState(false);

  return (
    <AuthContextProvider>
      <HeaderContext.Provider value={{ isBlack, setIsBlack }}>
        {children}
      </HeaderContext.Provider>
    </AuthContextProvider>
  );
}

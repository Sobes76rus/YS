import HeaderContext from "../contexts/HeaderContext";
import { useState } from "react";

export default function ContextWrapper({ children, navigation }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isBlack, setIsBlack] = useState(false);

  return (
    <HeaderContext.Provider
      value={{ loggedIn, setLoggedIn, isBlack, setIsBlack }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

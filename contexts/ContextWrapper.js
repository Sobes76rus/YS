import { useState } from "react";
import AuthContext from "./AuthContext";
import AlbumsContext from "./AlbumsContext";
import HeaderContext from "./HeaderContext";

export default function ContextWrapper({ children }) {
  const [user, setUser] = useState("");
  const [isBlack, setIsBlack] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <HeaderContext.Provider value={{ isBlack, setIsBlack }}>
        {children}
      </HeaderContext.Provider>
    </AuthContext.Provider>
  );
}

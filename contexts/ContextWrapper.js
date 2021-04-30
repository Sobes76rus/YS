import { useState } from "react";
import AuthContext from "./AuthContext";
import FilterContext from "./FilterContext";
import HeaderContext from "./HeaderContext";

export default function ContextWrapper({ children }) {
  const [user, setUser] = useState("");
  const [isBlack, setIsBlack] = useState(false);
  const [cards, setCards] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <HeaderContext.Provider value={{ isBlack, setIsBlack }}>
        <FilterContext.Provider value={{ cards, setCards }}>
          {children}
        </FilterContext.Provider>
      </HeaderContext.Provider>
    </AuthContext.Provider>
  );
}

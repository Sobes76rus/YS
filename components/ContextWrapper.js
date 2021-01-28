import HeaderContext from "../contexts/HeaderContext";
import { useState } from "react";

export default function ContextWrapper({ children, navigation }) {
  const [menuItems] = useState(navigation);
  return <HeaderContext.Provider value={{menuItems}}>{children}</HeaderContext.Provider>;
}

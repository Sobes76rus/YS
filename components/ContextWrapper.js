import HeaderContext from "../contexts/HeaderContext";
import { useState } from "react";

export default function ContextWrapper({ children, navigation }) {
  const [menuItems] = useState(navigation);
  return <HeaderContext.Provider>{children}</HeaderContext.Provider>;
}

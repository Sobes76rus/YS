import { createContext, useContext, useState } from "react";
import Router from "next/router";
const AuthContext = createContext({});

export function useLoginUser(email) {
  const context = useContext(AuthContext);
  context.setUser({ email });
  Router.push("/");
}
export function useLogoutUser(email) {
  const context = useContext(AuthContext);
  context.setUser(null);
  Router.replace("/login");
}
export function useUser() {
  const { user } = useContext(AuthContext);
  return user;
}

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

"use client";
import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [id, setUserId] = useState("");
  return (
    <UserContext.Provider value={{ id, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;

import React, { createContext, PropsWithChildren, useState } from "react";

interface ContextUser {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isGoogle: boolean;
  setIsGoogle: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserContext = createContext({} as ContextUser);

const UserStore: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    if (localStorage.getItem("isAuth") === "true") {
      return true;
    } else {
      return false;
    }
  });

  const [isGoogle, setIsGoogle] = useState(() => {
    if (localStorage.getItem("isGoogle") === "true") {
      return true;
    } else {
      return false;
    }
  });

  return (
    <UserContext.Provider value={{ isAuth, setIsAuth, isGoogle, setIsGoogle }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStore;

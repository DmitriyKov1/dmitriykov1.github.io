import React, { createContext, useState} from "react";

export const UserContext = createContext()

export const UserStore = ({children}) => {
    const [isAuth, setIsAuth] = useState(() => {
        if (localStorage.getItem("isAuth")=== "true") {
            return true
        } else {
            return false
        }
    })

    return (
        <UserContext.Provider value={{isAuth, setIsAuth}}>{children}</UserContext.Provider>
    )
}


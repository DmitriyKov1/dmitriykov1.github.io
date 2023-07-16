import React, { useEffect, useContext } from "react";
import File from "../Components/File/File";
import { UserContext } from "../UserStore";
import { APIContext } from "../ApiRequest";
import Login from "../Components/Login/Login";

const Main: React.FC = () => {
  const { isAuth } = useContext(UserContext);
  const { Authorization } = useContext(APIContext);

  useEffect(() => {
    if (!isAuth) {
      if (new URLSearchParams(window.location.search).get("code")) {
        Authorization()
          .then((data) => {
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("token", data.data.access_token);
          })
          .then(() => {
            window.location.reload();
          });
      } else if (window.location.hash) {
        localStorage.setItem("isGoogle", "true");
        localStorage.setItem("isAuth", "true");
        localStorage.setItem(
          "token",
          new URLSearchParams(window.location.hash).get("access_token")!
        );
        window.location.reload();
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isAuth ? <File /> : <Login />}</>;
};

export default Main;

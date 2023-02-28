import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./bootstrap/css/bootstrap.css";
import UserStore from "./UserStore";
import APIrequest from "./ApiRequest";

ReactDOM.render(
  <BrowserRouter>
    <UserStore>
      <APIrequest>
        <App />
      </APIrequest>
    </UserStore>
  </BrowserRouter>,
  document.getElementById("root")
);

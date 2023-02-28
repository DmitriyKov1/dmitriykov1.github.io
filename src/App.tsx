import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import File from "./Pages/File";
import { LOGIN_ROUTE, FILE_ROUTE } from "./constants";
import Layout from "./Components/Layout";

const App: React.FC = () => {
    return (
        <div className="container">
            <div className="app">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path={LOGIN_ROUTE} element={<Login />} />
                        <Route path={FILE_ROUTE} element={<File />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default App;

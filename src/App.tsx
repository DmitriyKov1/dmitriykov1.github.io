import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import { LOGIN_ROUTE } from "./constants";
import Layout from "./Components/Layout";

const App: React.FC = () => {
    return (
        <div className="container">
            <div className="app">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path={LOGIN_ROUTE} element={<Main />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default App;

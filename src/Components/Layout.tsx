import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import "../index.css";

const Layout: React.FC = () => {
    return (
        <>
            <div className="wrapper">
                <header>
                    <Navbar />
                </header>
                <main>
                    <Outlet />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
};
export default Layout;

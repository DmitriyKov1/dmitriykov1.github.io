import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserStore";
import { LOGIN_ROUTE } from "../../constants";
import { FILE_ROUTE } from "../../constants";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
    const { isAuth } = useContext(UserContext);
    const navigate = useNavigate();

    function handlLogout() {
        localStorage.clear();
        navigate(LOGIN_ROUTE);
    }
    return (
        <div className="navbar">
            <div className={`navbar-inner ${styles.navbarIner}`}>
                <div className={styles.navbarItem}>
                    <a className="brand" href={FILE_ROUTE}>
                        Файловый менеджер!
                    </a>
                    {isAuth ? (
                        <button className="btn" onClick={handlLogout}>
                            Выход
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

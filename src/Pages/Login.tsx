import React from "react";
import styles from "../Pages/Login.module.css";
import { URL_DROPBOX } from "../constants";
import { URL_GOOGLE } from "../constants";

const Login: React.FC = () => {
    const urlGoogle = URL_GOOGLE;
    const urlDropbox = URL_DROPBOX;
    return (
        <div className={styles.loginToolbar}>
            <h1>Авторизоваться</h1>

            <a className="btn" href={urlGoogle}>
                Google
            </a>
            <a className="btn" href={urlDropbox}>
                Dropbox
            </a>
        </div>
    );
};

export default Login;

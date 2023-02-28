import React, { useContext } from "react";
import { UserContext } from "../../UserStore";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbProps {
    pathFolder: string;
    handleClickDropbox: (
        e: React.MouseEvent<HTMLAnchorElement>,
        pathBack: string
    ) => void;
    handleClickBackGoogle: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    pathBack: string;
    id: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    pathFolder,
    handleClickDropbox,
    handleClickBackGoogle,
    pathBack,
    id,
}) => {
    const { isGoogle } = useContext(UserContext);
    const handleClickBack = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string[]
    ) => {
        isGoogle ? handleClickBackGoogle(e) : handleClickDropbox(e, pathBack);
    };
    return (
        <>
            <div className={styles.breadcrump}>
                <div className="back-btn ">
                    <a
                        className="btn"
                        href={pathBack}
                        onClick={(e) => handleClickBack(e, id)}
                    >
                        Назад
                    </a>
                </div>
                <div className={styles.breadcrumpItem}>
                    File: {pathFolder === "" ? "/" : pathFolder}
                </div>
            </div>
        </>
    );
};

export default Breadcrumb;

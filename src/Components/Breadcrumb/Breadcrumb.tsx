import React from "react";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbProps {
    pathFolder: string
    handleClickDropbox: (e: React.MouseEvent<HTMLAnchorElement>, pathBack: string,) => void;
    handleClickGoogle: (e: React.MouseEvent<HTMLAnchorElement>, pathBack: string, id: string) => void;
    pathBack: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({pathFolder, handleClickDropbox, handleClickGoogle, pathBack}) => {


    return (
        <>
        <div className={styles.breadcrump}>
            <div className="back-btn ">
                <a className="btn" href={pathBack} onClick={(e) => handleClickDropbox(e, pathBack,)}>
                    Назад
                </a>
            </div>
            <div className={styles.breadcrumpItem}>
                Dropbox {pathFolder === "" ? "/" : pathFolder}
            </div>
        </div>
        </>
    )
}


export default Breadcrumb
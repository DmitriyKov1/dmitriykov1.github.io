import React, { useState, useContext } from "react";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./Body.module.css";
import { UserContext } from "../../UserStore";

interface BodyProps {
    item: {
        id: string;
        name: string;
        path_display: string;
        size: number;
        fileSize: number;
        client_modified: string;
        modifiedDate: string;
        ".tag": string;
        mimeType: string;
        title: string;
    };
    handleClickDropbox: (
        e: React.MouseEvent<HTMLAnchorElement>,
        pathBack: string
    ) => void;
    handleClickGoogle: (
        e: React.MouseEvent<HTMLAnchorElement>,
        pathBack: string,
        name: string
    ) => void;
    index: number;
}

const Body: React.FC<BodyProps> = ({
    handleClickDropbox,
    handleClickGoogle,
    item,
    index,
}) => {
    const [showDropdown, setShowDropdawn] = useState(false);
    const [id, setId] = useState("");
    const { isGoogle } = useContext(UserContext);
    const onClickButton = (e: React.MouseEvent<HTMLAnchorElement>) => {
        isGoogle
            ? handleClickGoogle(e, item.id, item.title)
            : handleClickDropbox(e, item.path_display);
    };

    return (
        <tr
            key={index}
            onMouseEnter={() => {
                setId(item.id);
            }}
            onMouseLeave={() => {
                setId("");
                setShowDropdawn(false);
            }}
        >
            <td>
                <input type="checkbox" />
            </td>

            <td className={styles.listItem}>
                {item[".tag"] === "folder" ||
                item["mimeType"] === "application/vnd.google-apps.folder" ? (
                    <a
                        href={
                            isGoogle
                                ? `/file${item.id}`
                                : `/file${item.path_display}`
                        }
                        onClick={(e) => onClickButton(e)}
                    >
                        <span className={`icon-folder-open ${styles.icon}`} />
                        {isGoogle ? item.title : item.name}
                    </a>
                ) : (
                    <div>
                        <span className={`icon-file ${styles.icon}`} />
                        {isGoogle ? item.title : item.name}
                    </div>
                )}
                <div className={styles.dropdown}>
                    {item.id === id ? (
                        <Dropdown
                            showDropdown={showDropdown}
                            setShowDropdawn={setShowDropdawn}
                            delitePathDropbox={item.path_display}
                            delitePathGoogle={item.id}
                        />
                    ) : null}
                </div>
            </td>

            <td> {isGoogle ? item.fileSize : item.size}</td>

            <td>
                {" "}
                {isGoogle
                    ? item["client_modified"]
                        ? item["client_modified"].replace(/[\\T\\Z]/g, " ")
                        : "--"
                    : item["modifiedDate"]
                    ? item["modifiedDate"].replace(/[\\T\\Z]/g, " ")
                    : "--"}{" "}
            </td>
        </tr>
    );
};

export default Body;

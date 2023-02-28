import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";
import Toolbar from "../Components/Toolbar/Toolbar";
import Filebody from "../Components/Filebody/Filebody";
import { UserContext } from "../UserStore";
import { APIContext } from "../ApiRequest";

interface ListFolder {
    id: string;
    name: string;
    path_display: string;
    size: number;
    fileSize: number;
    modifiedDate: string;
    client_modified: string;
    ".tag": string;
    mimeType: string;
    title: string;
}

const File: React.FC = () => {
    const [folder, setFolder] = useState<ListFolder[]>([]);
    const [pathFolder, setPathFolder] = useState("");
    const [pathBack, setPathBack] = useState("");
    const { isGoogle } = useContext(UserContext);
    const {
        Authorization,
        getListFolderDropbox,
        getListFolderGoogle,
        getfolder,
    } = useContext(APIContext);
    const [id, setId] = useState<string[]>(["root"]);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            if (!window.location.hash) {
                Authorization()
                    .then((data) => {
                        setPathBack("");
                        localStorage.setItem("isAuth", "true");
                        localStorage.setItem("token", data.data.access_token);
                    })
                    .then(() => {
                        window.location.reload();
                    });
            } else {
                setPathBack("");
                localStorage.setItem("isGoogle", "true");
                localStorage.setItem("isAuth", "true");
                localStorage.setItem(
                    "token",
                    new URLSearchParams(window.location.hash).get(
                        "access_token"
                    )!
                );
                window.location.reload();
            }
        } else {
            if (isGoogle) {
                getListFolderGoogle().then((data) => {
                    const arr: ListFolder[] = [];
                    setFolder(arr);
                    for (let items of data.data.items) {
                        getfolder(items.id).then((data) => {
                            arr.push(data.data);
                            setFolder([...arr]);
                        });
                    }
                });
            } else {
                getListFolderDropbox()
                    .then((data) => {
                        if (data.status === 401) {
                            localStorage.clear();
                        } else {
                            return data;
                        }
                    })
                    .then((data) => {
                        setFolder(data!.data.entries);
                    });
            }
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickDropbox = (
        e: React.MouseEvent<HTMLAnchorElement>,
        path: string
    ) => {
        e.preventDefault();
        setPathFolder(path);
        getListFolderDropbox(path).then((data) => {
            let pathPop = path.split("/");
            pathPop.pop();
            setPathBack(pathPop.join("/"));
            setFolder(data.data.entries);
        });
    };
    const handleClickGoogle = (
        e: React.MouseEvent<HTMLAnchorElement>,
        path: string,
        name?: string
    ) => {
        e.preventDefault();
        setPathFolder(`${pathFolder} / ` + name);
        setId([...id, path]);
        getListFolderGoogle(path).then((data) => {
            const arr: ListFolder[] = [];
            setFolder(arr);
            for (let items of data.data.items) {
                getfolder(items.id).then((data) => {
                    arr.push(data.data);
                    setFolder([...arr]);
                });
            }
        });
    };

    const handleClickBackGoogle = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        id.pop();
        setId(id);
        const arr = pathFolder.split("/");
        arr.pop();
        const str = arr.join(" / ");
        setPathFolder(str);
        getListFolderGoogle(id.at(-1)).then((data) => {
            const arr: ListFolder[] = [];
            setFolder(arr);
            for (let items of data.data.items) {
                getfolder(items.id).then((data) => {
                    arr.push(data.data);
                    setFolder([...arr]);
                });
            }
        });
    };
    return (
        <>
            <Toolbar />
            <Breadcrumb
                pathFolder={pathFolder}
                pathBack={pathBack}
                handleClickDropbox={handleClickDropbox}
                handleClickBackGoogle={handleClickBackGoogle}
                id={id}
            />
            <Filebody
                handleClickDropbox={handleClickDropbox}
                handleClickGoogle={handleClickGoogle}
                folder={folder}
            />
        </>
    );
};

export default File;

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Toolbar from "../Toolbar/Toolbar";
import Filebody from "../Filebody/Filebody";
import { APIContext } from "../../ApiRequest";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserStore";

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

const File = () => {
  const { isGoogle } = useContext(UserContext);
  const [folder, setFolder] = useState<ListFolder[]>([]);
  const [pathFolder, setPathFolder] = useState("");
  const [id, setId] = useState<string[]>(["root"]);
  const [pathBack, setPathBack] = useState("");
  const { getListFolderDropbox, getListFolderGoogle, getfolder } =
    useContext(APIContext);

  useEffect(() => {
    if (isGoogle) {
      getListFolderGoogle().then((data) => {
        const arr: ListFolder[] = [];
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

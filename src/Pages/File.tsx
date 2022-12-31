import React, {useState, useEffect, useContext} from "react";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";
import Toolbar from "../Components/Toolbar/Toolbar";
import axios from "axios";
import Filebody from "../Components/Filebody/Filebody"
import { UserContext } from "../UserStore";

  interface ListFolder {
    id: string;
    name: string;
    path_display: string;
    size: number;
    fileSize: number;
    modifiedDate: string;
    "client_modified": string;
    ".tag": string;
    "mimeType": string;
    title: string;
  }

  const File: React.FC = () => {
    let token = window.location.hash ? new URLSearchParams(window.location.hash).get("access_token") : new URLSearchParams(window.location.search).get("code");
        const [folder, setFolder] = useState<ListFolder[]>([]);
        const [pathFolder, setPathFolder] = useState("") 
        const [pathBack, setPathBack] = useState("")
        const {isGoogle} = useContext(UserContext)

        let getListFolderGoogle = (path= "root") => {
          return axios.get(`https://www.googleapis.com/drive/v2/files/root/children`,
          {
            params: {
              "folderId": path,
              "trashed": false,},
            headers: {
            Authorization: `Bearer ${token}`},
          } )
        }
        let getListFolderDropbox = (path = "") => {
          return axios.post("https://api.dropboxapi.com/2/files/list_folder",{
                    "include_deleted": false,
                    "include_has_explicit_shared_members": false,
                    "include_media_info": false,
                    "include_mounted_folders": true,
                    "include_non_downloadable_files": true,
                    "path": path,
                    "recursive": false,
                  }, 
                  {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                
                })
        };
            
        useEffect(() => {
          if (!localStorage.getItem("token")) {
            if (!window.location.hash) {
              axios.post("https://api.dropbox.com/oauth2/token", `code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/file`,{
              headers: {
                Authorization: "Basic eWsxOTY4N2R4eW0wamZvOnBlODB1NWN2dzNtZ3J6bg==",
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }) 
              .then((data) => {
                setPathBack("")
                localStorage.setItem("isAuth", "true" )
                localStorage.setItem("token", data.data.access_token);
              })
              .then(() =>{window.location.reload()})
            } else {
                setPathBack("")
                localStorage.setItem("isGoogle", "true")
                localStorage.setItem("isAuth", "true" )
                localStorage.setItem("token", token!);
                window.location.reload()
            }                      
          } else {

            

            if (isGoogle) {
              getListFolderGoogle().then(data => {
                console.log(data)
                setFolder(data.data.items)})  
              } else {
                getListFolderDropbox().then(data => {
                if (data.status === 401) {
                  localStorage.clear();
                } else {
                  return data;
                }
              }).then(data => {
                console.log(data)
                setFolder(data?.data.entries)})
              }
                }}, []);

        const handleClickDropbox = (e: React.MouseEvent<HTMLAnchorElement>, path: string, ) =>{
          e.preventDefault()
          setPathFolder(path)
          
          getListFolderDropbox(path).then(data => {
                let lincArr = path.split("/");
                lincArr.pop();
                setPathBack(lincArr.join("/"));
                setFolder(data.data.entries);
              })
        };
        const handleClickGoogle = (e: React.MouseEvent<HTMLAnchorElement>, path: string, ) =>{
          e.preventDefault()
          setPathFolder(path)
          getListFolderGoogle().then(data => {
                let lincArr = path.split("/");console.log(lincArr)
                lincArr.pop();
                setPathBack(lincArr.join("/"));
                setFolder(data.data.items);
              })
        };
        return (
          <>
          <Toolbar/>
          <Breadcrumb pathFolder={pathFolder} pathBack={pathBack} handleClickDropbox={handleClickDropbox} handleClickGoogle={handleClickGoogle}/>
          <Filebody handleClickDropbox={handleClickDropbox} handleClickGoogle={handleClickGoogle} folder={folder}/ >
          </>
          
        );
    
}


export default File
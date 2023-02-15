import React, { createContext, PropsWithChildren } from "react";
import axios, { AxiosResponse } from "axios";




interface ValueAPI {
    Authorization: () => Promise<AxiosResponse>,
    getListFolderGoogle: (path?: string) => Promise<AxiosResponse>,
    getListFolderDropbox: (path?: string) => Promise<AxiosResponse>,
    getfolder: (path: string) => Promise<AxiosResponse>,
    deleteItemDropbox: (path: string) => void,
    deleteItemGoogle: (path: string) => void,
}


export const APIContext = createContext({} as ValueAPI);

const APIrequest: React.FC<PropsWithChildren> = ({ children }) => {
    const axAuthDropbox = axios.create({
        baseURL: "https://api.dropboxapi.com",
    });

    const axDataDropbox = axios.create({
        baseURL: "https://api.dropboxapi.com",
    });

    const axDataGoogle = axios.create({
        baseURL: "https://www.googleapis.com",
    });

    axDataDropbox.interceptors.request.use((config) => {
        config.headers!.authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    });

    axDataGoogle.interceptors.request.use((config) => {
        config.headers!.authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    });

    const Authorization = (): Promise<AxiosResponse> => {
        const token = new URLSearchParams(window.location.search).get("code");
        return axAuthDropbox.post("/oauth2/token", `code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/file`, {
                headers: {
                    Authorization: "Basic eWsxOTY4N2R4eW0wamZvOnBlODB1NWN2dzNtZ3J6bg==",
                    "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        };
    const getListFolderDropbox = (path: string = ""): Promise<AxiosResponse> => {
            return axDataDropbox.post("/2/files/list_folder", {
                "include_deleted": false,
                "include_has_explicit_shared_members": false,
                "include_media_info": false,
                "include_mounted_folders": true,
                "include_non_downloadable_files": true,
                "path": path,
                "recursive": false,
            });
        };
    const getListFolderGoogle = (path = "root") => {
            return axDataGoogle.get(`/drive/v2/files/${path}/children`,
            {
                params: {
                    "folderId": path,
                    "trashed": false,
                },
                })
            };
        
    const getfolder = (path: string) => {
                return axDataGoogle.get(`/drive/v2/files/${path}`,
                    {
                    params: {
                        "folderId": path,
                        "trashed": false,
                    },
                    })
                } ;
    const deleteItemDropbox = (path: string) => {
            return axDataDropbox.post("/2/files/delete_v2",{                    
                "path": path,
                }).then(()=> {window.location.reload()})
                    
        };
    const deleteItemGoogle = (path: string) => {
        return axDataGoogle.delete(`/drive/v2/files/${path}`).then(()=> {window.location.reload()})
    }    
        
        return (
            <APIContext.Provider value={{  Authorization, getListFolderDropbox, getListFolderGoogle, getfolder, deleteItemDropbox, deleteItemGoogle}}>{children}</APIContext.Provider>
        );
};

export default APIrequest
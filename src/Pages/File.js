import {React, useState, useEffect} from "react";

export default function File() {
    

        let search = window.location.search;
        let params = new URLSearchParams(search);
        let token = params.get("code");
        const [folder, setFolder] = useState({
          cursor: "",
          entries: [],
        });

        let getListFolder = () => {
          return fetch("https://api.dropboxapi.com/2/files/list_folder", {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    "include_deleted": true,
                    "include_has_explicit_shared_members": true,
                    "include_media_info": true,
                    "include_mounted_folders": true,
                    "include_non_downloadable_files": true,
                    "path": "",
                    "recursive": false,
                  })
                })
        }
      
      
      
        useEffect(() => {
          if (!localStorage.getItem("token")) {
            fetch("https://api.dropbox.com/oauth2/token", {
              method: "POST",
              body: `code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/file`,
              headers: {
                Authorization: "Basic eWsxOTY4N2R4eW0wamZvOnBlODB1NWN2dzNtZ3J6bg==",
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("token", data.access_token);
              })
              .then(() =>{window.location.reload()})
              
          
                
          } else {
              getListFolder().then(res => {
                if (res.status === 401) {
                  localStorage.clear();
                } else {
                  return res.json();
                }
              }).then(data => {setFolder(data)})
                }

        }, []);
      
        return (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Имя</th>
                <th>Размер</th>
                <th>Дата изменения</th>
              </tr>
            </thead>
            {folder.entries.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
      
                    <td>
                      {item[".tag"] === "folder" ? (
                        <a href={"/" + item.name}>
                          <span
                            className="icon-folder-open"
                            style={{ marginRight: "5px" }}
                          />
                          {item.name}
                        </a>
                      ) : (
                        <>
                          <span
                            className="icon-file"
                            style={{ marginRight: "5px" }}
                          />
                          {item.name}
                        </>
                      )}
                    </td>
      
                    <td> {item.size}</td>
      
                    <td> {item["client_modified"]} </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        );
    
}

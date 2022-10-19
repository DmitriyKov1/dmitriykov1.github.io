import {React, useState, useEffect, useContext} from "react";


export default function File() {
    

        let search = window.location.search;
        let params = new URLSearchParams(search);
        let token = params.get("code");
        const [folder, setFolder] = useState({
          cursor: "",
          entries: [],
        });

        

        let getListFolder = (path = "") => {
          return fetch("https://api.dropboxapi.com/2/files/list_folder", {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    "include_deleted": false,
                    "include_has_explicit_shared_members": false,
                    "include_media_info": false,
                    "include_mounted_folders": true,
                    "include_non_downloadable_files": true,
                    "path": path,
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
                localStorage.setItem('isAuth', true )
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

        function handleClick (e, path) {
          e.preventDefault()
          getListFolder(path).then(res =>res.json()).then(data => {setFolder(data)})
        }
      
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
                        <a href={`/file${item.path_display}`}
                        onClick={(e) => handleClick(e, item.path_display)}>
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

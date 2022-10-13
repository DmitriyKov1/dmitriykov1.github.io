import React from "react";


const Button = () => {
    
    const url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=yk19687dxym0jfo&response_type=code&redirect_uri=http://localhost:3000/file&state=<CSRF token>'


    return (
        <a className="btn" href={url}>Войти</a>
    )
    };

export default Button

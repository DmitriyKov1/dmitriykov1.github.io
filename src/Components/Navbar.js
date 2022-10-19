import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserStore";
import { LOGIN_ROUTE } from "../consts";


function Navbar() {

    const {isAuth} = useContext(UserContext)
    const navigate = useNavigate()

    function handlLogout() {
        localStorage.clear()
        navigate(LOGIN_ROUTE)
    }
    return (

        <div className="navbar">
            <div className="navbar-inner">
                <div className="container">
                    <a className="brand" href="#">
                        Файловый менеджер!
                    </a>
                    {isAuth ? <button onClick={handlLogout}>Выход</button>: null}
                </div>
            </div>
        </div>
    )
}


export default Navbar
import {useState} from "react";
import styles from "./Dropdown.module.css";
import Modal from "../Modal/Modal";
import axios from "axios";

interface DropdownProps {
    showDropdown: boolean,
    setShowDropdawn: React.Dispatch<React.SetStateAction<boolean>>,
    delitePath: string,
}

const Dropdown: React.FC<DropdownProps> = ({showDropdown, setShowDropdawn,delitePath}) => {

    const [modalActive, setModalActive] = useState(false)


    const deleteItem = (path: string) => {
            return axios.post("https://api.dropboxapi.com/2/files/delete_v2",{                    
                "path": path,
                }, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                
                }, 
            }).then(()=> {window.location.reload()})
                    
        }
    
    
    return (
    <>
    <div className={styles.dropdown}>
        <button className="btn-mini" data-toggle="dropdown" onClick={() => setShowDropdawn(!showDropdown)}>
            Еще
            
        </button>
        {showDropdown && (  
            <ul className={styles.dropdownContent}>
                <li >
                    <button className={styles.dropdownItem} onClick={()=> deleteItem(delitePath)}>
                        Удалить
                    </button>
                </li>
                <li >
                <button className={styles.dropdownItem} onClick={()=> setModalActive(true)}>Загрузить</button>
                </li>
            </ul>
            )}
        
    </div>
    <Modal active={modalActive} setActive={setModalActive}>
        <h1>Не реализовано.</h1>
    </Modal>
    </>
    );
}
export default Dropdown;

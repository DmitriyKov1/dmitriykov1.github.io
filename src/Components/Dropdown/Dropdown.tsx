import { useContext, useState } from "react";
import styles from "./Dropdown.module.css";
import Modal from "../Modal/Modal";
import { APIContext } from "../../ApiRequest";
import { UserContext } from "../../UserStore";

interface DropdownProps {
  showDropdown: boolean;
  setShowDropdawn: React.Dispatch<React.SetStateAction<boolean>>;
  delitePathDropbox: string;
  delitePathGoogle: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  showDropdown,
  setShowDropdawn,
  delitePathDropbox,
  delitePathGoogle,
}) => {
  const [modalActive, setModalActive] = useState(false);
  const { isGoogle } = useContext(UserContext);
  const { deleteItemDropbox, deleteItemGoogle } = useContext(APIContext);
  const deleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    isGoogle
      ? deleteItemGoogle(delitePathGoogle)
      : deleteItemDropbox(delitePathDropbox);
  };

  return (
    <>
      <div className={styles.dropdown}>
        <button
          className="btn-mini"
          data-toggle="dropdown"
          onClick={() => setShowDropdawn(!showDropdown)}
        >
          Еще
        </button>
        {showDropdown && (
          <ul className={styles.dropdownContent}>
            <li>
              <button
                className={styles.dropdownItem}
                onClick={(e) => deleteClick(e)}
              >
                Удалить
              </button>
            </li>
            <li>
              <button
                className={styles.dropdownItem}
                onClick={() => setModalActive(true)}
              >
                Загрузить
              </button>
            </li>
          </ul>
        )}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <h1>Не реализовано.</h1>
      </Modal>
    </>
  );
};
export default Dropdown;

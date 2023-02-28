import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./Toolbar.module.css";

const Toolbar: React.FC = () => {
    const [modalActive, setModalActive] = useState(false);

    return (
        <>
            <div className={styles.toolbar}>
                <button
                    className={`btn ${styles.toolbarBtn}`}
                    onClick={() => setModalActive(true)}
                >
                    Загрузить
                </button>
                <button
                    className={`btn ${styles.toolbarBtn}`}
                    onClick={() => setModalActive(true)}
                >
                    Удалить
                </button>
                <button
                    className={`btn ${styles.toolbarBtn}`}
                    onClick={() => setModalActive(true)}
                >
                    Создать
                </button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <h1>Не реализовано.</h1>
            </Modal>
        </>
    );
};

export default Toolbar;

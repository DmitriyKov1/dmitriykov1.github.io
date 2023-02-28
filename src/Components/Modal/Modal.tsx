import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
    return (
        <div
            className={
                active
                    ? `${styles.modalToolbar} ${styles.active}`
                    : `${styles.modalToolbar}`
            }
            onClick={() => setActive(false)}
        >
            <div
                className={
                    active
                        ? `${styles.modalContent} ${styles.active}`
                        : `${styles.modalContent}`
                }
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;

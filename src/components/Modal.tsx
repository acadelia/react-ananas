import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/components-style/modal.module.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

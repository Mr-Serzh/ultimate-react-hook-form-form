import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsXCircleFill } from 'react-icons/bs';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={handleClose}>
          <BsXCircleFill className={styles.iconDelete} />
        </button>

        <h2 className={styles.modalTitle}>{title}</h2>

        {children}
      </div>
    </div>,
    modalRoot,
  );
}

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './ModalBox.module.css'

// eslint-disable-next-line react/prop-types
const ModalBox = ({ modalTitle, modalBody, btnName, onClickHandler,isDisable }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const okHandler = () => {
    handleClose();
    onClickHandler();
  }
  return (
    <>
      <button
        className={!isDisable ? style.btn : style.disableBtn}
        onClick={handleShow}
        disabled={isDisable}
      >
        {btnName}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={okHandler}>
            OK
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBox;

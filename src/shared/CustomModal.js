import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ heading, class1, children, ...props }) => {
  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header className={`fw-bolder fs-5 ${class1}`} closeButton>
        {heading}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;

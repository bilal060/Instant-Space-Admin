import React from 'react';
// import { Image } from "react-bootstrap";
// import filterFeature from "../../src/assets/images/icons/filterRadius.svg";

import Modal from 'react-bootstrap/Modal';

const CustomModal1 = ({ heading, class1, children, ...props }) => {
  return (
    <Modal
      {...props}
      aria-labelledby="example-modal-sizes-title-sm"
      backdrop="static"
      size="md"
      centered
      // className={``}
    >
      <Modal.Header className={`fw-bolder justify-content-center fs-5 ${class1}`} closeButton>
        {heading}
        {/* <h3 className="fw-bolder fs-5 mb-1 d-flex align-items-center gap-2">
          <Image src={filterFeature} alt="" fluid /> Filter by radius
        </h3> */}
      </Modal.Header>

      <Modal.Body className="show-grid">{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal1;

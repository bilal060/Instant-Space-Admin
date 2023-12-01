import React from 'react';
import Image from 'react-bootstrap/Image';
import '../../assets/css/space-card.css';
import { Button, Col, Dropdown, Modal, Row } from 'react-bootstrap';

import SpaceCard from '../../hoc/SpaceCard';
import gallery from '../../assets/images/icons/CardIcons/gallery.svg';
import stop from '../../assets/images/icons/CardIcons/stop.svg';
import axor from '../../assets/images/icons/CardIcons/axor.svg';
import profileCard from '../../assets/images/icons/CardIcons/card-profile.svg';
import cci from '../../assets/images/icons/CardIcons/cci.svg';
import whiteThreeDots from '../../assets/images/icons/CardIcons/whiteThreeDots.svg';
import threeDots from '../../assets/images/icons/CardIcons/threeDots.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehicle } from '../../store/storeIndex';

const TruckCardComponent = (props) => {
  const [show, setShow] = useState(false);
  const [deleteSpaceId, setDeleteSpaceId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteSpaceHandler = (id) => {
    setDeleteSpaceId(id);
    handleShow();
  };
  const confirmDeleteHandler = () => {
    dispatch(deleteVehicle(userId, deleteSpaceId, token, vehicleId, handleClose));
  };

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const vehicleId = useSelector((state) => state.vehicle.vehicles.vehicles[0]._id);
  console.log(vehicleId);
  return (
    <SpaceCard>
      <div className=" position-relative">
        <Image src={props.src} className="img-rounded main-card-img w-100" fluid height={500} />
        <div className="gallery position-absolute positioning ">
          <p className="d-flex align-items-center text-white rounded-lg mb-0 px-2 py-1 text-14">
            <Image alt="gallery" src={gallery} className=" pe-1" />
            {props.gallery}
          </p>
        </div>
        <div className="threeDots-positioning position-absolute ">
          <Image alt="threedots" src={whiteThreeDots} className=" pe-1 flip" />
        </div>
      </div>

      <div className="ps-3 pe-2">
        <div className="d-flex justify-content-between align-items-center pt-3">
          <div className="text-18 fw-bolder">{props.title}</div>
          <div className="threeDots-dropdown">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <Image alt="gallery" src={threeDots} className=" pe-2" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => deleteSpaceHandler(props.id)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              className="delete-modal">
              <Modal.Header closeButton>
                <Modal.Title>
                  <div className="fw-bold">Delete Space</div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="fs-4">Are you sure you want to delete the space?</div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDeleteHandler}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <Row>
          <Col xxl={6} lg={12} xs={6} className="pe-0">
            <div className="phone pt-3 grey text-14">
              <Image alt="gallery" src={stop} className=" pe-1" />
              <span className="text-black text-14">{props.model}</span>
            </div>
          </Col>
          <Col xxl={6} lg={12} xs={6} className="pe-0">
            <div className="capacity pt-3 grey text-14">
              <Image alt="gallery" src={axor} className=" pe-1" />
              <span className="text-black text-14">{props.type}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xxl={6} lg={12} xs={6} className="pe-0">
            <div className="type grey pt-3 text-14 ">
              <Image alt="gallery" src={profileCard} className=" pe-1" />
              <span className="text-black text-14">{props.regiterNo}</span>
            </div>
          </Col>
          <Col xxl={6} lg={12} xs={6} className="pe-0">
            <div className="rate grey pt-3 pb-3 text-14">
              <Image alt="gallery" src={cci} className=" pe-1" />
              <span className="text-black text-14">{props.drivingLicenseNo}</span>
            </div>
          </Col>
        </Row>
      </div>
    </SpaceCard>
  );
};

export { TruckCardComponent };

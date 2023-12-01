import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import '../../assets/css/space-card.css';
import { Button, Col, Dropdown, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import SpaceCard from '../../hoc/SpaceCard';
import gallery from '../../assets/images/icons/CardIcons/gallery.svg';
import phone from '../../assets/images/icons/CardIcons/phone.svg';
import flag from '../../assets/images/icons/CardIcons/flag.svg';
import address from '../../assets/images/icons/CardIcons/location.svg';
import space from '../../assets/images/icons/CardIcons/space.svg';
import dollar from '../../assets/images/icons/CardIcons/dollar.svg';
import threeDots from '../../assets/images/icons/CardIcons/threeDots.svg';
import { changeAvailability, deleteSpace } from '../../store/storeIndex';

const CardComponent = ({ onClick, ...props }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);

  const [deleteSpaceId, setDeleteSpaceId] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [show, setShow] = useState(false);
  const [isOn, setIsOn] = useState(props.available);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteSpaceHandler = (id) => {
    setDeleteSpaceId(id);
    handleShow();
  };
  const confirmDeleteHandler = () => {
    dispatch(deleteSpace(userId, deleteSpaceId, token, handleClose));
  };

  const handleClick = (value) => {
    setIsOn(value);
    const data = {
      spaceId: props.id,
      availability: value
    };
    dispatch(changeAvailability(userId, data));
  };
  return (
    <SpaceCard>
      <div className=" position-relative" style={{ cursor: 'pointer' }} onClick={onClick}>
        <Image src={props.src} className="img-rounded custom-rounded main-card-img w-100" fluid />
        <div className="gallery position-absolute positioning ms-1  mt-1">
          <p className="d-flex align-items-center text-white rounded-lg mb-0 px-2 py-1 text-14">
            <Image alt="gallery" src={gallery} className=" pe-2" />
            {props.gallery}
          </p>
        </div>
        {props.status && (
          <Button
            className={`custom-status ${
              props.status === 'rejected'
                ? 'bg-lightRed'
                : props.status === 'pending'
                  ? 'bg-lightYellow'
                  : 'bg-lightgreen'
            } ${
              props.status === 'rejected' ? 'bg-lightRed' : 'bg-lightgreen'
            }  unpaid rounded fw-bold text-capitalize gallery position-absolute`}
            variant={`${
              props.status === 'rejected'
                ? 'outline-danger'
                : props.status === 'pending'
                  ? 'outline-warning'
                  : 'outline-success'
            } `}
            style={{ width: 'max-content', right: '12px', left: 'unset', top: '12px' }}>
            <p className=" rounded-lg px-2 py-1 text-14 mb-0 text-capitalize">{props.status}</p>
          </Button>
        )}
      </div>
      <div className="ps-3 pe-2 card-container ">
        <div className="text-18 fw-bolder pt-3 custom-lineheight cut-text">{props.title}</div>

        <Row className="mt-sm-2 mx-0">
          <Col sm="6" className="px-0 mb-sm-0 mb-2">
            <div className="phone pt-2 grey text-14 text-nowrap">
              <Image alt="gallery" src={phone} className=" pe-2" />
              {props.phone}
            </div>
          </Col>
          <Col sm="6" className="px-0 ps-sm-3 custom-mt-capacityaction mb-sm-0 mb-2">
            <div className="capacity pt-2 grey text-14 text-nowrap">
              <Image alt="gallery" src={flag} className=" pe-2" />
              <span>Capacity: </span>
              <span className="text-grey text-14">{props.capacity}</span>
            </div>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col sm="12" className="px-0">
            <div className="address grey text-14 custom-lineheight mt-sm-2 text-nowrap">
              <Image alt="gallery" src={address} className="pe-2" />
              <span className="custom-lineheight">
                {props.address && props.address.length > 30
                  ? showMore
                    ? props.address
                    : `${props.address.substring(0, 30)}`
                  : props.address}
              </span>
              {props.address && props.address.length > 30 && (
                <button onClick={() => setShowMore(!showMore)} className="show-more-button ">
                  {showMore ? 'See less' : 'See more'}
                </button>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col sm="6" className="px-0  cut-text mb-sm-0 mb-2">
            <div className="type grey pt-2 text-14 text-nowrap">
              <Image alt="gallery" src={space} className=" pe-2" />
              Type: <span className="text-grey text-14">{props.type}</span>
            </div>
          </Col>
          <Col className="px-0 custom-mt-rate ">
            <div className="rate grey text-14 text-nowrap">
              <Image alt="gallery" src={dollar} className=" pe-2" />
              Rate: <span className="text-grey text-14">{props.rate}</span>
            </div>
          </Col>
        </Row>
      </div>
      <hr />
      <div className="footer d-flex flex-lg-column flex-xl-row gap-lg-3 gap-0 justify-content-between ps-3 pe-2 py-3">
        {userData.role === 'Storage Owner' && (
          <div className="text-black text-14 d-flex align-items-center">
            <div className="form-check form-switch">
              <input
                className={`form-check-input ${props.class2}`}
                type="checkbox"
                id="flexSwitchCheckChecked"
                onClick={(e) => handleClick(e.target.checked)}
                defaultChecked={isOn}
              />
            </div>
            {isOn ? 'Available' : 'Unavailable'}
          </div>
        )}
        <div className="d-flex justify-content-between">
          {props.icon1 && <Image alt="gallery" src={props.icon1} className=" pe-2" />}
          {props.icon2 && <Image alt="gallery" src={props.icon2} className=" pe-2" />}
          {props.icon3 && <Image alt="gallery" src={props.icon3} className=" pe-2" />}
          {props.icon4 && <Image alt="gallery" src={props.icon4} className=" pe-3" />}
          {userData.role === 'Storage Owner' && (
            <>
              <div className="threeDots-dropdown">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <Image alt="gallery" src={threeDots} className=" pe-2" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => deleteSpaceHandler(props.id)}>
                      Delete
                    </Dropdown.Item>
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
            </>
          )}
        </div>
      </div>
    </SpaceCard>
  );
};

export { CardComponent };

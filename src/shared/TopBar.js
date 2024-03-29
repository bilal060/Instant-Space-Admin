import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import '../assets/css/topbar.css';
import LogoImg from '../assets/images/logo.svg';
import LogoIcon from '../assets/images/logoIcon.svg';
import notificationImage from '../assets/images/icons/notifications.svg';
import SettingsIcon from '../assets/images/icons/Settings';
import LogoutIcon from '../assets/images/icons/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postNotification, userLogout } from '../store/storeIndex';
import { useSelector } from 'react-redux';
import TopBarPopup from './TopBarPopup';
import { getNotification } from '../store/notification/actions/actionCreators';
import ImageDisplay from './Image';

const TopBar = () => {
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket.socket);
  const notification = useSelector((state) => state.notification.notifications);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countOfUnreadMessages, setCountOfUnreadMessages] = useState(5);
  const User = useSelector((state) => state.user.user);

  const toggleDropdown = () => {
    if (!dropdownOpen) {
      setCountOfUnreadMessages(0);
    }
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    if (socket === null) return;
    socket.on('getNotification', (data) => {
      console.log(data);
      if (data.status === 'pending') {
        const notificationData = {
          bookingId: data.bookingId,
          sender: data.sender,
          details: data.details,
          receiver: data.receiver,
          type: data.type
        };
        dispatch(postNotification(notificationData));
      } else {
        const notificationData = {
          bookingId: data.bookingId,
          sender: data.sender,
          details: data.details,
          status: data.status,
          receiver: data.receiver,
          type: data.type
        };
        dispatch(postNotification(notificationData));
      }
    });

    return () => {
      socket.off('getNotification');
    };
  }, [socket, dispatch, notification]);

  useEffect(() => {
    setCountOfUnreadMessages(notification.filter((obj) => obj.isRead === false).length);
  }, [notification]);

  useEffect(() => {
    dispatch(getNotification(User._id));
  }, [dispatch]);

  return (
    <Row className="py-3 px-4 m-0 topbar">
      <Col className="logo">
        <Image fluid src={LogoImg} loading="lazy" />
      </Col>
      <Col xs="3" className="logoIcon">
        <Image fluid className="h-48px" src={LogoIcon} loading="lazy" />
      </Col>
      <Col className="d-flex align-items-center justify-content-end">
        <div className="bar-icons">
          {/* <Link to="/dashboard/notifications">
          </Link> */}
          <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle className="top-dropbtn-style" id="dropdown-basic-button">
              <div className="notifiy-dropbtn-style">
                <Image fluid src={notificationImage} loading="lazy" />
                {countOfUnreadMessages > 0 && <p>{countOfUnreadMessages}</p>}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="custom-notif-bar pt-5">
              <TopBarPopup />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="user-dropdown">
            <Dropdown.Toggle className="dropbtn-style" id="dropdown-menu-align-end">
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-md-block text-end d-none">
                  <p className="text-16 fw-bold mb-1 text-capitalize">
                    {(isLogin && user && user.fullName) ||
                      (isLogin && user && user.companyName) ||
                      'User Name'}
                  </p>
                  <p className="font-12 line-100 grey font-weight-500 m-0">
                    {(isLogin && user && user.role) || 'Role'}
                  </p>
                </div>
                <ImageDisplay
                  src={`${process.env.REACT_APP_SERVER_URL}${user.photo}`}
                  className="rounded-circle user-image"
                  loading="lazy"
                />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item className="py-0" onClick={() => navigate('/settings/edit')}>
                <div className="text-decoration-none text-dark d-flex align-items-center gap-2 border-bottom pt-1 pb-2">
                  <SettingsIcon /> Account Settings
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(userLogout(navigate))}>
                <Button className="bg-transparent border-0 text-danger p-0 d-flex align-items-center gap-2">
                  <LogoutIcon />
                  Logout
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
};

export default TopBar;

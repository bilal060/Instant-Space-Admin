import React, { useState } from 'react';
import { Image, Col, Dropdown } from 'react-bootstrap';
import Profile from '../../assets/images/icons/table.svg';
import threeDots from '../../assets/images/icons/CardIcons/threeDots.svg';
import { ReactComponent as TickIcon } from '../../assets/images/tickercard.svg';
import { ReactComponent as CrossIcon } from '../../assets/images/crosscard.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/chatIcon.svg';

const NotificationsTable = () => {
  const data = [
    {
      date: 'Today',
      notifications: [
        {
          picture: Profile,
          name: 'Tony Stark1',
          location: 'Belmont, North Carolina',
          spacetype: 'Truck Parking',
          Bookingtime: '10:30 AM  |  May 10, 2023',
          status: 'Paid'
        },
        {
          picture: Profile,
          name: 'Tony Stark1',
          location: 'Belmont, North Carolina',
          spacetype: 'Truck Parking',
          Bookingtime: '10:30 AM  |  May 10, 2023',
          status: 'Paid'
        }
      ]
    },
    {
      date: 'May 12 2023',
      notifications: [
        {
          picture: Profile,
          name: 'Tony Stark1',
          location: 'Belmont, North Carolina',
          spacetype: 'Truck Parking',
          Bookingtime: '10:30 AM  |  May 3, 2023',
          status: 'Paid'
        },
        {
          picture: Profile,
          name: 'Tony Stark1',
          location: 'Belmont, North Carolina',
          spacetype: 'Truck Parking',
          Bookingtime: '10:30 AM  |  May 3, 2023',
          status: 'Cancelled'
        }
      ]
    }
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div>
      {data.map((group, groupIndex) => (
        <div key={groupIndex} className="notificatons row">
          <div className="separator">
            <div className="line"></div>
            <p className="ms-3 me-3 mt-3">{group.date}</p>
            <div className="line"></div>
          </div>
          {group.notifications.map((notification, index) => (
            <Col
              md={6}
              key={index}
              onClick={() => {
                if (selectedRow === index) {
                  setSelectedRow(null);
                } else {
                  setSelectedRow(index);
                }
              }}
              className="my-2 py-1">
              <div
                className={`notification-bar p-3 ${selectedRow === index ? 'selected-row' : ''} ${
                  notification.status.toLowerCase() === 'paid' ? 'read' : 'unread'
                }`}>
                <div className="d-flex align-items-start">
                  <Image
                    src={notification.picture}
                    className="rounded-2"
                    style={{ width: '56px', height: '56px' }}
                  />
                  <div className="d-flex flex-column align-items-start justify-content-center ms-3 p-0 w-100">
                    <div className="d-flex align-items-start justify-content-between w-100">
                      <div>
                        <p className="m-0 custom-heading-font fw-bold text-capitalize">
                          {notification.name}
                        </p>
                        <p className="user-name text-14 grey m-0">{notification.Bookingtime}</p>
                      </div>
                      <div className="threeDots-dropdown">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic" className="border-0">
                            <Image alt="gallery" src={threeDots} className=" p-2" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item className="d-flex align-items-center gap-2">
                              <TickIcon />
                              Mark as read
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex align-items-center gap-2">
                              <CrossIcon /> Remove this notification
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex align-items-center gap-2">
                              <ChatIcon /> View all Bookings
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    {notification.type === 'chat' ? (
                      <div className="d-flex flex-column align-items-start justify-content-center pt-3 gap-1">
                        <p className="m-0 user-name text-14 font-700 grey">Message</p>
                        <span className="custom-lineheight"></span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-start justify-content-between gap-3 w-100 pt-3 flex-wrap">
                        <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                          <p className="m-0 user-name text-14 font-700 grey">Status</p>
                          <p className="m-0 font-14-20 text-capitalize">{notification.status}</p>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                          <p className="m-0 user-name text-14 font-700 grey">Category</p>
                          <p className="m-0 font-14-20">{notification.spacetype}</p>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                          <p className="m-0 user-name text-14 font-700 grey">Total Amount</p>
                          <p className="m-0 font-14-20">${notification.price}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotificationsTable;

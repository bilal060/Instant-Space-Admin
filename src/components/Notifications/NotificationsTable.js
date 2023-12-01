import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Image, Button } from 'react-bootstrap';
import Profile from '../../assets/images/icons/table.svg';
import CardComponent from '../CardComponent';
const NotificationsTable = () => {
  const data = [
    {
      picture: Profile,
      name: 'Tony Stark1',
      location: 'Belmont, North Carolina',
      spacetype: 'Truck Parking',
      Bookingtime: '10:30 AM  |  May 10, 2023',
      status: 'Paid',
      Date: 'Today'
    },
    {
      picture: Profile,
      name: 'Tony Stark1',
      location: 'Belmont, North Carolina',
      spacetype: 'Truck Parking',
      Bookingtime: '10:30 AM  |  May 10, 2023',
      status: 'paid',
      Date: 'Today'
    },

    {
      picture: Profile,
      name: 'Tony Stark1',
      location: 'Belmont, North Carolina',
      spacetype: 'Truck Parking',
      Bookingtime: '10:30 AM  |  May 3, 2023',
      status: 'paid',
      Date: 'Today'
    },
    {
      picture: Profile,
      name: 'Tony Stark1',
      location: 'Belmont, North Carolina',
      spacetype: 'Truck Parking',
      Bookingtime: '10:30 AM  |  May 3, 2023',
      status: 'cancelled',
      Date: 'May 12 2023'
    }
  ];

  const [selectedRow, setSelectedRow] = useState(null); // Step 1
  const [showCard, setShowCard] = useState(false); // Step 4
  const [selectedCardData, setSelectedCardData] = useState([]); // Step 5

  const handleShowCard = (notification) => {
    setSelectedCardData([notification.link1, notification.link2]); // Step 5
    setShowCard(true); // Step 4
  };

  const groupedData = {};

  data.forEach((notification) => {
    const date = notification.Date;
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(notification);
  });

  return (
    <div>
      <div>
        {Object.keys(groupedData).map((date) => (
          <div key={date} className="notificatons">
            <div className="separator">
              <div className="line"></div>
              <p className="ms-3 me-3 mt-3">{date}</p>
              <div className="line"></div>
            </div>
            {groupedData[date].map((notification, index) => (
              <Table
                responsive
                hover
                className={`mt-2 notification-bar ${selectedRow === index ? 'selected-row' : ''}`}
                striped
                bordered={false}
                key={index}
                onClick={() => {
                  if (selectedRow === index) {
                    setSelectedRow(null);
                  } else {
                    setSelectedRow(index);
                  }
                }}>
                <tr className="pt-3">
                  <td>
                    <div className="d-flex align-items-center">
                      <Image src={notification.picture} className="ps-2 p-0" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column align-items-start justify-content-center ms-3 p-0">
                      <p className="m-0 p-0 user-name text-14 font-700 grey">Customer Name</p>
                      <p className="m-0 pt-2 font-14-20">{notification.name}</p>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column align-items-start justify-content-center ms-3 p-0">
                      <p className="m-0 p-0 user-name text-14 font-700 grey">Branch Location</p>
                      <p className="m-0 pt-2 font-14-20">{notification.location}</p>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column align-items-start justify-content-center ms-3 p-0">
                      <p className="m-0 p-0 user-name text-14 font-700 grey">Space Type</p>
                      <p className="m-0 pt-2 font-14-20">{notification.spacetype}</p>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column align-items-start justify-content-center ms-3 p-0">
                      <p className="m-0 p-0 user-name text-14 font-700 grey">Booking Time & Date</p>
                      <p className="m-0 pt-2 font-14-20">{notification.Bookingtime}</p>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column align-items-start justify-content-center ms-3 p-0">
                      <p
                        className={`m-0 user-name ${
                          notification.status === 'cancelled' ? 'status-notpaid' : 'status-paid'
                        }`}>
                        {notification.status}
                      </p>
                    </div>
                  </td>
                  <td>
                    {selectedRow === index && (
                      <Button
                        variant="link"
                        onClick={() => handleShowCard(notification)}
                        className="d-flex justify-content-end">
                        {/* 3-dot button */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="4"
                          height="16"
                          viewBox="0 0 4 16"
                          fill="none">
                          <circle cx="2" cy="2" r="2" fill="#171D25" />
                          <circle cx="2" cy="8" r="2" fill="#171D25" />
                          <circle cx="2" cy="14" r="2" fill="#171D25" />
                        </svg>
                      </Button>
                    )}
                  </td>
                </tr>
              </Table>
            ))}
          </div>
        ))}
      </div>
      {showCard && <CardComponent links={selectedCardData} onClose={() => setShowCard(false)} />}
    </div>
  );
};

export default NotificationsTable;

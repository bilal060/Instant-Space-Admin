import React, { useEffect, useState } from 'react';
import { Image, Col, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  deleteNotification,
  markReadNotification
} from '../../store/notification/actions/actionCreators';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import threeDots from '../../assets/images/icons/CardIcons/threeDots.svg';
import { ReactComponent as TickIcon } from '../../assets/images/tickercard.svg';
import { ReactComponent as ChatIcon } from '../../assets/images/chatIcon.svg';
import { ReactComponent as CrossIcon } from '../../assets/images/crosscard.svg';
import ImageDisplay from '../messages/Image';
import { useNavigate } from 'react-router-dom';

const NotificationsTable = ({ mergedData, setMergedData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groupedData, setGroupedData] = useState({});

  const [selectedRow, setSelectedRow] = useState(null);
  const [showMore, setShowMore] = useState(false);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');

  useEffect(() => {
    const currentDate = new Date();
    const todayMessages = [];
    const olderMessages = {};
    mergedData?.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const messageDateString = `${messageDate.getFullYear()}-${(messageDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${messageDate.getDate().toString().padStart(2, '0')}`;
      if (
        messageDate.getDate() === currentDate.getDate() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getFullYear() === currentDate.getFullYear()
      ) {
        todayMessages.push(message);
      } else {
        if (!olderMessages[messageDateString]) {
          olderMessages[messageDateString] = [];
        }
        olderMessages[messageDateString].push(message);
      }
    });
    if (todayMessages.length > 0) {
      const updatedGroupedData = { Today: todayMessages, ...olderMessages };
      setGroupedData(updatedGroupedData);
    } else {
      setGroupedData(olderMessages);
    }
  }, [mergedData]);

  const MarkNotificationAsRead = (id) => {
    const data = {
      notificationId: id
    };
    dispatch(markReadNotification(data));
  };

  const DeleteNotification = (id) => {
    const updatedMergedData = mergedData.filter((data) => data._id !== id);
    setMergedData(updatedMergedData);
    dispatch(deleteNotification(id));
  };

  return (
    <div>
      {Object.keys(groupedData).map((date) => (
        <div key={date} className="notificatons row">
          <div className="separator">
            <div className="line"></div>
            <p className="ms-3 me-3 mt-3">{date}</p>
            <div className="line"></div>
          </div>
          {groupedData[date].map((notification, index) => (
            <Col
              md={6}
              key={index}
              onClick={() => {
                if (selectedRow === index) {
                  setSelectedRow(null);
                } else {
                  setSelectedRow(notification._id);
                }
              }}
              className="my-2 py-1">
              <div
                className={`notification-bar p-3 ${
                  selectedRow === notification._id ? 'selected-row' : ''
                } ${notification.isRead ? 'read' : 'unread'}`}>
                <div className="d-flex align-items-start">
                  <ImageDisplay
                    src={`${process.env.REACT_APP_SERVER_URL}${notification.sender.photo}`}
                    className="rounded-2"
                    style={{ width: '56px', height: '56px' }}
                  />
                  <div className="d-flex flex-column align-items-start justify-content-center ms-3 p-0 w-100">
                    <div className="d-flex align-items-start justify-content-between w-100">
                      <div>
                        <p className="m-0 custom-heading-font fw-bold text-capitalize">
                          {notification.sender.fullName}
                        </p>
                        <p className="user-name text-14 grey m-0">
                          {timeAgo.format(new Date(notification.createdAt))}
                        </p>
                      </div>
                      <div className="threeDots-dropdown d-none">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic" className="border-0">
                            <Image alt="gallery" src={threeDots} className=" p-2" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {!notification.isRead && (
                              <Dropdown.Item
                                className="d-flex align-items-center gap-2"
                                onClick={() => MarkNotificationAsRead(notification._id)}>
                                <TickIcon />
                                Mark as read
                              </Dropdown.Item>
                            )}
                            <Dropdown.Item
                              className="d-flex align-items-center gap-2"
                              onClick={() => DeleteNotification(notification._id)}>
                              <CrossIcon /> Remove this notification
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="d-flex align-items-center gap-2"
                              onClick={() =>
                                navigate(`/dashboard/messages/${notification.conversationId._id}`)
                              }>
                              <ChatIcon />{' '}
                              {notification.type === 'chat'
                                ? 'Open conversation'
                                : 'View all bookings'}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      {/* )} */}
                    </div>
                    {notification.type === 'chat' ? (
                      <div className="d-flex flex-column align-items-start justify-content-center pt-3 gap-1">
                        {/* <p className="m-0 user-name text-14 font-700 grey user-name text-14 font-700 grey">
                          Message
                        </p> */}
                        <span className="custom-lineheight">
                          {notification.message?.includes('uploads') ||
                          notification.message?.includes('blob') ||
                          notification.message?.includes('data:image') ? (
                            <span className="pt-3">Sent you a new image</span>
                          ) : notification.message && notification.message.length > 30 ? (
                            showMore ? (
                              <>
                                <p className="m-0 user-name text-14 font-700 grey user-name text-14 font-700 grey">
                                  Message
                                </p>
                                {notification.message}
                                {notification.message && notification.message.length > 30 && (
                                  <span
                                    onClick={() => setShowMore(!showMore)}
                                    className="ps-1 text-13 text-danger">
                                    {showMore ? 'See less' : 'See more'}
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
                                <p className="m-0 user-name text-14 font-700 grey user-name text-14 font-700 grey">
                                  Message
                                </p>
                                {`${notification.message.substring(0, 30)}`}
                                {notification.message && notification.message.length > 30 && (
                                  <span
                                    onClick={() => setShowMore(!showMore)}
                                    className="ps-1 text-13 text-danger">
                                    {showMore ? 'See less' : 'See more'}
                                  </span>
                                )}
                              </>
                            )
                          ) : (
                            <>
                              <p className="m-0 user-name text-14 font-700 grey user-name text-14 font-700 grey">
                                Message
                              </p>
                              {notification.message}
                            </>
                          )}
                        </span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-start justify-content-between gap-3 w-100 pt-3 flex-wrap">
                        <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                          <p className="m-0 user-name text-14 font-700 grey user-name text-14 font-700 grey">
                            Status
                          </p>
                          <p className="m-0 font-14-20 text-capitalize">
                            {notification?.bookingId?.status}
                          </p>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                          <p className="m-0 user-name text-14 font-700 grey user-name text-14 font-700 grey">
                            Category
                          </p>
                          <p className="m-0  font-14-20">{notification?.bookingId?.category}</p>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-center gap-1">
                          <p className="m-0 user-name text-14 font-700 grey user-name text-14 font-700 grey">
                            Total Amount
                          </p>
                          <p className="m-0  font-14-20">${notification?.bookingId?.price}</p>
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

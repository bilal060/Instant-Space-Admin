import React, { useEffect } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Cards } from '../../home/Cards';
import { useNavigate } from 'react-router-dom';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { getAllBookings } from '../../../store/booking/actions/actionCreators';

const CustomerBookingsCard = (props) => {
  const { dayValue, page, setPage } = props;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);

  const navigate = useNavigate();

  const userRole = useSelector((state) => state.user.user.role);

  const bookings = useSelector((state) => {
    return userRole === 'Customer' ? state.booking.bookings : state.booking.bookings;
  });

  useEffect(() => {
    dispatch(getAllBookings(userId, token, userRole, page, dayValue));
  }, []);

  const pageHandler = (page) => {
    setPage(page);
    dispatch(getAllBookings(userId, token, userRole, page, dayValue));
  };
  // console.log(bookings);
  return (
    <Row>
      {Object.keys(bookings)?.length > 0 &&
        props.short &&
        bookings.bookings?.length > 0 &&
        bookings.bookings.slice(0, 2).map((booking, index) => {
          return (
            <Col key={index} xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
              <Cards
                onClick={() => {
                  if (userRole === 'Customer') {
                    navigate(`/dashboard/customer/single-space/${booking.serviceId._id}`);
                  } else {
                    navigate(`/dashboard/single-space/${booking.serviceId._id}`);
                  }
                }}
                class1={props.classes}
                space={booking.serviceId}
              />
            </Col>
          );
        })}
      {Object.keys(bookings)?.length > 0 &&
        !props.short &&
        bookings?.bookings?.length > 0 &&
        bookings.bookings.map((booking, index) => {
          return (
            <Col key={index} xs={12} sm={6} md={6} lg={4} xl={4} xxl={4}>
              <Cards
                onClick={() => {
                  if (userRole === 'Customer') {
                    navigate(`/dashboard/customer/single-space/${booking.serviceId._id}`);
                  } else {
                    navigate(`/dashboard/single-space/${booking.serviceId._id}`);
                  }
                }}
                class1={props.classes}
                space={booking.serviceId}
                status={booking.status}
              />
            </Col>
          );
        })}
      {!props.short && bookings?.bookings?.length === 0 && (
        <Container>
          <Alert key="info" variant="info" className="me-2">
            No Spaces to Show Here !
          </Alert>
        </Container>
      )}

      {!props.short && bookings.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={bookings.totalRecords}
          limit={bookings.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={1}
        />
      ) : (
        ''
      )}
    </Row>
  );
};

export default CustomerBookingsCard;

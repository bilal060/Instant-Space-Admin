import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import withMainLayout from '../layout/MainLayout';
import BookingMain from '../components/bookings/BookingMain';
import { getUserBookings, getOwnerBookings, getManagerBookings } from '../store/storeIndex';

const Bookings = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user._id);
  const userRole = useSelector((state) => state.user.user.role);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (userRole === 'Manager') {
      dispatch(getManagerBookings(userId, token));
    } else if (userRole === 'Storage Owner') {
      dispatch(getOwnerBookings(userId, token));
    } else {
      dispatch(getUserBookings(userId, token));
    }
  }, [userId, token, userRole]);

  return (
    <Container fluid>
      <Row>
        <BookingMain />
      </Row>
    </Container>
  );
};

export default withMainLayout(Bookings);

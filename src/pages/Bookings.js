import React from 'react';
import { Container, Row } from 'react-bootstrap';

import withMainLayout from '../layout/MainLayout';
import BookingMain from '../components/bookings/BookingMain';

const Bookings = () => {
  return (
    <Container fluid>
      <Row>
        <BookingMain />
      </Row>
    </Container>
  );
};

export default withMainLayout(Bookings);

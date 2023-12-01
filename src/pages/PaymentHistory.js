import React from 'react';
import { Container } from 'react-bootstrap';
import PaymentMain from '../components/payment/PaymentHistory';
import withMainLayout from '../layout/MainLayout';

const PaymentHistory = () => {
  return (
    <Container fluid>
      <PaymentMain />
    </Container>
  );
};

export default withMainLayout(PaymentHistory);

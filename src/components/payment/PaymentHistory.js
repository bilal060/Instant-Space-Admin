import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../assets/css/dashboard-misc.css';
import PaymentTable from './PaymentTable';

const PaymentMain = () => {
  return (
    <>
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0  gap-xl-0 gap-2">
        <Col sm="5" xxl="5" xl="3">
          <span className="heading">All Transactions</span>
        </Col>
      </Row>

      <div className="pt-4">
        <PaymentTable />
      </div>
    </>
  );
};

export default PaymentMain;

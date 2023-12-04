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
        {/* <Col
          xs="12"
          xxl="7"
          xl="9"
          className="d-flex flex-md-row flex-column-reverse justify-content-between gap-2 pe-0">
          <div className="d-flex align-items-center justify-content-between flex-sm-row gap-2 flex-column w-100">
            <div className="d-flex align-items-center w-100 pe-md-3">
              <Drops title="Sort by:" options={options} />
            </div>
            <div className="d-flex align-items-center w-100 pe-md-3">
              <Drops title="Select by:" options={options} />
            </div>
          </div>
        </Col> */}
      </Row>

      <div className="pt-4">
        <PaymentTable />
      </div>
    </>
  );
};

export default PaymentMain;

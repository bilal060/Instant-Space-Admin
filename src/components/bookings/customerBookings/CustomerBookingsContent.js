import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomerBookingsCard from './CustomerBookingsCard.js';

const CustomerBookingsContent = ({ dayValue, page, setPage, filterState }) => {
  return (
    <>
      <Row>
        <Col className="mb-xl-0 mb-3">
          <CustomerBookingsCard
            dayValue={dayValue}
            page={page}
            setPage={setPage}
            filterState={filterState}
          />
        </Col>
      </Row>
    </>
  );
};

export default CustomerBookingsContent;

import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import '../../assets/css/dashboard-misc.css';
import PlanTable from './PlanTable';

const PlanMain = () => {
  return (
    <>
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0  gap-xl-0 gap-2">
        <Col sm="5" xxl="5" xl="3">
          <span className="heading">All Plans</span>
        </Col>
      </Row>

      <div className="pt-4">
        <div className="d-flex justify-content-end min-w-max-content ">
          <Button className="space-btn-font space-btn-size custom-button-font gradient-btn-orange h-40px py-4">
            + Add New Plan
          </Button>
        </div>

        <PlanTable />
      </div>
    </>
  );
};

export default PlanMain;

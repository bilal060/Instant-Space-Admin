import React, { useState } from 'react';
import '../../assets/css/dashboard-misc.css';
import UsersTable from '../home/UsersTable';
import { Col, Row } from 'react-bootstrap';

const ManagerMain = () => {
  const [page, setPage] = useState(1);
  const [filterBy] = useState('Manager');
  return (
    <>
      <Row className="mt-3 d-flex justify-content-between w-100 p-0  gap-xl-0 gap-2 mx-0">
        <Col sm="5" xxl="4" xl="3" className="p-0 d-flex align-items-center">
          <span className="heading">All Managers</span>
        </Col>
        {/* <Col
          xs="12"
          xxl="8"
          xl="9"
          className="d-flex flex-md-row flex-column-reverse justify-content-between gap-4 p-0">
          <div className="d-flex align-items-center justify-content-between flex-sm-row gap-2 flex-column w-100">
            <MyDropDown
              options={userSpaces.spaces}
              selectedValue={filterState}
              onChange={filterManagerHandler}
              labelName="Select Branch"
            />
            <MyDropDown
              options={userSpaces.spaces}
              selectedValue={filterState}
              onChange={filterManagerHandler}
              labelName="Select Shift"
            />
          </div>
        </Col> */}
      </Row>
      <UsersTable short={false} filterBy={filterBy} page={page} setPage={setPage} />
    </>
  );
};

export default ManagerMain;

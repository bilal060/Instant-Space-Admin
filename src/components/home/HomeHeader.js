import React from 'react';
import '../../assets/css/responsive.css';
import { Button, Col, Row } from 'react-bootstrap';
import MyDropDown from '../../pages/MyDropDown';
import { useNavigate } from 'react-router-dom';

export default function HomeHeader(props) {
  const { setFilterBy, filterBy, heading } = props;
  const navigate = useNavigate();
  const filterUsersHandler = (filterBy) => {
    setFilterBy(filterBy);
  };

  const filterableCategories = [
    {
      value: 'Manager',
      name: 'Manager'
    },
    {
      value: 'Customer',
      name: 'Customer'
    },
    {
      value: 'Storage Owner',
      name: 'Storage Owner'
    }
  ];
  return (
    <div className="main my-3">
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-md-0 gap-3 mx-0">
        <Col className="d-flex align-items-center ps-0">
          <span className="heading">{heading}</span>
        </Col>

        <Col
          xs="12"
          xl="8"
          lg="8"
          md="8"
          className="d-flex flex-sm-row flex-column justify-content-md-end px-0 gap-3 flex-md-nowrap flex-wrap">
          <MyDropDown
            options={filterableCategories}
            selectedValue={filterBy}
            onChange={filterUsersHandler}
            labelName="Select"
          />

          <Button
            onClick={() => {
              navigate('/dashboard/bookings');
            }}
            variant="primary"
            className="booking-btn height-40px">
            View All
          </Button>
        </Col>
      </Row>

      {/* v */}
    </div>
  );
}

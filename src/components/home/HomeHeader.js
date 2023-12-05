import React, { useEffect } from 'react';
import '../../assets/css/responsive.css';
import { Button, Col, Row } from 'react-bootstrap';
import MyDropDown from '../../pages/MyDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../store/user/actions/actionCreators';
export default function HomeHeader(props) {
  const { page, setFilterBy, filterBy, heading, short } = props;
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filterUsersHandler = (filterBy) => {
    setFilterBy(filterBy);
  };
  useEffect(() => {
    dispatch(getAllUsers(token, page, filterBy));
  }, [filterBy, dispatch, page, token]);

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
    <div className="main">
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
            all={false}
          />

          {short && (
            <Button
              onClick={() => {
                navigate('/dashboard/users');
              }}
              variant="primary"
              className="booking-btn height-40px">
              View All
            </Button>
          )}
        </Col>
      </Row>

      {/* v */}
    </div>
  );
}

import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// import filterBlue from '../../assets/images/icons/filterBlue.svg';
import '../../assets/css/responsive.css';
import MyDropDown from '../../pages/MyDropDown';
import DatePicker from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../../store/booking/actions/actionCreators';

const filterableCategories = [
  {
    value: 'upcoming',
    name: 'upcoming'
  },
  {
    value: 'pending',
    name: 'pending'
  }
];
export default function BookingHeader({
  dayValue,
  setDayValue,
  page,
  setFilterState,
  filterState,
  heading
}) {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const userRole = useSelector((state) => state.user.user.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filterSpaceHandler = (filterBy) => {
    setFilterState(filterBy);
  };
  useEffect(() => {
    dispatch(getAllBookings(token, userRole, page, filterState, dayValue));
  }, [dayValue, filterState, dispatch, page, token, userId, userRole]);

  return (
    <div className="main my-3">
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-md-0 gap-3 mx-0">
        <Col className="d-flex align-items-center ps-0">
          <span className="heading">{heading}</span>
        </Col>

        <Col
          xs="12"
          xl="8"
          lg="12"
          md="8"
          className="d-flex flex-sm-row flex-column justify-content-md-end px-0 gap-3 flex-md-nowrap flex-wrap">
          <MyDropDown
            options={filterableCategories}
            selectedValue={filterState}
            onChange={filterSpaceHandler}
            labelName="Select"
            all={true}
          />

          <DatePicker
            value={dayValue}
            onChange={setDayValue}
            inputClass="calendar-input w-100"
            placeholder="Select Day"
            minDate={new Date()}
            format="YYYY-MM-DD"
            range
            dateSeparator=" to "
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
    </div>
  );
}

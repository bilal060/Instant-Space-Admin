import React, { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import MyDropDown from '../../../pages/MyDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { getAllBookings } from '../../../store/booking/actions/actionCreators';

const CustomerBookingsHeading = ({ dayValue, setDayValue, page, view, setView }) => {
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
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const userRole = useSelector((state) => state.user.user.role);

  const dispatch = useDispatch();
  const filterSpaceHandler = (filterBy) => {
    setFilterState(filterBy);
  };
  const [filterState, setFilterState] = useState('all');
  useEffect(() => {
    dispatch(getAllBookings(userId, token, userRole, page, filterState, dayValue));
  }, [dayValue, filterState, dispatch, page, token, userId, userRole]);

  return (
    <>
      <Row className="mt-5 justify-content-end mx-0">
        <Col md="7" xl="8" className="pe-0 ps-0 d-md-none mb-3">
          <div className={`heading text-24 w-100`}>Booking History</div>
        </Col>
        <Col md="5" xl="4" className="pe-0 cutomer-home ">
          <div className="d-flex justify-content-end button align-items-center w-auto gap-3 space-type flex-wrap flex-md-nowrap">
            <div>
              <Form.Check
                checked={view === 'Grid'}
                onChange={() => {
                  setView('Grid');
                }}
                inline
                label={<>Grid View</>}
                name="group2"
                type="radio"
                id={`inline-radio-11`}
                className="p-0 m-0"
              />
            </div>
            <div>
              <Form.Check
                checked={view === 'Table'}
                onChange={() => {
                  setView('Table');
                }}
                inline
                label={<>Table View</>}
                name="group2"
                type="radio"
                id={`inline-radio-22`}
                className="p-0 m-0"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="content-head d-flex justify-content-between align-items-md-center align-items-end flex-md-row flex-column mt-3 mb-3 w-100 gap-lg-3 gap-2 ">
        <div className={`heading text-24  d-md-flex d-none`}>Booking History</div>
        <div className="d-flex align-items-center justify-content-end gap-3 flex-sm-row flex-column">
          <MyDropDown
            options={filterableCategories}
            selectedValue={filterState}
            onChange={filterSpaceHandler}
            labelName="Select"
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
        </div>
      </div>
    </>
  );
};

export default CustomerBookingsHeading;

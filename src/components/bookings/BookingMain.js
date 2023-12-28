import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardCard from '../home/DashboardCard';
import Booking from '../../assets/images/icons/totalbooking.svg';
import Cancel from '../../assets/images/icons/cancelpayment.svg';
import Payment from '../../assets/images/icons/paidbooking.svg';
import Total from '../../assets/images/icons/total.svg';
import '../../assets/css/dashboard-misc.css';
import { useDispatch, useSelector } from 'react-redux';
import MyDropDown from '../../pages/MyDropDown';
import DatePicker from 'react-multi-date-picker';
import { getAllBookings } from '../../store/booking/actions/actionCreators';
import BookingTable from '../home/BookingTable';

const BookingMain = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const userRole = useSelector((state) => state.user.user.role);
  const [dayValue, setDayValue] = useState();
  const [filterState, setFilterState] = useState('all');
  const [page, setPage] = useState(1);
  const bookings = useSelector((state) => state.booking.bookings);
  const pendingBookings = bookings?.bookings?.filter((booking) => booking.status === 'pending');
  const cancelledBookings = bookings?.bookings?.filter((booking) => booking.status === 'rejected');
  const totalEarnings =
    bookings?.bookings?.reduce((total, booking) => {
      return total + (booking.status === 'approved' ? booking.price : 0);
    }, 0) || 0;

  const data = [
    {
      icon: Booking,
      description: bookings?.totalRecords || 0,
      title: 'Total Bookings',
      cardColor: '#fff'
    },
    {
      icon: Payment,
      description: pendingBookings?.length || 0,
      title: 'Pending Bookings',
      cardColor: '#fff'
    },
    {
      icon: Cancel,
      description: cancelledBookings?.length || 0,
      title: 'Cancelled Bookings',
      cardColor: '#fff'
    },
    {
      icon: Total,
      description: `$${totalEarnings}`,
      title: 'Total Earning',
      cardColor: '#fff'
    }
  ];

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

  const filterSpaceHandler = (filterBy) => {
    setFilterState(filterBy);
  };
  useEffect(() => {
    dispatch(getAllBookings(token, userRole, page, filterState, dayValue));
  }, [dayValue, filterState, dispatch, token, userId, userRole]);

  return (
    <>
      {data.map((item, index) => {
        return (
          <Col key={index} xs="12" md="6" xl="3">
            <DashboardCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              cardColor={item.cardColor}
            />
          </Col>
        );
      })}

      <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-md-0 gap-2">
        <Col xs="12" xl="4" md="12" className="d-flex align-items-center">
          <span className="heading">Booking Management</span>
        </Col>

        <Col
          xs="12"
          xl="8"
          md="12"
          className="d-flex flex-sm-row flex-column justify-content-md-end justify-content-between pe-0 gap-3">
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
        </Col>
      </Row>
      <div className="pt-3">
        <BookingTable
          short={false}
          dayValue={dayValue}
          page={page}
          setPage={setPage}
          filterState={filterState}
        />
      </div>
    </>
  );
};

export default BookingMain;

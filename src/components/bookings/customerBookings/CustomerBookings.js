import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Booking from '../../../assets/images/icons/totalbooking.svg';
import Cancel from '../../../assets/images/icons/cancelpayment.svg';
import Payment from '../../../assets/images/icons/paidbooking.svg';
// import Total from '../../../assets/images/icons/total.svg';
import DashboardCard from '../../home/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../../../store/booking/actions/actionCreators';

const CustomerBookings = (props) => {
  const { dayValue, page } = props;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);

  const userRole = useSelector((state) => state.user.user.role);

  const bookings = useSelector((state) => state.booking.bookings);

  const pendingBookings = bookings.bookings?.filter((booking) => booking.status === 'pending');
  const cancelledBookings = bookings.bookings?.filter((booking) => booking.status === 'rejected');

  useEffect(() => {
    dispatch(getAllBookings(userId, token, userRole, page, dayValue));
  }, []);

  const data = [
    {
      icon: Booking,
      description: bookings.totalRecords,
      title: 'Total Bookings',
      cardColor: '#fff'
    },
    {
      icon: Payment,
      description: pendingBookings.length,
      title: 'Pending Bookings',
      cardColor: '#fff'
    },
    {
      icon: Cancel,
      description: cancelledBookings.length,
      title: 'Cancelled Bookings',
      cardColor: '#fff'
    }
  ];

  return (
    <Row>
      {data.map((item, index) => {
        return (
          <Col key={index} xs="12" md="6" xl="4">
            <DashboardCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              cardColor={item.cardColor}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default CustomerBookings;

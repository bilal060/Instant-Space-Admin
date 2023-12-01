import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardCard from './DashboardCard.js';
import Booking from '../../assets/images/icons/booking.svg';
import Cancel from '../../assets/images/icons/cancelpayment.svg';
import Payment from '../../assets/images/icons/payment.svg';
import Total from '../../assets/images/icons/total.svg';
import '../../assets/css/dashboard-misc.css';
import Drops from '../../shared/Drops.js';
import PageTable from '../../shared/Table.js';

const Dashboard = () => {
  const data = [
    { icon: Booking, description: '205', title: 'Total Bookings', cardColor: '#fff' },
    { icon: Payment, description: '185', title: 'Paid Bookings', cardColor: '#fff' },
    { icon: Cancel, description: '185', title: 'Cancelled Bookings', cardColor: '#fff' },
    { icon: Total, description: '$15,835', title: 'Total Earning', cardColor: '#fff' }
  ];
  const options = ['A', 'B', 'C', 'D'];
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

      <Row className="mt-3">
        <Col xs="12" lg="6">
          <span className="heading">Booking History</span>
        </Col>

        <Col xs="12" lg="6" className="d-flex">
          <div className="d-flex align-items-center justify-content-start w-100 pe-3">
            <Drops title="Sort by:" options={options} />
          </div>
          <div className="d-flex align-items-center justify-content-end w-100">
            <Drops title="Select by:" options={options} />
          </div>
        </Col>
      </Row>
      <div className="pt-2">
        <PageTable />
      </div>
    </>
  );
};

export default Dashboard;

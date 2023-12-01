import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardCard from '../home/DashboardCard';
import Booking from '../../assets/images/icons/totalcustomer.svg';
import Cancel from '../../assets/images/icons/cancelpayment.svg';
import Payment from '../../assets/images/icons/paidbooking.svg';
import Total from '../../assets/images/icons/total.svg';
import '../../assets/css/dashboard-misc.css';
import Drops from '../../shared/Drops.js';
import PaymentTable from './PaymentTable';

const PaymentMain = () => {
  const data = [
    {
      icon: Booking,
      description: '205',
      title: 'Total Bookings',
      cardColor: '#fff'
    },
    {
      icon: Payment,
      description: '185',
      title: 'Paid Bookings',
      cardColor: '#fff'
    },
    {
      icon: Cancel,
      description: '185',
      title: 'Cancelled Bookings',
      cardColor: '#fff'
    },
    {
      icon: Total,
      description: '$15,835',
      title: 'Total Earning',
      cardColor: '#fff'
    }
  ];
  const options = ['A', 'B', 'C', 'D'];

  return (
    <>
      <Row>
        {data.map((item, index) => (
          <Col key={index} xs="12" md="6" xl="3">
            <DashboardCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              cardColor={item.cardColor}
            />
          </Col>
        ))}
      </Row>

      <Row className="mt-3 d-flex justify-content-between w-100 pe-0  gap-xl-0 gap-2">
        <Col sm="5" xxl="5" xl="3">
          <span className="heading">Payment History</span>
        </Col>
        {/* <Col sm="5" className="d-md-none d-sm-block d-none p-0">
          <div className="d-flex align-items-center justify-content-end min-w-max-content">
            <Button className="gradient-btn-orange h-40px">
              + Add Payment Method
            </Button>
          </div>
        </Col> */}
        <Col
          xs="12"
          xxl="7"
          xl="9"
          className="d-flex flex-md-row flex-column-reverse justify-content-between gap-2 pe-0">
          <div className="d-flex align-items-center justify-content-between flex-sm-row gap-2 flex-column w-100">
            <div className="d-flex align-items-center w-100 pe-md-3">
              <Drops title="Sort by:" options={options} />
            </div>
            <div className="d-flex align-items-center w-100 pe-md-3">
              <Drops title="Select by:" options={options} />
            </div>
          </div>
          {/* <div className="d-md-flex d-sm-none d-flex align-items-center min-w-max-content">
            <Button
              className="gradient-btn-orange h-40px"
              onClick={() => setLgShow(true)}
            >
              + Add Payment Method
            </Button>
          </div> */}
        </Col>
      </Row>

      <div className="pt-2">
        <PaymentTable />
      </div>
    </>
  );
};

export default PaymentMain;

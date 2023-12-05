import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import withMainLayout from '../layout/MainLayout';
import HomeHeader from '../components/home/HomeHeader';
import BookingHeader from '../components/home/BookingHeader';
import BookingTable from '../components/home/BookingTable';
import EventCalender from '../components/home/Calender';
import PurchaseSale from '../components/home/PurchaseSale';
import UsersTable from '../components/home/UsersTable';
const Home = () => {
  const [dayValue, setDayValue] = useState();
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState('all');
  const [filterBy, setFilterBy] = useState('Manager');

  return (
    <Container fluid>
      <HomeHeader page={page} heading="Users" setFilterBy={setFilterBy} filterBy={filterBy} short />
      <UsersTable short filterBy={filterBy} page={page} setPage={setPage} />
      <div className="pt-3"></div>
      <BookingHeader
        dayValue={dayValue}
        setDayValue={setDayValue}
        filterState={filterState}
        setFilterState={setFilterState}
        page={page}
        setPage={setPage}
        heading="Booking History"
      />
      <BookingTable
        short
        dayValue={dayValue}
        page={page}
        setPage={setPage}
        filterState={filterState}
      />
      <Row className="mt-4 pt-3">
        <Col xl={7} className="mb-4">
          <PurchaseSale />
        </Col>
        <Col xl={5} className="mt-xl-0 mt-sm-5 mt-4 mb-xl-0 mb-4">
          <EventCalender />
        </Col>
      </Row>
    </Container>
  );
};

export default withMainLayout(Home);

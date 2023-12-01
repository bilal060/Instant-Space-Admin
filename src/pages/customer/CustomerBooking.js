import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import withMainLayout from '../../layout/MainLayout';
import CustomerBookings from '../../components/bookings/customerBookings/CustomerBookings';
import '../../assets/css/responsive.css';
import '../../assets/css/home.css';
import '../../assets/css/radio.css';
import CustomerBookingsHeading from '../../components/bookings/customerBookings/CustomerBookingsHeading';
import CustomerBookingsContent from '../../components/bookings/customerBookings/CustomerBookingsContent';
import BookingTable from '../../components/home/BookingTable';

function CustomerBooking() {
  const [dayValue, setDayValue] = useState();
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState('all');
  const [view, setView] = useState('Grid');

  return (
    <Container fluid>
      <CustomerBookings
        dayValue={dayValue}
        page={page}
        setPage={setPage}
        filterState={filterState}
      />
      <CustomerBookingsHeading
        dayValue={dayValue}
        setDayValue={setDayValue}
        filterState={filterState}
        setFilterState={setFilterState}
        page={page}
        setPage={setPage}
        setView={setView}
        view={view}
      />
      {view === 'Grid' ? (
        <CustomerBookingsContent
          dayValue={dayValue}
          page={page}
          setPage={setPage}
          filterState={filterState}
        />
      ) : (
        <BookingTable
          short={false}
          dayValue={dayValue}
          page={page}
          setPage={setPage}
          filterState={filterState}
        />
      )}
    </Container>
  );
}

export default withMainLayout(CustomerBooking);

import React, { lazy, useState, useEffect } from 'react';
import withMainLayout from '../../layout/MainLayout';
import { Container } from 'react-bootstrap';
import CustomerHomeHeader from '../../components/customer/HomeHeader';
import '../../assets/css/customers.css';
import ErrorBoundary from '../../shared/ErrorBoundary';
import ErrorBoundaryAlert from '../../shared/ErrorBoundaryAlert';
import { useDispatch } from 'react-redux';
import { getAllSpaces } from '../../store/storeIndex';
import Spaces from '../../components/home/Spaces';
import BookingHeader from '../../components/home/BookingHeader';
import BookingTable from '../../components/home/BookingTable';

const ViewAllSpaces = lazy(() => import('../../components/allSpaces/viewAllSpaces'));
const MapView = lazy(() => import('../../components/customer/MapView'));

const CustomerHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpaces());
  }, [dispatch]);

  const [view, setView] = useState('Grid');
  const [dayValue, setDayValue] = useState();
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState('all');

  return (
    <div>
      <Container fluid>
        <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
          <Spaces />
          <CustomerHomeHeader short setView={setView} view={view} />
          {view === 'Grid' ? (
            <ViewAllSpaces short length={3} classes="check-customer" />
          ) : (
            <MapView length={3} />
          )}
          <BookingHeader
            dayValue={dayValue}
            setDayValue={setDayValue}
            filterState={filterState}
            setFilterState={setFilterState}
            page={page}
            setPage={setPage}
          />
          <BookingTable
            short
            dayValue={dayValue}
            page={page}
            setPage={setPage}
            filterState={filterState}
          />
        </ErrorBoundary>
      </Container>
    </div>
  );
};

export default withMainLayout(CustomerHome);

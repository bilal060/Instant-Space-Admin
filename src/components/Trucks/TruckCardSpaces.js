import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/css/home.css';
import TruckCard from './TruckCard';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { getAllVehicles } from '../../store/storeIndex';

const TruckCardSpaces = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const vehicles = useSelector((state) => state.vehicle.vehicles);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);

  const pageHandler = (page) => {
    setPage(page);
    dispatch(getAllVehicles(userId, token, page));
  };

  return (
    <div>
      <Row>
        {Object.keys(vehicles).length > 0 &&
          vehicles.vehicles.map((truck, index) => {
            return (
              <Col key={index} xs={12} md={6} lg={4} xl={3}>
                <TruckCard truck={truck} />
              </Col>
            );
          })}
        {vehicles.totalRecords > 10 ? (
          <PaginationControl
            page={page}
            between={3}
            total={vehicles.totalRecords}
            limit={vehicles.limit}
            changePage={(page) => pageHandler(page)}
            ellipsis={2}
          />
        ) : (
          ''
        )}
      </Row>
    </div>
  );
};

export default TruckCardSpaces;

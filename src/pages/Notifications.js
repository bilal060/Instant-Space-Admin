import React from 'react';
import withMainLayout from '../layout/MainLayout.js';
import { Col, Row } from 'react-bootstrap';
import Drops from '../shared/Drops.js';
import '../assets/css/notification.css';
import NotificationsTable from '../components/Notifications/NotificationsTable';
const Notifications = () => {
  const options = ['Most Recent', 'Older'];
  return (
    <div>
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0">
        <Col xs="12" lg="6" className="">
          <span className="heading">Notifications</span>
        </Col>

        <Col xs="12" lg="6" className="d-flex end start pe-0">
          <div className="d-flex align-items-center w-40 ">
            <Drops title="Sort by:" options={options} />
          </div>
        </Col>
      </Row>
      <NotificationsTable />
    </div>
  );
};

export default withMainLayout(Notifications);

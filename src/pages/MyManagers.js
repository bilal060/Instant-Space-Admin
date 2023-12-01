import React from 'react';
import withMainLayout from '../layout/MainLayout';
import { Container, Row } from 'react-bootstrap';
import ManagerMain from '../components/managers/MyManagers';

const MyManagers = () => {
  return (
    <Container fluid>
      <Row>
        <ManagerMain />
      </Row>
    </Container>
  );
};

export default withMainLayout(MyManagers);

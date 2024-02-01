import React from 'react';
import withMainLayout from '../layout/MainLayout';
import { Container } from 'react-bootstrap';
import PlanMain from '../components/plan/PlanHistory';

function Plan() {
  return (
    <Container fluid>
      <PlanMain />
    </Container>
  );
}

export default withMainLayout(Plan);

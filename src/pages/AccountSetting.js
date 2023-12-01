import React from 'react';
import AccountSettingSidebar from '../components/account setting/AccountSettingSidebar';
import withMainLayout from '../layout/MainLayout';
import { Card, Col, Container, Row } from 'react-bootstrap';
import '../assets/css/account-settings.css';

const AccountSetting = ({ children }) => {
  return (
    <div className="account-setting">
      <Container fluid>
        <h3 className="font-24 font-weight-800 mb-3">Account Settings</h3>
        <Row className="gap-xl-0 gap-3">
          <Col xl="4">
            <AccountSettingSidebar />
          </Col>
          <Col xl="8">
            <Card className="account-setting-card shadow1">{children}</Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withMainLayout(AccountSetting);

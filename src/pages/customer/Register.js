import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import AuthLayout from '../../layout/AuthLayout';
import RegisterForm from '../../components/register/RegisterForm';
import ErrorBoundary from '../../shared/ErrorBoundary';
import ErrorBoundaryAlert from '../../shared/ErrorBoundaryAlert';
import LogoImg from '../../assets/images/logo.png';

const Register = () => {
  return (
    <div className="full-height-section">
      <Container fluid>
        <Row className="m-0">
          <Col xs="12" md="12" className="my-lg-0 my-4">
            <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
              <RegisterForm />
            </ErrorBoundary>
          </Col>
          <Col xs="12" md="6" className="order-first order-md-last text-center mb-5">
            <Image
              fluid
              src={LogoImg}
              alt="Logo"
              loading="lazy"
              className="d-block d-md-none p-3"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthLayout(Register);

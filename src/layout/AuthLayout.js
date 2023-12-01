import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthSlider from '../shared/AuthSlider';
import ErrorBoundary from '../shared/ErrorBoundary';
import ErrorBoundaryAlert from '../shared/ErrorBoundaryAlert';

const AuthLayout = (WrappedComponent) => {
  return function AuthLayoutHoc(props) {
    return (
      <>
        <div className="full-height-section">
          <Container fluid className="h-100 p-0">
            <Row className="m-0 h-100">
              <Col xs="12" lg="5" className="auth-section-1 py-5">
                <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
                  <WrappedComponent {...props} />
                </ErrorBoundary>
              </Col>
              <Col
                xs="12"
                lg="7"
                className="order-first d-lg-block d-none auth-section-2 order-md-last text-center">
                <AuthSlider />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };
};

export default AuthLayout;

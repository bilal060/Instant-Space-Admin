import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row } from 'react-bootstrap';

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .min(6, 'Otp minimum length should be 6')
    .max(6, 'Otp maximum length should be 6')
    .required('Otp is Required')
});

const VerifyAccountOtp = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate('/settings/changepassword/newpassword');
  };

  const initialValues = {
    otp: ''
  };

  return (
    <>
      <div>
        <h3 className="font-24 font-weight-800 mb-3">Verify OTP</h3>
        <p className="mb-4 pb-3 text-grey font-14 font-weight-400">
          A 6-digit code sent to your adam*****@gmail.com.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={otpValidationSchema}
          onSubmit={submitHandler}>
          {({ touched, errors }) => (
            <Form action="" className="text-light-black">
              <Row className="align-items-start mb-4 pb-3">
                <Col md="7">
                  <div className="d-flex flex-column">
                    <Field
                      type="number"
                      className={`form-control input-style
                    ${touched.otp && errors.otp ? 'is-invalid' : ''}`}
                      id="otp"
                      placeholder="Enter Email OTP"
                      name="otp"
                      minLength={6}
                      maxLength={6}
                    />
                    <ErrorMessage component="div" name="otp" className="invalid-feedback" />
                    <p className="mt-3 font-14 font-weight-500">
                      Re-send code in.
                      <span className="ms-1 font-weight-700 text-primary-blue">58s</span>
                    </p>
                  </div>
                </Col>

                <Col md="3">
                  <Button type="submit" className="btn-blue w-100">
                    Verify
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <h3 className="font-24 font-weight-800 mb-3">Change Password</h3>
        <p className="mb-4 pb-3 text-grey font-14 font-weight-400">
          Don’t worry! it happens. Please enter your email address to get code.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={otpValidationSchema}
          onSubmit={submitHandler}>
          {({ touched, errors }) => (
            <Form action="" className="text-light-black">
              <Row className="align-items-start mb-4 pb-3">
                <Col md="7">
                  <div className="d-flex flex-column">
                    <Field
                      type="number"
                      className={`form-control input-style
                    ${touched.otp && errors.otp ? 'is-invalid' : ''}`}
                      id="otp"
                      placeholder="elviscadmora@email.com"
                      name="otp"
                      minLength={6}
                      maxLength={6}
                    />
                    <ErrorMessage component="div" name="otp" className="invalid-feedback" />
                  </div>
                </Col>

                <Col md="3">
                  <Button type="submit" className="btn-blue w-100">
                    Get Code
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default VerifyAccountOtp;

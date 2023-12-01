/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Image, Row } from 'react-bootstrap';
import TextField from '../../shared/TextField';
import PassIcon from '../../assets/images/icons/lock.png';
import EyeIcon from '../../assets/images/icons/eye.svg';
import CloseEye from '../../assets/images/icons/closeeye.png';
import OtpIcon from '../../assets/images/icons/@.png';

import { useDispatch, useSelector } from 'react-redux';
import {
  forgetPassword,
  resetPassword,
  updateUserPassword,
  verifyOtp
} from '../../store/storeIndex';

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .min(4, 'Otp minimum length should be 4')
    .max(4, 'Otp maximum length should be 4')
    .required('Otp is Required')
});

const ChangeAccountPassword = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [counter, setCounter] = useState(60);
  const userDetails = useSelector((state) => state.user.user);

  const submitHandler = (values) => {
    // const data = {
    //   passwordCurrent: values.oldPassword,
    //   password: values.newPassword,
    //   passwordConfirm: values.confirmPassword,
    // };
    // dispatch(updateUserPassword(data, token));

    const data = {
      email: userDetails.email,
      password: values.password,
      passwordConfirm: values.cPassword
    };
    dispatch(resetPassword(data));
  };

  const initialValues = {
    password: '',
    cPassword: ''
  };
  const otpValues = {
    otp: ''
  };

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const [activeForm, setActiveForm] = useState('verifyOTP');

  const getCodeHandler = (values) => {
    const data = {
      email: values.email
    };
    dispatch(forgetPassword(data));
    setActiveForm('changePassword');
    setCounter(60);
  };

  const handleVerifyClick = (values) => {
    const data = {
      email: userDetails.email,
      otp: values.otp
    };
    dispatch(verifyOtp(data));
    setActiveForm('newPassword');
  };

  const validValues = {
    email: ''
  };

  const errorSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required')
  });

  const newPasswordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .required('Password is required'),
    cPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Must match "password" field value')
      .required('Confirm password is required')
  });

  useEffect(() => {
    let timeCounter;
    if (counter > 0) {
      timeCounter = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => {
      clearTimeout(timeCounter);
    };
  }, [counter]);

  return (
    <>
      {activeForm === 'verifyOTP' && (
        <div>
          <h3 className="font-24 font-weight-800 mb-3">Change Password</h3>
          <p className="mb-4 pb-3 text-grey font-14 font-weight-400">
            Don’t worry! it happens. Please enter your email address to get code.
          </p>
          <Formik
            initialValues={validValues}
            validationSchema={errorSchema}
            onSubmit={getCodeHandler}>
            {({ touched, errors }) => (
              <Form action="" className="text-light-black">
                <Row className="align-items-start mb-4 pb-3">
                  <Col md="7">
                    <div className="d-flex flex-column">
                      <TextField
                        icon={
                          <Image
                            fluid
                            className="field-icon"
                            src={OtpIcon}
                            loading="lazy"
                            width={20}
                            height={20}
                          />
                        }
                        placeholder="Email"
                        name="email"
                        type="email"
                      />
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
      )}
      {activeForm === 'changePassword' && (
        <div>
          <h3 className="font-24 font-weight-800 mb-3">Verify OTP</h3>
          <p className="mb-4 pb-3 text-grey font-14 font-weight-400">
            A 6-digit code sent to your adam*****@gmail.com.
          </p>
          <Formik
            initialValues={otpValues}
            validationSchema={otpValidationSchema}
            onSubmit={handleVerifyClick}>
            {({ touched, errors }) => (
              <Form action="" className="text-light-black">
                <Row className="align-items-start mb-4 pb-3">
                  <Col md="7">
                    <div className="d-flex flex-column">
                      <TextField
                        icon={
                          <Image
                            fluid
                            className="field-icon"
                            src={OtpIcon}
                            loading="lazy"
                            width={20}
                            height={20}
                          />
                        }
                        placeholder="Enter Email OTP"
                        name="otp"
                        type="text"
                      />

                      <p className="mt-3 font-14 font-weight-500">
                        Re-send code in.
                        <span className="ms-1 font-weight-700 text-primary-blue">
                          {`${counter}s`}
                        </span>
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
      )}
      {activeForm === 'newPassword' && (
        <div>
          <h3 className="font-24 font-weight-800 mb-3">New Password</h3>
          <p className="mb-4 pb-3 text-grey font-14 font-weight-400">Create your new password.</p>
          <Formik
            initialValues={initialValues}
            validationSchema={newPasswordValidationSchema}
            onSubmit={submitHandler}>
            {() => (
              <Form action="" className="text-light-black">
                <Row className="align-items-start pb-2 gap-sm-0 m-0">
                  <Col sm="6" className="ps-0">
                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={PassIcon}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      righticon={
                        <Image
                          fluid
                          className="field-righticon"
                          src={eye1 ? CloseEye : EyeIcon}
                          loading="lazy"
                          width={20}
                          height={20}
                          onClick={() => {
                            setEye1(!eye1);
                          }}
                        />
                      }
                      placeholder="Password"
                      name="password"
                      type={eye1 ? 'text' : 'password'}
                    />
                  </Col>
                  <Col sm="6" className="p-0 m-0">
                    <div className="d-flex flex-column full-name custom-w">
                      <TextField
                        icon={
                          <Image
                            fluid
                            className="field-icon"
                            src={PassIcon}
                            loading="lazy"
                            width={20}
                            height={20}
                          />
                        }
                        righticon={
                          <Image
                            fluid
                            className="field-righticon"
                            src={eye2 ? CloseEye : EyeIcon}
                            loading="lazy"
                            width={20}
                            height={20}
                            onClick={() => {
                              setEye2(!eye2);
                            }}
                          />
                        }
                        placeholder="Confirm Password"
                        name="cPassword"
                        type={eye2 ? 'text' : 'password'}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-end mt-4 gap-sm-0 gap-3">
                  <Col xxl="3" md="4" sm="5">
                    <Button type="submit" className="btn-orange-outline w-100">
                      Cancel
                    </Button>
                  </Col>
                  <Col xxl="3" md="4" sm="5">
                    <Button type="submit" className="btn-blue w-100">
                      Save Change
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default ChangeAccountPassword;

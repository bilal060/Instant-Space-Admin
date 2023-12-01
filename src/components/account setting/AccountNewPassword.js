'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Image, Row } from 'react-bootstrap';
import TextField from '../../shared/TextField';
import EyeIcon from '../../assets/images/icons/eye.svg';
import CloseEye from '../../assets/images/icons/closeeye.png';
import { useState } from 'react';

export const newPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password minimum length should be 8')
    .required('Password is Required'),
  confirmPassword: Yup.string()
    .min(8, 'Password minimum length should be 8')
    .required('Password is Required')
});

const AccountNewPassword = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate('/settings/changepassword/newpassword');
  };

  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  };

  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);

  return (
    <div>
      <h3 className="font-24 font-weight-800 mb-3">New Password</h3>
      <p className="mb-4 pb-3 text-grey font-14 font-weight-400">Create your new password.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={newPasswordValidationSchema}
        onSubmit={submitHandler}>
        {() => (
          <Form action="" className="text-light-black">
            <Row className="align-items-start pb-4 gap-sm-0 gap-3">
              <Col sm="6">
                <TextField
                  righticon={
                    <Image
                      fluid
                      className="field-righticon"
                      src={eye ? CloseEye : EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => {
                        setEye(!eye);
                      }}
                    />
                  }
                  placeholder="New Password"
                  name="password"
                  type={eye ? 'text' : 'password'}
                />
                <ErrorMessage component="div" name="newPassword" className="invalid-feedback" />
              </Col>
              <Col sm="6">
                <TextField
                  righticon={
                    <Image
                      fluid
                      className="field-righticon"
                      src={eye ? CloseEye : EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => {
                        setEye1(!eye1);
                      }}
                    />
                  }
                  placeholder="Confirm New Password"
                  name="password"
                  type={eye1 ? 'text' : 'password'}
                />
                <ErrorMessage component="div" name="confirmPassword" className="invalid-feedback" />
              </Col>
            </Row>
            <Row className="justify-content-end mt-5 gap-sm-0 gap-3">
              <Col md="3" sm="4">
                <Button type="submit" className="btn-orange-outline w-100">
                  Cancel
                </Button>
              </Col>
              <Col md="3" sm="4">
                <Button type="submit" className="btn-blue w-100">
                  Save Change
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountNewPassword;

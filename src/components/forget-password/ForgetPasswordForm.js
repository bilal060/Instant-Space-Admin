/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.svg';
import TextField from '../../shared/TextField';
import OtpIcon from '../../assets/images/icons/@.png';
import '../../assets/css/login-form.css';
import { forgetPassword } from '../../store/storeIndex';

const ForgetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validValues = {
    email: ''
  };

  const errorSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required')
  });

  const loginHandler = (values) => {
    const data = {
      email: values.email
    };
    dispatch(forgetPassword(data, navigate, '/auth/verify-otp'));
  };

  return (
    <div className="form-space px-lg-5 mx-xl-5" data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" xs="12" md="6" className="auth-logo" />
      <h2 className="auth-heading">
        Forgot <span className="auth-special">Password?</span>
      </h2>
      <p className="auth-subheading">
        Don’t worry! it happens. Please enter your email address to get code.
      </p>

      <div className="mt-5">
        <Formik initialValues={validValues} validationSchema={errorSchema} onSubmit={loginHandler}>
          {(formik) => (
            <Form>
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
              <Button type="submit" className="w-100 mt-3 h-56px gradient-btn-orange">
                Get Code
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;

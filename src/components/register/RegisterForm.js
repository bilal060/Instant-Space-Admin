import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.svg';
import TextField from '../../shared/TextField';
import RateIcon from '../../assets/images/icons/@.png';
import PassIcon from '../../assets/images/icons/lock.png';
import EyeIcon from '../../assets/images/icons/eye.svg';
import CloseEye from '../../assets/images/icons/closeeye.png';
import '../../assets/css/login-form.css';

import { signupUser } from '../../store/storeIndex';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validValues = {
    email: '',
    password: '',
    cPassword: ''
  };

  const errorSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .required('Password is required'),
    cPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Must match "password" field value')
      .required('Confirm password is required')
  });

  const loginHandler = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      role: 'Customer',
      passwordConfirm: values.cPassword
    };

    dispatch(signupUser(data, navigate, '/auth/customer-information'));
  };

  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);

  return (
    <div className="form-space px-lg-5 mx-xl-5" data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" xs="12" md="6" className="auth-logo" />
      <h2 className="auth-heading">
        Register <span className="auth-special">Now</span>
      </h2>
      <p className="auth-subheading mb-5">Create your new account.</p>

      <div className="mt-3">
        <Formik initialValues={validValues} validationSchema={errorSchema} onSubmit={loginHandler}>
          {() => (
            <Form>
              <TextField
                icon={
                  <Image
                    fluid
                    className="field-icon"
                    src={RateIcon}
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                }
                placeholder="Email"
                name="email"
                type="email"
              />
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
                    src={eye ? CloseEye : EyeIcon}
                    loading="lazy"
                    width={20}
                    height={20}
                    onClick={() => {
                      setEye(!eye);
                    }}
                  />
                }
                placeholder="Password"
                name="password"
                type={eye ? 'text' : 'password'}
              />
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
                placeholder="Confirm Password"
                name="cPassword"
                type={eye1 ? 'text' : 'password'}
              />
              <Button type="submit" className="w-100 mt-3 h-56px gradient-btn-orange">
                Next
              </Button>
            </Form>
          )}
        </Formik>
        <p className="auth-subheading fw-bold text-center mt-5 text-dark">
          Already have an account?
          <Link to="/auth/login" className="text-decoration-none ps-1">
            <span className="forget fs-6">Login</span>
          </Link>
        </p>
        <p className="auth-subheading fw-bold text-center mt-4 text-dark">
          <Link to="/auth/service-provider/register" className="custom-link">
            <span className="forget fs-6">Register as a Service Provider</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

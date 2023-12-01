import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.svg';
import TextField from '../../shared/TextField';
import PassIcon from '../../assets/images/icons/lock.png';
import '../../assets/css/login-form.css';
import { resetPassword } from '../../store/storeIndex';
import EyeIcon from '../../assets/images/icons/eye.svg';
import CloseEye from '../../assets/images/icons/eyeclose.svg';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();

  const validValues = {
    password: '',
    cPassword: ''
  };

  const errorSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .required('Password is required'),
    cPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Must match "password" field value')
      .required('Confirm password is required')
  });

  const loginHandler = (values) => {
    const data = {
      email: state.email,
      password: values.password,
      passwordConfirm: values.cPassword
    };
    dispatch(resetPassword(data, navigate));
  };
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  return (
    <div className="form-space px-lg-5 mx-xl-5" data-aos="fade-right">
      <Image fluid src={LogoImg} alt="Logo" loading="lazy" xs="12" md="6" className="auth-logo" />
      <h2 className="auth-heading">
        Reset <span className="auth-special">Password</span>
      </h2>
      <p className="auth-subheading">Create your new password.</p>

      <div className="mt-5 w-100">
        <Formik initialValues={validValues} validationSchema={errorSchema} onSubmit={loginHandler}>
          {() => (
            <Form>
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
              <Button type="submit" className="w-100 mt-5 h-56px gradient-btn-orange">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

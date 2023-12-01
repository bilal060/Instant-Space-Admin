import React from 'react';
import { Image } from 'react-bootstrap';

import LogoImg from '../../assets/images/logo.svg';

import '../../assets/css/login-form.css';
import 'react-phone-input-2/lib/style.css';
import CustomerInfoForm from './CustomerInfoForm';

const CustomerInfo = () => {
  return (
    <>
      <div className="form-space px-lg-5 mx-xl-5" data-aos="fade-right">
        <Image fluid src={LogoImg} alt="Logo" loading="lazy" xs="12" md="6" className="auth-logo" />
        <h2 className="auth-heading">
          Personal <span className="auth-special">Info</span>
        </h2>
        <p className="auth-subheading">Enter your personal information below.</p>
        <div className="mt-5 w-100">
          <CustomerInfoForm />
          <p className="auth-subheading fw-bold text-center mt-5 text-dark">
            By registering, you’re agree to our,
            <span className="forget">Terms & Condition</span> and
            <span className="forget">Privacy Policy</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;

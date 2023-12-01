import React from 'react';
import OTP from '../../components/otp/OTP';
import AuthLayout from '../../layout/AuthLayout';

const VerifyOTP = () => {
  return (
    <>
      <OTP />
    </>
  );
};

export default AuthLayout(VerifyOTP);

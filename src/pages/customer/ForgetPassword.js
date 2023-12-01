import React from 'react';
import AuthLayout from '../../layout/AuthLayout';
import ForgetPasswordForm from '../../components/forget-password/ForgetPasswordForm';

const ForgetPassword = () => {
  return (
    <>
      <ForgetPasswordForm />
    </>
  );
};

export default AuthLayout(ForgetPassword);

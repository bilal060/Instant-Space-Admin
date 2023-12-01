import React from 'react';
import ResetPasswordForm from '../components/reset-password/ResetPasswordForm';
import AuthLayout from '../layout/AuthLayout';

const ResetPassword = () => {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
};

export default AuthLayout(ResetPassword);

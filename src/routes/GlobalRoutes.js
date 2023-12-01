import React from 'react';
import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
const Login = lazy(() => import('../pages/customer/Login'));
const VerifyOTP = lazy(() => import('../pages/customer/VerifyOTP'));
const ForgetPassword = lazy(() => import('../pages/customer/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

function GlobalRoutes() {
  return (
    <Routes>
      <Route exact path="/auth/login" element={<Login />}></Route>
      <Route exact path="/auth/forget-password" element={<ForgetPassword />}></Route>
      <Route exact path="/auth/verify-otp" element={<VerifyOTP />}></Route>
      <Route exact path="/auth/reset-password" element={<ResetPassword />}></Route>
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

export default GlobalRoutes;

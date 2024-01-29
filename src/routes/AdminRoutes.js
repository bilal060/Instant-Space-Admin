import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminSpaceControl from '../components/account setting/AdminSpaceControl.js';
const EditAccount = lazy(() => import('../pages/accounts/EditAccount.js'));
const Home = lazy(() => import('../pages/Home.js'));
const Bookings = lazy(() => import('../pages/Bookings.js'));
const AllUsers = lazy(() => import('../pages/AllUsers.js'));
const PaymentHistory = lazy(() => import('../pages/PaymentHistory.js'));
const MyManagers = lazy(() => import('../pages/MyManagers.js'));
const Notifications = lazy(() => import('../pages/Notifications.js'));

const AccountPrivacyPolicy = lazy(
  () => import('../components/account setting/AccountPrivacyPolicy.js')
);
const AccountPaymentHistory = lazy(
  () => import('../components/account setting/AccountPaymentHistory.js')
);
const AccountFaqs = lazy(() => import('../components/account setting/AccountFaqs.js'));
const ChangeAccountPassword = lazy(
  () => import('../components/account setting/ChangeAccountPassword.js')
);
const AccountSetting = lazy(() => import('../pages/AccountSetting.js'));

function GlobalRoutes() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/dashboard/users" element={<AllUsers />}></Route>
        <Route exact path="/dashboard/bookings" element={<Bookings />}></Route>
        <Route exact path="/dashboard/payment-history" element={<PaymentHistory />}></Route>
        <Route exact path="/dashboard/my-managers" element={<MyManagers />}></Route>
        <Route exact path="/dashboard/notifications" element={<Notifications />}></Route>
        <Route
          path="/settings/edit"
          element={
            <AccountSetting>
              <EditAccount />
            </AccountSetting>
          }
        />
        <Route
          path="/settings/changepassword"
          element={
            <AccountSetting>
              <ChangeAccountPassword />
            </AccountSetting>
          }
        />
        <Route
          path="/settings/faq"
          element={
            <AccountSetting>
              <AccountFaqs />
            </AccountSetting>
          }
        />
        <Route
          path="/settings/privacy"
          element={
            <AccountSetting>
              <AccountPrivacyPolicy />
            </AccountSetting>
          }
        />
        <Route
          path="/settings/payment"
          element={
            <AccountSetting>
              <AccountPaymentHistory />
            </AccountSetting>
          }
        />
        <Route
          path="/settings/controls"
          element={
            <AccountSetting>
              <AdminSpaceControl />
            </AccountSetting>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default GlobalRoutes;

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import EditProfile from '../../assets/images/icons/editProfile';
import ChangePassword from '../../assets/images/icons/changePassword';
import Faq from '../../assets/images/icons/faq';
import Policy from '../../assets/images/icons/policy';
import PaymentHistory from '../../assets/images/icons/paymenthistory';

const settingRoute = [
  {
    name: 'Edit Profile',
    img: <EditProfile />,
    link: '/settings/edit'
  },
  {
    name: 'Change Password',
    img: <ChangePassword />,
    link: '/settings/changepassword'
  },
  {
    name: 'FAQs',
    img: <Faq />,
    link: '/settings/faq'
  },
  {
    name: 'Privacy Policy',
    img: <Policy />,
    link: '/settings/privacy'
  },
  {
    name: 'Payment History',
    img: <PaymentHistory />,
    link: '/settings/payment'
  }
];
const AccountSettingSidebar = () => {
  const location = useLocation();

  return (
    <>
      <Card className="account-setting-card1 p-4 border-0 shadow1 ">
        {settingRoute.map((data, index) => {
          return (
            <Link
              key={index}
              to={data.link}
              className={`${
                data.link === location.pathname || location.pathname.includes(data.link)
                  ? 'active'
                  : ''
              } link`}>
              {data.img}
              {data.name}
            </Link>
          );
        })}
      </Card>
    </>
  );
};

export default AccountSettingSidebar;

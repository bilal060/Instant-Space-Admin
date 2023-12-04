import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/sidebar-nav.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import SettingsIcon from '../assets/images/icons/Settings';
import ManagerIcon from '../assets/images/icons/Manager';
import BookingIcon from '../assets/images/icons/Booking';
import HomeIcon from '../assets/images/icons/Home';
import SpacesIcon from '../assets/images/icons/Spaces';
import MessagesIcon from '../assets/images/icons/Messages';

const SidebarNav = () => {
  const location = useLocation();
  return (
    <Sidebar
      defaultCollapsed={useWindowDimensions()}
      width="290px"
      collapsedWidth="65px"
      backgroundColor="#fff"
      className="main-navigation">
      <Menu className="mt-4 gap-2">
        <MenuItem
          component={<Link to="/" className="menu-item-link" />}
          active={location.pathname === '/' && true}>
          <span className="menu-icon">
            <HomeIcon />
          </span>
          Home
        </MenuItem>
        <MenuItem
          component={<Link to="/dashboard/users" className="menu-item-link" />}
          active={location.pathname === '/dashboard/users' && true}>
          <span className="menu-icon">
            <SpacesIcon />
          </span>
          All Users
        </MenuItem>
        <MenuItem
          component={<Link to="/dashboard/bookings" className="menu-item-link" />}
          active={location.pathname === '/dashboard/bookings' && true}>
          <span className="menu-icon">
            <BookingIcon />
          </span>
          All Booking
        </MenuItem>
        <MenuItem
          component={<Link to="/dashboard/my-managers" className="menu-item-link" />}
          active={location.pathname === '/dashboard/my-managers' && true}>
          <span className="menu-icon">
            <ManagerIcon />
          </span>
          All Staff
        </MenuItem>
        <MenuItem
          component={<Link to="/dashboard/payment-history" className="menu-item-link" />}
          active={location.pathname === '/dashboard/payment-history' && true}>
          <span className="menu-icon">
            <MessagesIcon />
          </span>
          All Transactions
        </MenuItem>
      </Menu>

      <Menu className="sidebar-footer">
        <MenuItem component={<Link to="/support" className="menu-item-link" />}>
          <span className="menu-icon">
            <SettingsIcon />
          </span>
          Support & Help Center
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarNav;

import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import '../assets/css/sidebar-nav.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import SettingsIcon from '../assets/images/icons/Settings';
import ManagerIcon from '../assets/images/icons/Manager';
import BookingIcon from '../assets/images/icons/Booking';
import HomeIcon from '../assets/images/icons/Home';
import SpacesIcon from '../assets/images/icons/Spaces';
import MessagesIcon from '../assets/images/icons/Messages';

const SidebarNav = () => {
  return (
    <Sidebar
      defaultCollapsed={useWindowDimensions()}
      width="290px"
      collapsedWidth="65px"
      backgroundColor="#fff"
      className="main-navigation">
      <Menu className="mt-4 gap-2">
        <NavLink to="/" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <HomeIcon />
            </span>
            Home
          </MenuItem>
        </NavLink>
        <NavLink to="/dashboard/users" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <SpacesIcon />
            </span>
            All Users
          </MenuItem>
        </NavLink>
        <NavLink to="/dashboard/bookings" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <BookingIcon />
            </span>
            All Booking
          </MenuItem>
        </NavLink>
        <NavLink to="/dashboard/my-managers" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <ManagerIcon />
            </span>
            All Staff
          </MenuItem>
        </NavLink>
        <NavLink to="/dashboard/payment-history" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <MessagesIcon />
            </span>
            All Transactions
          </MenuItem>
        </NavLink>
      </Menu>

      <Menu className="sidebar-footer">
        <NavLink to="/support" className="menu-item-link">
          <MenuItem>
            <span className="menu-icon">
              <SettingsIcon />
            </span>
            Support & Help Center
          </MenuItem>
        </NavLink>
      </Menu>
    </Sidebar>
  );
};

export default SidebarNav;

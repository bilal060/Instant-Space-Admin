/* eslint-disable react/display-name */
import React from 'react';
import TopBar from '../shared/TopBar';
import SidebarNav from '../shared/SidebarNav';

const withMainLayout = (WrappedComponent) => {
  return (props) => (
    <React.Fragment>
      <TopBar />
      <div className="page-container">
        <SidebarNav />
        <main className="main-container">
          <WrappedComponent {...props} />
        </main>
      </div>
    </React.Fragment>
  );
};

export default withMainLayout;

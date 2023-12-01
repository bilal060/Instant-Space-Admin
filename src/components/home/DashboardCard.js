import React from 'react';

import '../../assets/css/dashboard-card.css';
import { Image } from 'react-bootstrap';

const DashboardCard = ({ icon, title, description, cardColor }) => {
  if (cardColor) {
    return (
      <div
        className="card-body flex-xl-column flex-xxl-row flex-row gap-3 bookings-card px-4"
        style={{ backgroundColor: `${cardColor}` }}>
        <Image src={icon} loading="lazy" className="card-icon m-0" />
        <div className="text-xl-center text-xxl-left">
          <h4 className="card-title text-dark cut-text">{title}</h4>
          <h1 className="card-description text-dark m-0">{description === 0 ? 0 : description}</h1>
        </div>
      </div>
    );
  } else {
    // return (
    //     <div className='card-body'>
    //         {icon}
    //         <div>
    //             <h4 className='card-count'>{count}</h4>
    //             <h4 className='card-title'>{title}</h4>
    //         </div>
    //     </div>
    // )
  }
};

export default DashboardCard;

import React from 'react';
import tickicon from './../assets/images/tickercard.svg';
import crosicon from './../assets/images/crosscard.svg';
import reporticon from './../assets/images/reportcard.svg';

const CardComponent = () => {
  return (
    <div className="card-notification">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center mb-2">
          <a href="https://" className="text-decoration-none cards-links">
            <img src={tickicon} alt="Icon 1" className="me-2" />
            Mark as read
          </a>
        </div>
        <div className="d-flex align-items-center mb-2">
          <a href="https://" className="text-decoration-none cards-links">
            <img src={crosicon} alt="Icon 2" className="me-2" />
            Remove this notification
          </a>
        </div>
        <div className="d-flex align-items-center">
          <a href="https://" className="text-decoration-none cards-links">
            <img src={reporticon} alt="Icon 3" className="me-2" />
            Report issue to notification team
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

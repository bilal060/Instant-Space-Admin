import React from 'react';
import { TruckCardComponent } from './TruckSpace';

const TruckCard = (props) => {
  const { company, images, regiterNo, type, drivingLicenseNo, model } = props.truck;
  return (
    <div>
      <div className="my-2">
        <TruckCardComponent
          title={company}
          src={`${process.env.REACT_APP_SERVER_URL}${images[0]}`}
          gallery="12"
          model={model}
          type={type}
          regiterNo={regiterNo}
          drivingLicenseNo={drivingLicenseNo}
          id={props.truck._id}
        />
      </div>
    </div>
  );
};

export default TruckCard;

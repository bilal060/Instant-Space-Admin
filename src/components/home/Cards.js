import React from 'react';

import { CardComponent } from './Space';
import electric1 from '../../assets/images/icons/CardIcons/electric1.svg';
import electric2 from '../../assets/images/icons/CardIcons/electric2.svg';
import electric3 from '../../assets/images/icons/CardIcons/electric3.svg';
import electric4 from '../../assets/images/icons/CardIcons/electric4.svg';

const Cards = ({ onClick, status, ...props }) => {
  const {
    images,
    contact,
    capacity,
    rate_month,
    address,
    categoryId,
    available,
    cameras,
    name,
    _id,
    fuel
  } = props.space;

  return (
    <div className="my-2">
      <CardComponent
        status={status}
        title={name}
        src={`${process.env.REACT_APP_SERVER_URL}${images[0]}`}
        gallery="12"
        phone={contact}
        capacity={capacity}
        address={address}
        type={categoryId.subcategories ? categoryId.subcategories[0].name : ''}
        rate={rate_month}
        icon1={electric1}
        icon2={cameras && electric4}
        icon3={electric3}
        icon4={fuel && electric2}
        available={available}
        id={_id}
        onClick={onClick}
      />
    </div>
  );
};
export { Cards };

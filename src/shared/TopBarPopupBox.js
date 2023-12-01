import React from 'react';
import { Image } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const TopBarPopupBox = ({ cards }) => {
  return (
    <>
      {cards.map((items, index) => {
        return (
          <DropdownItem className="px-4" key={index}>
            <div className="d-flex gap-3">
              <div>
                <Image src={items.img} className="rounded-circle" width={50} />
              </div>
              <div className="d-flex flex-column ">
                <p className="font-12 text-wrap mb-0">{items.description}</p>
                <p className="font-10 top-popup-primary text-14 mb-0">{items.time}</p>
              </div>
            </div>
          </DropdownItem>
        );
      })}
    </>
  );
};

export default TopBarPopupBox;

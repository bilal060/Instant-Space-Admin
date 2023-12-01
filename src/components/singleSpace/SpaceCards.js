import React from 'react';
import { Col } from 'react-bootstrap';

const SpaceCards = ({ Cards, activeData }) => {
  return (
    <>
      {Cards.map((measure, index) => (
        <Col sm={4} md={6} lg={4} key={index}>
          <div className="d-flex flex-column  align-items-center gap-3 p-4 text-center">
            <div
              className={`${
                activeData?.some(
                  (item) => item.name === measure.label.split(' ').join('').toLocaleLowerCase()
                )
                  ? 'active'
                  : 'notactive'
              } space-card-icon-off `}>
              {measure.imageSrc}
              {/* <Image src={measure.imageSrc} width={20} height={20} className="" /> */}
            </div>
            <div>
              <span>{measure.label}</span>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default SpaceCards;

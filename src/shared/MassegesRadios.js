import React from 'react';
import { Form } from 'react-bootstrap';
import '../assets/css/topbar-popup-radio.css';

const MassegesRadios = ({ data, setCategory, category, className }) => {
  const isActive = category === data.text;
  const containerClassName = `topbar-radio-container  ${
    isActive ? 'top-radio-active bg-lightRed' : 'top-radio-inactive'
  }`;

  const handleRadioClick = () => {
    setCategory(data.text);
  };

  return (
    <>
      <div key={data.index} className={`${className} w-15`}>
        <div className="bg-white rounded-2  w-100 text-center ">
          <div
            onClick={handleRadioClick}
            className={`rounded-circle  flex-height  ${containerClassName}`}>
            <div className="d-flex">
              <div className="font-weight-700 font-14">{data.text}</div>
            </div>
          </div>
          <Form.Check
            checked={isActive}
            onChange={handleRadioClick}
            inline
            label=""
            name="group1"
            type="radio"
            id={`inline-radio-${data.id}`}
            className="p-0 m-0 visually-hidden"
          />
        </div>
      </div>
    </>
  );
};

export default MassegesRadios;

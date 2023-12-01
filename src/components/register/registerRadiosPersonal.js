import React from 'react';
import { Form } from 'react-bootstrap';
import '../../assets/css/login-form.css';

const RegisterRadios = ({ data, setCategory, category }) => {
  const isActive = category === data.text;
  const containerClassName = `radio-container ${isActive ? 'radio-active' : 'radio-inactive'}`;
  const svgClassName = `svg ${isActive ? 'svg-active' : 'svg-inactive'}`;

  const handleRadioClick = () => {
    setCategory(data.text);
  };

  return (
    <div className="register-form-space mt-5 w-100" key={data.index}>
      <div className="d-flex flex-column align-items-center w-auto gap-3 modal-tabs w-100">
        <div className="bg-white rounded-2 w-100 text-center">
          <div onClick={handleRadioClick} className={`w-100 flex-height ${containerClassName}`}>
            <div className={containerClassName}>
              {React.cloneElement(data.imgSrc, {
                className: svgClassName
              })}
              <span style={{ marginTop: '10px' }}>{data.text}</span>
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
    </div>
  );
};

export default RegisterRadios;

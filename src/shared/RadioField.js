/* eslint-disable no-undef */
import React from 'react';
import { ErrorMessage, useField } from 'formik';

import { Form } from 'react-bootstrap';

const RadioField = (props) => {
  const [field] = useField(props);

  return (
    <React.Fragment>
      <div className="mb-2 field-container">
        <div className="d-flex align-items-center">
          {icon}
          <Form.Check
            onChange={() => {
              setCategory('owner');
            }}
            inline
            label="Storage Owner"
            name="group1"
            className="m-0 p-0 w-min line-1 mt-2"
            type="radio"
            checked={category === 'Truck' ? true : false}
            id={`inline-radio-1`}
          />
        </div>
      </div>
      <ErrorMessage component="small" name={field.name} className="text-danger fw-bold" />
    </React.Fragment>
  );
};

export default RadioField;

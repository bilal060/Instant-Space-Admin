import React from 'react';
import { ErrorMessage, useField } from 'formik';

import '../assets/css/text-field.css';
import { Form } from 'react-bootstrap';

const SelectField = ({ icon, defaulText, choices, onChange, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <div className="mb-2 field-container">
        <div className="d-flex align-items-center">
          {icon}
          <Form.Select
            className={`form-control custom-field shadow-none ${
              meta.touched && meta.error && 'is-invalid'
            }`}
            {...field}
            {...props}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange(e.target.value);
              }
            }}>
            <option value="">{defaulText}</option>
            {choices.map((choice, index) => {
              return (
                <option key={index} value={choice.value}>
                  {choice.option}
                </option>
              );
            })}
          </Form.Select>
        </div>
      </div>
      <ErrorMessage component="small" name={field.name} className="text-danger fw-bold" />
    </React.Fragment>
  );
};

export default SelectField;

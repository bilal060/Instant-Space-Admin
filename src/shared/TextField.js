import React from 'react';
import { ErrorMessage, useField } from 'formik';

import '../assets/css/text-field.css';

const TextField = ({ righticon, icon, margin, width, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <div className={`mb-3 ${width}`}>
        <div className={`mb-2 field-container ${margin}`}>
          <div className="d-flex align-items-center">
            {icon}

            <input
              className={`form-control custom-field shadow-none input-style ${
                meta.touched && meta.error && 'is-invalid'
              } `}
              {...field}
              {...props}
              autoComplete="off"
            />
            {righticon}
          </div>
        </div>
        <ErrorMessage component="small" name={field.name} className="text-danger fw-bold" />
      </div>
    </React.Fragment>
  );
};

export default TextField;

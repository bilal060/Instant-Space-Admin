import React from 'react';
import { Form } from 'react-bootstrap';

function MyDropDown(props) {
  const { options, selectedValue, onChange, labelName, all } = props;
  return (
    <div className="d-flex align-items-center">
      {Object?.keys(options)?.length > 0 && (
        <div className="d-flex align-items-center justify-content-end w-100 gap-2">
          <Form.Label className="mb-0 fw-bold d-flex align-items-center">
            <span>{labelName}</span>
            <span>:</span>
          </Form.Label>
          <Form.Select
            aria-label="Default drop-input select example"
            className=""
            defaultValue={selectedValue}
            onChange={(e) => onChange(e.target.value)}>
            {all && <option value="all">All</option>}
            {options?.map((option, index) => {
              return (
                <option key={index} value={option?._id} className="text-capitalize">
                  {option?.name}
                </option>
              );
            })}
          </Form.Select>
        </div>
      )}
    </div>
  );
}

export default MyDropDown;

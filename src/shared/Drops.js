import React from 'react';
import { Form } from 'react-bootstrap';
import '../assets/css/dashboard-misc.css';

export default function Drops(props) {
  return (
    <div className="d-flex align-items-center justify-content-start w-100">
      <Form.Label className="custom-width mb-0">{props.title}</Form.Label>
      <Form.Select aria-label="Default drop-input select example" className="w-75">
        {props.options.map((option, index) => {
          return (
            <option key={index} className="options">
              {option}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
}

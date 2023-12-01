import React from 'react';
import { Button } from 'react-bootstrap';

import '../assets/css/custom-button.css';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button className="cutom-btn" {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;

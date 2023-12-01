import React from 'react';

import { useState } from 'react';
import CustomModal1 from '../../shared/CustomModal1';
import ManagerForm from '../managers/ManagerForm';
import '../../assets/css/radio.css';
import { useNavigate } from 'react-router-dom';

export default function MainHeader(props) {
  const [lgShow, setLgShow] = useState(false);
  const navigate = useNavigate();

  // const categories = useSelector((state) => state.category.categories);

  // const [category, setCategory] = useState(
  //   categories !== undefined && Object.keys(categories).length > 0
  //     ? categories?.subcategories[0]?._id
  //     : ''
  // );

  return (
    <div className="main my-3">
      <div className="content-head d-flex justify-content-between align-items-center">
        <div className={`heading text-18 ${props.class}`}>
          {props.heading}
          <span className="text-primary fst-italic">{props.highlight}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <button
            onClick={() => navigate(`/dashboard/update-space/${props.id}`)}
            type="button"
            className="space-btn-font space-btn-size custom-button-font gradient-btn-orange h-40px btn btn-primary">
            Edit Space
          </button>
          <button
            type="button"
            className="space-btn-font space-btn-size custom-button-font gradient-btn-orange h-40px btn btn-primary"
            onClick={() => setLgShow(true)}>
            + Add New Staff
          </button>
        </div>
      </div>

      <CustomModal1 heading="Add New Staff" show={lgShow} onHide={() => setLgShow(false)}>
        <ManagerForm onHide={() => setLgShow(false)} />
      </CustomModal1>
      {/*
      <CustomModal
        heading="Add New Space"
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="new-space-modal new-space-modal"
      >
        
        <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
          {categories !== undefined && Object.keys(categories).length > 0 && categories?.subcategories.map((cat, index) => {
            return <div key={index}>
              <Form.Check
                onChange={() => {
                  setCategory(cat._id);
                }}
                inline
                label={cat.name}
                name={`group-${index}`}
                className="m-0 p-0 centered-tabs"
                type="radio"
                checked={cat._id === category}
                id={`inline-radio-${index}`}
              />
            </div>
          })}
        </div>
        <SpaceForm category={category} onHide={() => setLgShow(false)} />
      </CustomModal> */}
    </div>
  );
}

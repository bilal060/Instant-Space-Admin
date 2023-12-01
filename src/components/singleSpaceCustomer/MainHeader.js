import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import CustomModal from '../../shared/CustomModal';
import SpaceForm from '../allSpaces/SpaceForm';
import '../../assets/css/radio.css';
import { startNewConversation } from '../../store/storeIndex';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MainHeader(props) {
  const [lgShow, setLgShow] = useState(false);

  const [category, setCategory] = useState('Truck');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.user._id);
  const receiverId = useSelector((state) => state.space?.singleSpace?.userId?._id);
  const token = useSelector((state) => state.user.token);

  const startConversationHandler = () => {
    const data = {
      senderId: userId,
      receiverId: receiverId
    };
    dispatch(startNewConversation(data, token, navigate));
  };

  return (
    <div className="main my-3">
      <div className="content-head d-flex justify-content-between align-items-center">
        <div className={`heading text-18 ${props.class}`}>
          {props.heading}
          <span className="text-danger fst-italic">{props.highlight}</span>
        </div>
        <Button onClick={startConversationHandler} className="custom-button-font btn btn-blue">
          Chat Now
        </Button>
      </div>

      <CustomModal heading="Add New Space" show={lgShow} onHide={() => setLgShow(false)}>
        <div className="d-flex justify-content-between button align-items-center w-autto">
          <div>
            <Form.Check
              checked={category === 'Truck'}
              onClick={() => {
                setCategory('Truck');
              }}
              inline
              label="Truck Parking"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
            />
          </div>
          <div>
            <Form.Check
              checked={category === 'Car'}
              onClick={() => {
                setCategory('Car');
              }}
              inline
              label="Car Parking"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
            />
          </div>
          <div>
            <Form.Check
              checked={category === 'Ware'}
              onClick={() => {
                setCategory('Ware');
              }}
              inline
              label="Warehouse"
              name="group1"
              type="radio"
              id={`inline-radio-3`}
            />
          </div>
          <div>
            <Form.Check
              checked={category === 'Temporary'}
              onClick={() => {
                setCategory('Temporary');
              }}
              inline
              label="Temporary Storage"
              name="group1"
              type="radio"
              id={`inline-radio-4`}
            />
          </div>
          <div>
            <Form.Check
              checked={category === 'Container'}
              onClick={() => {
                setCategory('Container');
              }}
              inline
              label="Container Storage"
              name="group1"
              type="radio"
              id={`inline-radio-5`}
            />
          </div>
        </div>
        <SpaceForm />
      </CustomModal>
    </div>
  );
}

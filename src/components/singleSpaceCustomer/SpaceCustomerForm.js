/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Col, Image, Row, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextField from '../../shared/TextField';
import { useSelector, useDispatch } from 'react-redux';
import ClockIcon from '../../assets/images/icons/clock.svg';
import company from '../../assets/images/icons/Truckformicon/circle.svg';
import axor from '../../assets/images/icons/Truckformicon/axor2.svg';
import truckicon from '../../assets/images/icons/Truckformicon/truck.svg';
import cci from '../../assets/images/icons/Truckformicon/cci2.svg';
import profileCard from '../../assets/images/icons/Truckformicon/card-profile2.svg';
import visacard from '../../assets/images/icons/CardIcons/visacard.svg';
import mastercard from '../../assets/images/icons/CardIcons/mastercard.svg';
import '../../assets/css/login-form.css';
import cardicon from '../../assets/images/icons/CardIcons/card-icon.svg';
import Toast from '../../shared/Toast';
import { createBooking } from '../../store/storeIndex';
import PaymentForm from '../payment/PaymentForm';

const SpaceCustomerForm = ({ onHide, slots }) => {
  const dispatch = useDispatch();

  const userCards = useSelector((state) => state.user.cards);
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);
  const singleSpace = useSelector((state) => state.space.singleSpace);
  const spaceId = useSelector((state) => state.space.singleSpace._id);
  const spacePrice = useSelector((state) => state.space.singleSpace.rate_hour);

  const [selectedCard, setSelectedCard] = useState(userCards.length > 0 ? userCards[0].id : '');
  const [cardAlert, setCardAlert] = useState(false);

  const validValues = {
    company: '',
    model: '',
    truckType: '',
    regNo: '',
    licNo: ''
  };

  const errorSchema = Yup.object().shape({
    company: Yup.string().required('Company is required'),
    model: Yup.string().required('Model is required'),
    truckType: Yup.string().required('Type is required'),
    regNo: Yup.string().required('Registration no is required'),
    licNo: Yup.string().required('License no is required'),
    from: Yup.string().required('Starting Date is required'),
    to: Yup.string().required('Ending Date is required')
  });

  const loginHandler = (values) => {
    if (!selectedCard) {
      return Toast.error('Card is required');
    }
    const data = {
      userId,
      spaceId,
      subcategoryId: singleSpace.subCategoryId,
      from: values.from,
      to: values.to,
      price: spacePrice,
      card: selectedCard,
      details: {
        company: values.company,
        model: values.model,
        type: values.truckType,
        regNo: values.regNo,
        license: values.licNo
      }
    };
    dispatch(createBooking(data, token, onHide));
  };
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  return (
    <div className="form-space px-0">
      <div>
        {cardAlert || userCards.length > 0 ? (
          <Formik
            initialValues={validValues}
            validationSchema={errorSchema}
            onSubmit={loginHandler}>
            {(formik) => (
              <Form>
                <>
                  <Col>
                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={company}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Enter Company"
                      name="company"
                      type="text"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={axor}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Enter Truck Model"
                      name="model"
                      type="text"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={truckicon}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Add Truck Type"
                      name="truckType"
                      type="text"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={cci}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Registration No."
                      name="regNo"
                      type="text"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={profileCard}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Driving License No."
                      name="licNo"
                      type="text"
                    />
                  </Col>
                  <Col>
                    <div className="mb-4">
                      <Row>
                        <Col>
                          <TextField
                            margin="mb-4"
                            icon={
                              <Image
                                fluid
                                className="field-icon"
                                src={ClockIcon}
                                loading="lazy"
                                width={20}
                                height={20}
                              />
                            }
                            placeholder="From"
                            name="from"
                            type="text"
                            onFocus={(e) => (e.target.type = 'datetime-local')}
                          />
                        </Col>
                        <Col>
                          <TextField
                            margin="mb-4"
                            icon={
                              <Image
                                fluid
                                className="field-icon"
                                src={ClockIcon}
                                loading="lazy"
                                width={20}
                                height={20}
                              />
                            }
                            placeholder="To"
                            name="to"
                            type="text"
                            onFocus={(e) => (e.target.type = 'datetime-local')}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  <Row className="justify-content-start gap-sm-0 gap-3">
                    {userCards.length > 0 &&
                      userCards.map((card, index) => {
                        return (
                          <Col key={index} md="4" sm="4" className="selection">
                            <div
                              className={`rounded-2 bg-cards pt-1 ps-2 pe-2 ${
                                selectedCard === card.id ? 'selected' : ''
                              }`}
                              onClick={() => handleCardClick(card.id)}>
                              <Image src={card.brand === 'Visa' ? visacard : mastercard} />
                              <span className="text-14 text-color ps-2">{card.brand}</span>
                              <p className="font-14-100 pt-2 pb-2">{`Ending in ${card.last4}`}</p>
                              <input
                                type="radio"
                                className="card-radio"
                                value="visa"
                                checked={selectedCard === 'visa'}
                                onChange={() => handleCardClick(card.id)}
                                hidden
                              />
                            </div>
                          </Col>
                        );
                      })}
                    <Col md="4" sm="4">
                      <Button
                        className="btn-orange-outline w-100"
                        onClick={() => setCardAlert(!cardAlert)}>
                        + Add Card
                      </Button>
                    </Col>
                  </Row>
                  <Row className="justify-content-end mt-5 gap-sm-0 gap-3">
                    <Col md="6" sm="4">
                      <Button onClick={onHide} className="btn-orange-outline w-100">
                        Cancel
                      </Button>
                    </Col>
                    <Col md="6" sm="4">
                      <Button type="submit" className="btn-blue w-100">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <div className="d-flex align-items-center ps-3">
              <Image src={cardicon} className="mr-2" />
              <p className="fw-bold ps-2 mt-3">Paying with card to proceed</p>
              {cardAlert && (
                <Alert variant="success" className="ms-3">
                  Add card from booking
                </Alert>
              )}
            </div>
            <PaymentForm onHide={() => setCardAlert(true)} />
          </>
        )}
      </div>
    </div>
  );
};

export default SpaceCustomerForm;

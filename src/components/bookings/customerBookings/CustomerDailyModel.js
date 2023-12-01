import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Image, Button } from 'react-bootstrap';
import TextField from '../../../shared/TextField.js';
import SelectField from '../../../shared/SelectField.js';
import { useDispatch, useSelector } from 'react-redux';
import OwnerIcon from '../../../assets/images/icons/owner.svg';
import DatePicker from 'react-multi-date-picker';
import visacard from '../../../assets/images/icons/CardIcons/visacard.svg';
import mastercard from '../../../assets/images/icons/CardIcons/mastercard.svg';
import Toast from '../../../shared/Toast.js';
import { createBooking } from '../../../store/storeIndex.js';
import { deleteUserCard } from '../../../store/user/actions/actionCreators.js';
import { MdDeleteForever } from 'react-icons/md';
import WarehouseBookingDetail from './warehouseBookingDetail.js';
import AreaIcon from '../../../assets/images/icons/area.svg';

const CustomerDailyModel = ({ setLgShow, setCardAlert, singleSpace }) => {
  const dispatch = useDispatch();
  const userCards = useSelector((state) => state.user.cards);
  const [selectedCard, setSelectedCard] = useState(userCards.length > 0 ? userCards[0].id : '');
  const token = useSelector((state) => state.user.token);
  const [dayValue, setDayValue] = useState();
  const [fields, setFields] = useState([{ id: 1, value: '', error: false }]);
  const userId = useSelector((state) => state.user.user._id);

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };
  const onHide = () => {
    setLgShow(false);
  };
  const validValues = {
    ChooseMaker: '',
    RegistrationNumber: '',
    selectYear: '',
    selectModel: ''
  };

  const errorSchema = Yup.object().shape({
    ChooseMaker: Yup.string().required('Maker is required'),
    selectModel: Yup.string().required('Model is required'),
    selectYear: Yup.string().required(' Year is required'),
    RegistrationNumber: Yup.number().required(' RegistrationNumber is required')
  });

  const initialWarehouseValues = {
    requiredSpace: ''
  };

  const warehouseErrorSchema = Yup.object().shape({
    requiredSpace: Yup.string().required('Space is required')
  });

  const spaces = useSelector((state) => state.space.all);
  const formatedBranches =
    Object.keys(spaces).length > 0
      ? spaces.spaces.map((space) => {
          return { value: space.name, option: space.name };
        })
      : [];
  const formatedYear =
    Object.keys(spaces).length > 0
      ? spaces.spaces.map((space) => {
          const date = new Date(space.createdAt);
          const year = date.getFullYear();
          return { value: space.year, option: year };
        })
      : [];

  const getDatesArray = (dateRange) => {
    if (dateRange.length > 1) {
      const timestamp1 = dateRange[0];
      const timestamp2 = dateRange[1];
      const date1 = new Date(timestamp1);
      const date2 = new Date(timestamp2);
      const formattedDate1 = date1.toISOString();
      const formattedDate2 = date2.toISOString();

      return {
        startDate: formattedDate1,
        endDate: formattedDate2
      };
    } else {
      const timestamp1 = dateRange[0];
      const date1 = new Date(timestamp1);
      const formattedDate1 = date1.toISOString();

      return {
        startDate: formattedDate1,
        endDate: formattedDate1
      };
    }
  };
  // from: `${dayValue}T${startHourValue}`,
  // to: `${dayValue}T${endHourValue}`,
  const loginHandler = (values) => {
    if (!selectedCard) {
      return Toast.error('Card is required');
    }
    const dates = getDatesArray(dayValue);
    if (singleSpace?.categoryId?.subcategories[0].name === 'Truck Parking') {
      const data = {
        userId: userId.toString(),
        startDate: dates.startDate,
        from: dates.startDate,
        to: dates.endDate,
        chooseMaker: `${String(values.ChooseMaker)}`,
        model: `${String(values.selectModel)}`,
        year: `${String(values.selectYear)}`,
        regNo: `${String(values.RegistrationNumber)}`,
        card: `${String(selectedCard)}`,
        bookingAreaType: 'space',
        durationType: 'daily',
        serviceId: singleSpace._id
      };
      dispatch(createBooking(data, token, onHide));
    } else {
      const data = {
        userId: userId.toString(),
        startDate: dates.startDate,
        from: dates.startDate,
        to: dates.endDate,
        requiredSpace: `${String(values.requiredSpace)}`,
        card: `${String(selectedCard)}`,
        bookingAreaType: 'space',
        durationType: 'daily',
        serviceId: singleSpace._id,
        items: fields.map((field) => field.value)
      };
      dispatch(createBooking(data, token, onHide));
    }
  };
  const DeleteCard = (cardId) => {
    const data = {
      card: cardId
    };
    dispatch(deleteUserCard(data, token));
  };
  return (
    <>
      <Formik
        initialValues={
          singleSpace?.categoryId?.subcategories[0].name === 'Truck Parking'
            ? validValues
            : initialWarehouseValues
        }
        validationSchema={
          singleSpace?.categoryId?.subcategories[0].name === 'Truck Parking'
            ? errorSchema
            : warehouseErrorSchema
        }
        onSubmit={loginHandler}>
        {() => (
          <Form className="w-100">
            <Row className="mx-0">
              <Col className="p-0">
                <div className="mb-4 mt-2">
                  <DatePicker
                    value={dayValue}
                    onChange={setDayValue}
                    inputClass="calendar-input h-56px w-100"
                    placeholder="Select Day"
                    minDate={new Date()}
                    format="YYYY-MM-DD"
                    range
                    dateSeparator=" to "
                  />
                </div>
                {singleSpace?.categoryId?.subcategories[0].name === 'Truck Parking' ? (
                  <>
                    <div className="mb-4">
                      <TextField
                        icon={
                          <Image
                            fluid
                            className="field-icon"
                            src={OwnerIcon}
                            loading="lazy"
                            width={20}
                            height={20}
                          />
                        }
                        placeholder="ChooseMaker"
                        name="ChooseMaker"
                      />
                    </div>
                    <div className="mb-4">
                      <Row>
                        <Col>
                          <SelectField
                            icon={
                              <Image
                                fluid
                                className="field-icon"
                                src={OwnerIcon}
                                loading="lazy"
                                width={20}
                                height={20}
                              />
                            }
                            placeholder="selectModel"
                            name="selectModel"
                            defaulText="Select Model"
                            choices={formatedBranches}
                          />
                        </Col>
                        <Col>
                          <SelectField
                            icon={
                              <Image
                                fluid
                                className="field-icon"
                                src={OwnerIcon}
                                loading="lazy"
                                width={20}
                                height={20}
                              />
                            }
                            placeholder="selectYear"
                            name="selectYear"
                            defaulText="Select Year"
                            choices={formatedYear}
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="mb-4">
                      <TextField
                        icon={
                          <Image
                            fluid
                            className="field-icon"
                            src={OwnerIcon}
                            loading="lazy"
                            width={20}
                            height={20}
                          />
                        }
                        placeholder="Enter Registration Number"
                        name="RegistrationNumber"
                        type="number"
                      />
                    </div>
                  </>
                ) : (
                  <WarehouseBookingDetail
                    AreaIcon={AreaIcon}
                    fields={fields}
                    setFields={setFields}
                  />
                )}
              </Col>
            </Row>
            <Row className="justify-content-start gap-sm-0 gap-3">
              {userCards.length > 0 &&
                userCards.map((card, index) => {
                  return (
                    <Col key={index} md="4" sm="4" className="selection">
                      <div
                        className={`rounded-2 bg-cards pt-1 ps-2 pe-2 position-relative ${
                          selectedCard === card.id ? 'selected' : ''
                        }`}
                        onClick={() => handleCardClick(card.id)}>
                        <Image src={card.brand === 'Visa' ? visacard : mastercard} />
                        <span className="text-14 text-color ps-2">{card.brand}</span>
                        <p className="font-14-100 pt-2 pb-2">{`Ending in ${card.last4}`}</p>
                        <span
                          className="position-absolute end-0 top-0"
                          onClick={() => DeleteCard(card.id)}>
                          <MdDeleteForever />
                        </span>
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
                <Button className="btn-orange-outline w-100" onClick={() => setCardAlert(true)}>
                  + Add Card
                </Button>
              </Col>
            </Row>

            <Row className="justify-content-end mt-3 mb-2 gap-sm-0 gap-3">
              <Col md="6" sm="4">
                <Button
                  className="px-2 py-2 rounded btn-orange-outline bg-lightBlue w-100"
                  onClick={() => setLgShow(false)}>
                  Cancel
                </Button>
              </Col>
              <Col md="6" sm="4">
                <Button
                  type="submit"
                  className="px-2 py-2 rounded btn-blue w-100"
                  disabled={!dayValue}>
                  Book Now
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CustomerDailyModel;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import '../../assets/css/space-customer.css';
import { Alert, Button, Col, Row, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import phone from '../../assets/images/icons/CardIcons/phone.svg';
import location from '../../assets/images/icons/CardIcons/location.svg';
import space from '../../assets/images/icons/CardIcons/space.svg';
import dollar from '../../assets/images/icons/CardIcons/dollar.svg';
import customerUser from '../../assets/images/customerUser.svg';
import customerMail from '../../assets/images/customerMail.svg';
import Rating from '../../assets/images/icons/CardIcons/singlerating.svg';
import CustomModal1 from '../../shared/CustomModal1';
import '../../assets/css/home.css';
import ImageGallery from 'react-image-gallery';
import PlaceholderImg from '../../assets/images/placeholder.png';
import { getUserCards } from '../../store/storeIndex';
import '../../assets/css/table.css';
import BookingIconHourly from '../../assets/images/icons/BookingIconHourly';
import BookingIconDaily from '../../assets/images/icons/BookingIconDaily';
import BookingIconMonthly from '../../assets/images/icons/BookingIconMonthly';
import DurationRadios from '../bookings/customerBookings/DurationRadios';
import CustomerHourlyModel from '../bookings/customerBookings/CustomerHourlyModel';
import CustomerDailyModel from '../bookings/customerBookings/CustomerDailyModel';
import CustomerMonthlyModel from '../bookings/customerBookings/CustomerMonthlyModel';
import PaymentForm from '../payment/PaymentForm';
import cardicon from '../../assets/images/icons/CardIcons/card-icon.svg';

const MainCardCompnent = (props) => {
  const dispatch = useDispatch();
  const [categoryradio, setCategoryradio] = useState('Hourly');
  const radio = [
    {
      id: '1',
      imgSrc: <BookingIconHourly />,
      text: 'Hourly'
    },
    {
      id: '2',
      imgSrc: <BookingIconDaily />,
      text: 'Daily'
    },
    {
      id: '3',
      imgSrc: <BookingIconMonthly />,
      text: 'Monthly'
    }
  ];

  const singleSpace = useSelector((state) => state.space.singleSpace);
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);
  const userCards = useSelector((state) => state.user.cards);
  const [cardAlert, setCardAlert] = useState(false);

  const images =
    Object.keys(singleSpace).length > 0
      ? singleSpace?.images.map((img) => {
          return {
            original: `${process.env.REACT_APP_SERVER_URL}${img}`,
            thumbnail: `${process.env.REACT_APP_SERVER_URL}${img}`
          };
        })
      : [
          {
            original: PlaceholderImg,
            thumbnail: PlaceholderImg
          }
        ];

  const [lgShow, setLgShow] = useState(false);

  const showReservationHandler = () => {
    setLgShow(true);
  };
  useEffect(() => {
    dispatch(getUserCards(userId, token));
  }, [userId, token, dispatch]);

  useEffect(() => {
    if (userCards.length > 0) {
      setCardAlert(false);
    }
    return;
  }, []);

  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <Row className="bg-white py-4 px-3 radius-10">
        <Col sm="12" xl="5" className="mt-2 mb-xl-0 mb-4">
          <ImageGallery
            items={images}
            lazyLoad
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay
          />
        </Col>
        <Col sm="12" xl="7">
          <div className="main my-3">
            <div className="content-head d-flex justify-content-between align-items-center card-container">
              <div className={`heading text-36 text-20-r ${props.class}`}>
                {singleSpace?.name}
                <span className="text-primary fst-italic">{props.highlight}</span>
              </div>
              <div className="text-black text-20 d-flex align-items-center">
                <Image src={Rating} className="pe-3" />
                <span className="text-20 pt-1">5.0</span>
              </div>
            </div>
          </div>

          <div className="ps-1 pe-2">
            <Row>
              <Col sm="6" className="pe-0">
                <div className="phone pt-3 grey text-20">
                  <Image alt="gallery" src={phone} className=" pe-1 custom-icon" />
                  <span className="ps-2 pe-2">{singleSpace?.contact}</span>
                </div>
              </Col>
              <Col className="pe-0">
                <div className="capacity pt-3 grey text-20">
                  <Image alt="gallery" src={dollar} className=" pe-1 custom-icon" />
                  <span className="ps-2 pe-2">Rate:</span>
                  <span className="text-black text-20 fw-bold">{`$${singleSpace?.rate_month}`}</span>
                </div>
              </Col>
            </Row>
            <Row className="pt-3 align-items-center">
              <Col sm="6" className="pe-0 mb-sm-0 mb-3">
                <div className="type grey text-20 ">
                  <Image alt="gallery" src={space} className="pe-1 custom-icon" />
                  <span className="ps-2 pe-2">Type:</span>
                  <span className="text-black text-20 fw-bold">
                    {singleSpace?.categoryId?.subcategories[0].name}
                  </span>
                </div>
              </Col>
              {/* <Col sm="6" className="pe-0 custom-margin">
                <div className="d-flex flex-wrap">
                  <label className="pe-2 custom-label-font fw-bolder">All Facilities:</label>
                  <div className="d-flex">
                    <Image alt="gallery" src={props.icon1} className=" pe-3" />
                    <Image alt="gallery" src={props.icon2} className=" pe-3" />
                    <Image alt="gallery" src={props.icon3} className=" pe-3" />
                    <Image alt="gallery" src={props.icon4} className=" pe-3" />
                  </div>
                </div>
              </Col> */}
            </Row>
            {Object.keys(singleSpace).length > 0 && (
              <div className="address pt-3 grey text-20 d-flex align-items-center">
                <Image alt="gallery" src={location} className=" pe-1  custom-icon" />
                <span className="ps-2 pe-2">
                  {singleSpace.address && singleSpace.address.length > 50
                    ? showMore
                      ? singleSpace.address
                      : `${singleSpace.address.substring(0, 50)}`
                    : singleSpace.address}
                  {/* {singleSpace?} */}
                </span>
                {singleSpace.address && singleSpace.address.length > 50 && (
                  <button onClick={() => setShowMore(!showMore)} className="show-more-button ">
                    {showMore ? 'See less' : 'See more'}
                  </button>
                )}
              </div>
            )}
            <div className="pt-3">
              <div className="footer justify-content-between pe-2">
                <Button
                  className="px-2 py-2 rounded btn-blue btn btn-primary px-4 h-40px"
                  onClick={showReservationHandler}>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <Row>
            <div className="heading ">Contact Details</div>
            <Col className="pe-0">
              <div className="capacity pt-3 grey text-20 text-truncate">
                <Image alt="gallery" src={customerUser} className=" pe-1 custom-icon" />
                <span className="ps-2 pe-2">{singleSpace?.name}</span>
              </div>
            </Col>
            <Col sm="6" className="pe-0">
              <div className="phone pt-3 grey text-20 text-truncate">
                <Image alt="gallery" src={phone} className=" pe-1 custom-icon" />
                <span className="ps-2 pe-2">{singleSpace?.contact}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="pe-0">
              <div className="capacity pt-3 grey text-20 text-truncate">
                <Image alt="gallery" src={customerMail} className=" pe-1 custom-icon" />
                <span className="ps-2">{singleSpace?.email}</span>
              </div>
            </Col>
            {/* <Col sm="6" className="pe-0">
              <div className="phone pt-3 grey text-20 text-truncate">
                <Image alt="gallery" src={location} className=" pe-1 custom-icon" />
                <span className="ps-2 pe-2">{singleSpace?.address}</span>
              </div>
            </Col> */}
          </Row>
          {/* {Object.keys(singleSpace).length > 0 && singleSpace.managers.length > 0 && (
            <div className="main my-4">
              <div className="content-head d-flex justify-content-between align-items-center">
                <div className={`heading text-24 ${props.class}`}>
                  Managers
                  <span className="text-primary fst-italic">{props.highlight}</span>
                </div>
              </div>
            </div>
          )} */}
          {/* <div className="bg-white rounded">
            <Table responsive hover className="" striped>
              <tbody>
                {Object.keys(singleSpace).length > 0 &&
                  singleSpace.managers.length > 0 &&
                  singleSpace.managers.map((item, index) => (
                    <tr key={index} className="">
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`}
                            width={50}
                          />
                          <p className="p-0 ms-1 mt-3">{item.fullName}</p>
                        </div>
                      </td>
                      <td>{item.phoneNo}</td>
                      <td>{`${item.slot.from} - ${item.slot.to}`}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div> */}
        </Col>
      </Row>
      <CustomModal1
        onHide={() => setLgShow(false)}
        heading="Booking Reservation"
        show={lgShow}
        className="new-space-modal">
        {userCards.length > 0 && cardAlert === false ? (
          <>
            <h4 className="text-18 text-black fw-bold mb-4 pb-2">Select Duration</h4>

            <div className="mb-3 d-flex gap-3 justify-content-between ">
              {radio.map((data, index) => {
                return (
                  <DurationRadios
                    key={index}
                    data={data}
                    category={categoryradio}
                    setCategory={setCategoryradio}
                    className="bg-danger bg-space"
                  />
                );
              })}
            </div>
            {categoryradio === 'Hourly' ? (
              <CustomerHourlyModel
                setLgShow={setLgShow}
                setCardAlert={setCardAlert}
                cardAlert={cardAlert}
                singleSpace={singleSpace}
              />
            ) : categoryradio === 'Daily' ? (
              <CustomerDailyModel
                setLgShow={setLgShow}
                setCardAlert={setCardAlert}
                singleSpace={singleSpace}
                cardAlert={cardAlert}
              />
            ) : categoryradio === 'Monthly' ? (
              <CustomerMonthlyModel
                setLgShow={setLgShow}
                setCardAlert={setCardAlert}
                singleSpace={singleSpace}
                cardAlert={cardAlert}
              />
            ) : null}
          </>
        ) : (
          <>
            <div className="d-flex align-items-center ps-3">
              <Image src={cardicon} className="mr-2" />
              <p className="fw-bold ps-2 mt-3">Paying with card to proceed</p>
            </div>
            <PaymentForm onHide={() => setCardAlert(false)} />
          </>
        )}
      </CustomModal1>
    </>
  );
};

export { MainCardCompnent };

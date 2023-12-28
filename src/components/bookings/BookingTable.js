import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Col, Dropdown, Image, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { PaginationControl } from 'react-bootstrap-pagination-control';
import '../../assets/css/table.css';
import Slider from 'react-slick';
import LogoImg from '../../assets/images/logowhite.svg';
import emptyBooking from '../../assets/images/emptyBookingImage.svg';

import threeDots from '../../assets/images/icons/threeDots.svg';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { DeleteBooking, getAllBookings } from '../../store/booking/actions/actionCreators';
import ImageDisplay from '../../shared/Image';

// import UserImage from '../../assets/images/icons/table.svg';

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dotsClass: 'slick-dots slick-dots-custom'
};

function BookingTable({ filterState, dayValue, page, setPage }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const bookings = useSelector((state) => state.booking.bookings);
  // const allUserBookings = useSelector((state) => state.booking);

  const userRole = useSelector((state) => state.user.user.role);

  const [show, setShow] = useState(false);
  const [deletebookingId, setDeletebookingId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteBookingHandler = (id) => {
    setDeletebookingId(id);
    handleShow();
  };

  const AcceptBooking = (id) => {
    const data = {
      status: 'approved'
    };
    dispatch(
      DeleteBooking(id, token, data, handleClose, userId, page, userRole, filterState, dayValue)
    );
  };

  // const pageHandler = (page) => {
  //   setPage(page);
  //   dispatch(getAllBookings(userId, token, userRole, page, filterState, dayValue));
  // };
  const pageHandler = (page) => {
    setPage(page);
    if (userRole === 'Manager') {
      dispatch(getAllBookings(userId, token, userRole, page, filterState, dayValue));
    } else if (userRole === 'Storage Owner') {
      dispatch(getAllBookings(userId, token, userRole, page, filterState, dayValue));
    } else {
      dispatch(getAllBookings(userId, token, userRole, page, filterState, dayValue));
    }
  };

  const initialValues = {
    notes: ''
  };
  const newPasswordValidationSchema = Yup.object().shape({
    notes: Yup.string().required('This Field is Required')
  });
  const submitHandler = (values) => {
    const data = {
      notes: values.notes,
      status: 'rejected'
    };
    dispatch(
      DeleteBooking(
        deletebookingId,
        token,
        data,
        handleClose,
        userId,
        page,
        userRole,
        filterState,
        dayValue
      )
    );
  };

  return (
    <div className="bg-white rounded custom-table">
      {Object.keys(bookings)?.length > 0 && bookings.bookings?.length > 0 ? (
        <Table responsive hover striped className="m-0 min-w-850px">
          <thead>
            <tr>
              <th>Customer Full Name</th>
              <th>Branch Location</th>
              <th>Contact Info</th>
              <th>From</th>
              <th>To</th>
              <th>Space Type</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(bookings).length > 0 &&
              bookings.bookings.length > 0 &&
              bookings.bookings.map((item, index) => {
                const fromDate = new Date(item.from);
                const toDate = new Date(item.to);

                const options = {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                };
                const formattedFromDate = fromDate.toLocaleString('en-US', options);
                const formattedToDate = toDate.toLocaleString('en-US', options);
                return (
                  <tr key={index} className="pt-3">
                    <td>
                      <div className="d-flex align-items-center w-25 h-25">
                        <ImageDisplay
                          src={`${process.env.REACT_APP_SERVER_URL}${item?.userId?.photo}`}
                          alt="user-image"
                          loading="lazy"
                          style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                        />
                        <p className="ps-3 p-0 m-0 tb-data">{item.userId.fullName}</p>
                      </div>
                    </td>
                    <td>
                      <p style={{ maxWidth: '210px', margin: '0' }}>{item.serviceId.address}</p>
                    </td>
                    <td>
                      <p className="m-0">{item.serviceId.contact}</p>
                    </td>
                    <td>
                      <p style={{ maxWidth: '120px', margin: '0' }}>{formattedFromDate}</p>
                    </td>
                    <td>
                      <p style={{ maxWidth: '120px', margin: '0' }}>{formattedToDate}</p>
                    </td>
                    <td>
                      <p>{item.category}</p>
                    </td>
                    <td>
                      <p>${item.price}</p>
                    </td>
                    <td>
                      <Button
                        className={`custom-status ${
                          item.status === 'rejected'
                            ? 'bg-lightRed'
                            : item.status === 'pending'
                              ? 'bg-lightYellow'
                              : 'bg-lightgreen'
                        } unpaid rounded fw-bold text-capitalize`}
                        variant={`${
                          item.status === 'rejected'
                            ? 'outline-danger'
                            : item.status === 'pending'
                              ? 'outline-warning'
                              : 'outline-success'
                        } `}>
                        {item.status}
                      </Button>
                    </td>

                    <td className=" >!py-5 text-end">
                      {item.status === 'pending' && (
                        <div className="threeDots-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="border-0">
                              <Image alt="gallery" src={threeDots} className=" pe-2" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => AcceptBooking(item._id)}>
                                Approve
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => deleteBookingHandler(item._id)}>
                                Reject
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <div className="NewSpace p-0">
          <div className="NewSpace p-4 promotional-banner rounded-top">
            <Slider {...settings}>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3>Lorem ipsum dolor sit amet consecr.</h3>
                  <p className="font-weight-400">
                    Ipsum has been the industry&apos;s standard dummy text ever since the 1500s
                  </p>
                </div>
                <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
              </div>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3>Lorem ipsum dolor sit amet consecr.</h3>
                  <p className="font-weight-400">
                    Ipsum has been the industry&apos;s standard dummy text ever since the 1500s
                  </p>
                </div>
                <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
              </div>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3>Lorem ipsum dolor sit amet consecr.</h3>
                  <p className="font-weight-400">
                    Ipsum has been the industry&apos;s standard dummy text ever since the 1500s
                  </p>
                </div>
                <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
              </div>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h3>Lorem ipsum dolor sit amet consecr.</h3>
                  <p className="font-weight-400">
                    Ipsum has been the industry&apos;s standard dummy text ever since the 1500s
                  </p>
                </div>
                <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
              </div>
            </Slider>
          </div>
          <div className="d-flex justify-content-center align-items-center py-4 w-100 flex-column">
            <Image src={emptyBooking} />
            <p className="mb-3 auth-special font-weight-700 font-24">opps!</p>
            <p className="mb-5 font-24 font-weight-500 text-center">
              You don’t have any Booking Yet
            </p>
          </div>
        </div>
      )}

      {bookings.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={bookings.totalRecords}
          limit={bookings.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={2}
        />
      ) : (
        ''
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="fw-bold">Reject Booking Request</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={newPasswordValidationSchema}
            onSubmit={submitHandler}>
            {({ touched, errors }) => (
              <Form action="" className="text-light-black">
                <div className="d-flex flex-column pb-4">
                  <Field
                    className={`form-control input-textarea-style h-fit-content w-100 p-3 text-area
                                              ${touched.notes && errors.notes ? 'is-invalid' : ''}`}
                    as="textarea"
                    rows="5"
                    name="notes"
                    placeholder="Type your reason"
                  />
                  <ErrorMessage component="div" name="notes" className="invalid-feedback" />
                </div>
                <Row className="justify-content-end mt-5 gap-sm-0 gap-3">
                  <Col xxl="3" md="4" sm="5">
                    <Button
                      type="button"
                      className="btn-orange-outline w-100"
                      onClick={handleClose}>
                      Cancel
                    </Button>
                  </Col>
                  <Col xxl="3" md="4" sm="5">
                    <Button type="submit" className="btn-blue w-100">
                      Confirm
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookingTable;

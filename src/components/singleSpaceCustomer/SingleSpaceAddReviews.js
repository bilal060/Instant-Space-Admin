import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button } from 'react-bootstrap';
import TextField from '../../shared/TextField.js';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/space/actions/actonCreators.js';
import Rating from 'react-rating';
import ImageDisplay from '../messages/Image.js';
import ratingEmpty from '../../assets/images/icons/ratingEmpty.svg';
import ratingFull from '../../assets/images/icons/ratingFull.svg';
import Toast from '../../shared/Toast.js';

const SingleSpaceAddReviews = ({ singleSpaceId, setLgShow }) => {
  const token = useSelector((state) => state.user.token);
  const [rating, setRating] = useState();
  const dispatch = useDispatch();

  const validValues = {
    description: ''
  };

  const errorSchema = Yup.object().shape({
    description: Yup.string().required('This field is required')
  });

  const ratingHandler = (rating) => {
    setRating(rating);
  };

  const onHide = () => {
    setLgShow(false);
  };
  const submitHandler = (values) => {
    if (rating) {
      const data = {
        spaceId: singleSpaceId,
        review: values.description,
        rating: rating
      };
      dispatch(createReview(data, token, onHide));
    } else {
      return Toast.error('Rating is required');
    }
  };

  return (
    <>
      <Formik initialValues={validValues} validationSchema={errorSchema} onSubmit={submitHandler}>
        {() => (
          <Form>
            <Row>
              <Col>
                <p className="font-weight-600 mb-2">Type your review here..</p>
                <TextField name="description" as="textarea" />
                {/* <SingleSpaceRating /> */}
                <p className="font-weight-600 mb-2 mt-4">Add Rating</p>
                <Rating
                  start={0}
                  stop={5}
                  step={1}
                  direction="ltr"
                  readonly={false}
                  initialRating={rating}
                  emptySymbol={<ImageDisplay src={ratingEmpty} alt="" className="me-2" />}
                  fullSymbol={<ImageDisplay src={ratingFull} alt="" className="me-2" />}
                  onChange={ratingHandler}
                />
              </Col>
            </Row>

            <Row className="justify-content-end mt-3 mb-2 gap-sm-0 gap-3 mt-5">
              <Col md="6" sm="4">
                <Button className="px-2 py-2 rounded btn-orange-outline bg-lightBlue w-100">
                  Cancel
                </Button>
              </Col>
              <Col md="6" sm="4">
                <Button type="submit" className="px-2 py-2 rounded btn-blue w-100">
                  ADD
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SingleSpaceAddReviews;

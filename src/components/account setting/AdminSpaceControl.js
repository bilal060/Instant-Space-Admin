/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Image, Row } from 'react-bootstrap';
import TextField from '../../shared/TextField';
import DollarIcon from '../../assets/images/icons/DollerIcon.svg';
import RadiusIcon from '../../assets/images/icons/area.svg';

import { useDispatch, useSelector } from 'react-redux';
import { getUserSetting, updateUserSetting } from '../../store/storeIndex';

const ChangeAccountPassword = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userDetails = useSelector((state) => state.user.user);
  const controls = useSelector((state) => state.user.usersetting?.result);

  const submitHandler = (values) => {
    const data = {
      radius: values.radius,
      serviceFee: values.serviceFee
    };
    dispatch(updateUserSetting(token, data, userDetails._id));
  };

  const initialValues = {
    radius: controls?.radius,
    serviceFee: controls?.serviceFee
  };

  const errorSchema = Yup.object().shape({
    radius: Yup.number().min(50, 'Minimum Radius should be 50').required('Radius is required'),
    serviceFee: Yup.number().required('Service Fee is required')
  });

  useEffect(() => {
    const type = '';
    dispatch(getUserSetting(token, type));
  }, [dispatch]);

  return (
    <>
      <div>
        <h3 className="font-24 font-weight-800 mb-4 pb-3">Change Controls</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={errorSchema}
          onSubmit={submitHandler}>
          {() => (
            <Form action="" className="text-light-black">
              <Row className="align-items-start mb-4 pb-3">
                <Col lg="6">
                  <div className="d-flex flex-column">
                    <p className="font-16 mb-1 font-weight-700">Set Radius</p>
                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={RadiusIcon}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Radius"
                      name="radius"
                      type="number"
                      min="50"
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="d-flex flex-column">
                    <p className="font-16 mb-1 font-weight-700">Set Service Fee</p>

                    <TextField
                      icon={
                        <Image
                          fluid
                          className="field-icon"
                          src={DollarIcon}
                          loading="lazy"
                          width={20}
                          height={20}
                        />
                      }
                      placeholder="Service Fee"
                      name="serviceFee"
                      type="number"
                      min="0"
                    />
                  </div>
                </Col>
              </Row>
              <Col md="3">
                <Button type="submit" className="btn-blue w-100">
                  Submit
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ChangeAccountPassword;

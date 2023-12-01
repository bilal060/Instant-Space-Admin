import React, { useState, useCallback } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Toast from '../../shared/Toast';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '../../shared/TextField';
import company from '../../assets/images/icons/Truckformicon/circle.svg';
import axor from '../../assets/images/icons/Truckformicon/axor2.svg';
import truckicon from '../../assets/images/icons/Truckformicon/truck.svg';
import cci from '../../assets/images/icons/Truckformicon/cci2.svg';
import profileCard from '../../assets/images/icons/Truckformicon/card-profile2.svg';
import '../../assets/css/login-form.css';
import { useDropzone } from 'react-dropzone';
import UploadImg from '../../assets/images/icons/upload.png';
import { addVehicle } from '../../store/storeIndex';

const TruckForm = ({ onHide }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);

  const [docFiles, setDocFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setDocFiles(acceptedFiles);
  }, []);

  const validValues = {
    company: '',
    model: '',
    truckType: '',
    regNo: '',
    licenseNo: ''
  };

  const errorSchema = Yup.object().shape({
    company: Yup.string().required('Company is required'),
    model: Yup.string().required('Model is required'),
    truckType: Yup.string().required('Truck type is required'),
    regNo: Yup.string().required('Registration no is required'),
    licenseNo: Yup.string().required('License no is required')
  });

  const vehicleHandler = (values) => {
    if (docFiles.length === 0) {
      return Toast.error('Truck images are required');
    }

    const data = new FormData();
    data.append('userId', userId);
    data.append('company', values.company);
    data.append('model', values.model);
    data.append('type', values.truckType);
    data.append('regiterNo', values.regNo);
    data.append('drivingLicenseNo', values.licenseNo);
    docFiles.map((file) => data.append('vehicle_imgs', file));

    dispatch(addVehicle(userId, data, token, onHide));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="form-space px-0">
      <div>
        <Formik
          initialValues={validValues}
          validationSchema={errorSchema}
          onSubmit={vehicleHandler}>
          {() => (
            <Form>
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
                  name="licenseNo"
                  type="text"
                />
              </Col>
              <p className="fw-bold mt-3">Upload Images</p>
              <div className="field-container dotted" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="d-flex align-items-center justify-content-center py-2">
                  <Image fluid className="me-3" src={UploadImg} loading="lazy" />
                  <p className="grey p-0 m-0">Choose File</p>
                </div>
              </div>
              {docFiles.length > 0 ? (
                <div>
                  {docFiles.map((file, index) => {
                    return (
                      <div key={index}>
                        <p className="text-muted">{file.name}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <div>
                    <p className="text-muted">No file selected</p>
                  </div>
                </div>
              )}
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TruckForm;

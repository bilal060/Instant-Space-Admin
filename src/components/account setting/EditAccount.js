import React, { useCallback, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Image, Row } from 'react-bootstrap';
import TextField from '../../shared/TextField';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DobIcon from '../../assets/images/icons/dob.svg';
import RateIcon from '../../assets/images/icons/@.png';
import LanguageIcon from '../../assets/images/LanguageOptionIcon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/storeIndex';
import '../../assets/css/account-settings.css';
import userimage from '../../assets/images/user-image.png';

import SelectField from '../../shared/SelectField';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

export const newPasswordValidationSchema = Yup.object().shape({
  userName: Yup.string().required('Name is Required'),
  email: Yup.string().required('Email is Required'),
  mydate: Yup.string().required('Date is Required'),
  bio: Yup.string().required('Bio is Required')
});

const AccountNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const userDetails = useSelector((state) => state.user.user);
  const [phone, setPhone] = useState(userDetails.phoneNo);

  const initialValues = {
    userName: userDetails.fullName,
    email: userDetails.email,
    mydate: userDetails.dob,
    bio: userDetails.bio,
    language: userDetails.language
  };

  const submitHandler = (values) => {
    const data = new FormData();
    data.append('profile_img', docFiles[0]);
    data.append('email', values.email);
    data.append('phoneNo', phone);
    data.append('fullName', values.userName);
    data.append('dob', values.mydate);
    data.append('bio', values.bio);
    data.append('language', values.language);
    dispatch(updateUserProfile(data, navigate, token));
  };
  const roleValues = [
    {
      option: 'Urdu'
    }
  ];
  const onDrop = useCallback((acceptedFiles) => {
    setDocFiles(acceptedFiles);
  }, []);

  const [docFiles, setDocFiles] = useState([]);

  const { getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div className="d-flex flex-row align-items-center justify-content-start flex-wrap gap-2">
        <div className="py-md-3">
          <div
            className="text-center bg-white border-1 text-white"
            style={{
              width: '100px',
              height: '100px',
              lineHeight: '100px',
              overflow: 'hidden',
              borderRadius: '100%'
            }}>
            <>
              {docFiles.length === 0 ? (
                <Image
                  src={
                    userDetails.photo
                      ? `${process.env.REACT_APP_SERVER_URL}${userDetails.photo}`
                      : userimage
                  }
                  alt="user-image"
                  loading="lazy"
                  className="w-100"
                />
              ) : (
                <Image
                  fluid
                  src={URL.createObjectURL(docFiles[0])}
                  loading="lazy"
                  className="selectedImage w-100"
                />
              )}
            </>
          </div>
        </div>
        <div className="p-md-3 d-flex flex-column gap-1">
          <span className="font-20 font-weight-700 text-capitalize">
            {userDetails.fullName || userDetails.companyName}
          </span>
          <span className="font-16 text-grey cut-text">{userDetails.email}</span>
          <span className="font-16">{userDetails.phoneNo}</span>
        </div>
        <div className="ms-sm-auto height-40px">
          <label
            htmlFor="image"
            className="btn-orange-outline w-100 px-xxl-5 px-xl-4 px-md-5 px-4 height-40px cr-p">
            <input
              {...getInputProps()}
              className="w-100 h-100"
              id="image"
              accept="image/png, image/jpg, image/jpeg"
            />
            Edit Image
          </label>
        </div>
      </div>
      <hr className="hr" />
      <h3 className="font-24 font-sm-18 font-weight-800 my-3">About</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={newPasswordValidationSchema}
        onSubmit={submitHandler}>
        {({ touched, errors }) => (
          <Form action="" className="text-light-black">
            <Row className="align-items-start pb-sm-0 gap-sm-0 gap-3 about-sm">
              <Col sm="6" className="">
                <div className="d-flex flex-column full-name">
                  <Field
                    type="text"
                    className={`input-style
                    ${touched.userName && errors.userName ? 'is-invalid' : ''}`}
                    id="userName"
                    placeholder="Full Name"
                    name="userName"
                    minLength={8}
                    maxLength={12}
                  />
                  <ErrorMessage
                    component="div"
                    name="userName"
                    className="invalid-feedback fw-bold mt-2"
                  />
                </div>
              </Col>
              <Col sm="6" className="m-0">
                <div className="d-flex flex-column full-name  ">
                  <TextField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={RateIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    placeholder="Email"
                    name="email"
                    type="email"
                    readOnly
                    className="mb-0 w-100 border-0 ms-1 "
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="invalid-feedback fw-bold mt-2"
                  />
                </div>
              </Col>
            </Row>
            <Row className="align-items-start pb-sm-0 gap-sm-0 gap-3">
              <Col sm="6">
                <div className="d-flex flex-column">
                  <div className="input-style">
                    <PhoneInput
                      enableAreaCodes={true}
                      placeholder="Mobile"
                      onChange={(phone) => setPhone(phone)}
                      value={phone}
                      className="h-100 w-100 rounded-3"
                      inputClass={`form-control border-0 rounded-3 h-100 w-100 font-18 font-weight-400 ${
                        touched && !phone ? 'is-invalid' : ''
                      }`}
                      buttonClass="border-0 bg-transparent rounded-3"
                      inputProps={{
                        name: 'phone',
                        required: true
                      }}
                    />
                  </div>
                  {touched && errors && !phone && (
                    <p className="invalid-feedback d-block mt-2 fw-bold">Phone is required</p>
                  )}
                </div>
              </Col>
              <Col sm="6" className="m-0">
                <div className="d-flex flex-column full-name  p-0">
                  <TextField
                    icon={
                      <Image
                        fluid
                        className="field-icon"
                        src={DobIcon}
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    }
                    // value=""
                    placeholder="Date of Birth"
                    name="mydate"
                    type="text"
                    onFocus={(e) => (e.target.type = 'date')}
                  />
                </div>
              </Col>
            </Row>
            <div className="d-flex flex-column pb-4">
              <Field
                className={`form-control input-textarea-style h-fit-content w-100 p-3 text-area
                    ${touched.bio && errors.bio ? 'is-invalid' : ''}`}
                as="textarea"
                rows="5"
                name="bio"
                placeholder="Add Your Bio"
              />
              <ErrorMessage component="div" name="bio" className="invalid-feedback" />
            </div>
            <h3 className="font-24 font-sm-18 font-weight-800 mb-3">Language</h3>
            <Col sm="6" className="m-0 p-0">
              <div className="d-flex flex-column full-name  p-0">
                <SelectField
                  icon={
                    <Image
                      fluid
                      className="field-icon"
                      src={LanguageIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  }
                  placeholder="Select Language"
                  name="language"
                  defaulText="English"
                  choices={roleValues}
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback fw-bold mt-2"
                />
              </div>
            </Col>
            <Row className="justify-content-end mt-5 gap-sm-0 gap-3">
              <Col xxl="3" md="4" sm="5">
                <Button type="button" className="btn-orange-outline w-100  ">
                  Cancel
                </Button>
              </Col>
              <Col xxl="3" md="4" sm="5">
                <Button type="submit" className="btn-blue w-100 ">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountNewPassword;

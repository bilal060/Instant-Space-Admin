import React, { useState, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Image } from 'react-bootstrap';
import TextField from '../../shared/TextField';
import SelectField from '../../shared/SelectField';
import PhoneInput from 'react-phone-input-2';
import NameIcon from '../../assets/images/icons/full-name.png';
import DobIcon from '../../assets/images/icons/dob.png';
import gendericon from '../../assets/images/gender.svg';
import UploadImg from '../../assets/images/icons/CardIcons/camera.svg';
import { useDropzone } from 'react-dropzone';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from '../../shared/Toast';
import { updateUserProfile } from '../../store/storeIndex';

const CustomerInfoForm = () => {
  const [selectedGender, setSelectedGender] = useState('');
  console.log(selectedGender);
  const genderOptions = [
    { value: 'Male', option: 'Male' },
    { value: 'Female', option: 'Female' },
    { value: 'Other', option: 'Other' }
  ];
  const [phno, setPhno] = useState('920123456789');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validValues = {
    fullName: '',
    dob: '',
    bio: ''
  };

  const errorSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    dob: Yup.string().required('DOB is required'),
    bio: Yup.string().required('Bio is required')
  });

  const onDrop = useCallback((acceptedFiles) => {
    setDocFiles(acceptedFiles);
  }, []);

  const [docFiles, setDocFiles] = useState([]);

  const { getInputProps } = useDropzone({
    onDrop,
    accept: ['image/png', 'image/jpg', 'image/jpeg']
  });

  const loginHandler = (values) => {
    if (!docFiles.length) {
      return Toast.error('Document files are required');
    }
    if (!phno) {
      return Toast.error('Phone no is required');
    }
    if (!selectedGender) {
      return Toast.error('Gender is required');
    }
    const data = new FormData();
    data.append('profile_img', docFiles[0]);
    data.append('phoneNo', phno);
    data.append('fullName', values.fullName);
    data.append('dob', values.dob);
    data.append('bio', values.bio);
    data.append('gender', selectedGender);
    dispatch(updateUserProfile(data, navigate, true));
  };

  return (
    <>
      <Formik initialValues={validValues} validationSchema={errorSchema} onSubmit={loginHandler}>
        {(formik, touched, errors) => (
          <Form>
            <label
              htmlFor="image"
              className="field-container custom-dotted rounded-circle bg-white custom-bg-class upload-picture"
            >
              <input
                {...getInputProps()}
                id="image"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
              <>
                {docFiles.length === 0 ? (
                  <div className="d-flex flex-column align-items-center justify-content-center py-2 h-100 gap-2">
                    <Image fluid src={UploadImg} loading="lazy" />
                    <p className="grey p-0 m-0">Upload Picture</p>
                  </div>
                ) : (
                  <>
                    <Image
                      fluid
                      src={URL.createObjectURL(docFiles[0])}
                      loading="lazy"
                      className="selectedImage"
                    />
                  </>
                )}
              </>
            </label>
            <TextField
              icon={
                <Image
                  fluid
                  className="field-icon"
                  src={NameIcon}
                  loading="lazy"
                  width={20}
                  height={20}
                />
              }
              placeholder="Full Name"
              name="fullName"
              type="text"
            />

            <div className="d-flex flex-column mb-3">
              <div className="field-container h-56px">
                <PhoneInput
                  enableAreaCodes={true}
                  placeholder="Mobile"
                  onChange={(phno) => setPhno(phno)}
                  value={phno}
                  className="h-100 w-100 rounded-3"
                  inputClass={`form-control border-0 rounded-3 h-100 w-100 font-18 font-weight-400 ${
                    touched && !phno ? 'is-invalid' : ''
                  }`}
                  buttonClass="border-0 bg-transparent rounded-3"
                  inputProps={{
                    name: 'phone',
                    required: true
                  }}
                />
              </div>
              {touched && errors && !phno && (
                <p className="invalid-feedback d-block mt-2 fw-bold">Phone is required</p>
              )}
            </div>
            {formik.touched && !phno && <p className="text-danger fw-bold">Phone is required</p>}
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
              placeholder="Date of Birth"
              name="dob"
              type="text"
              onFocus={(e) => (e.target.type = 'date')}
            />
            <div className="mb-3">
              <SelectField
                icon={
                  <Image
                    fluid
                    className="field-icon"
                    src={gendericon}
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                }
                placeholder="Select Gender"
                name="gender"
                defaulText="Select Gender"
                choices={genderOptions}
                onChange={(value) => setSelectedGender(value)}
              />
            </div>
            <TextField placeholder="Add your bio" name="bio" type="text" />
            <Button type="submit" className="w-100 mt-3 h-56px gradient-btn-orange">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CustomerInfoForm;

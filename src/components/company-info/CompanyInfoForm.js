import React, { useState, useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextField from '../../shared/TextField';
import NameIcon from '../../assets/images/icons/company.png';
import LicIcon from '../../assets/images/icons/license.png';
// import AddIcon from '../../assets/images/icons/address.png';
import '../../assets/css/login-form.css';
import { updateCompanyProfile } from '../../store/storeIndex';
import UploadImg from '../../assets/images/icons/upload.png';
import Toast from '../../shared/Toast';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const CompanyInfoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const [address, setAddress] = useState(null);
  const [phno, setPhno] = useState('920123456789');
  const [docFiles, setDocFiles] = useState([]);

  const validValues = {
    company: '',
    license: '',
    address: ''
  };

  const errorSchema = Yup.object().shape({
    company: Yup.string().required('Company name is required'),
    license: Yup.string().required('License number is required')
    // address: Yup.string().required('Address is required')
  });

  const loginHandler = (values) => {
    if (!docFiles.length) {
      return Toast.error('Document files are required');
    }
    if (!phno) {
      return Toast.error('Phone no is required');
    }
    const data = new FormData();
    data.append('c_docs', docFiles[0]);
    data.append('field', 'CompanyInfo');
    data.append('companyPhone', phno);
    data.append('companyLicenseNo', values.license);
    data.append('companyAddress', address.label);
    data.append('companyName', values.company);
    data.append('companyType', 'Company');

    dispatch(updateCompanyProfile(data, navigate, token));
  };

  const onDrop = useCallback((acceptedFiles) => {
    setDocFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="">
      <div className="mt-3 w-100">
        <Formik initialValues={validValues} validationSchema={errorSchema} onSubmit={loginHandler}>
          {(formik, touched, errors) => (
            <Form>
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
                placeholder="Company Name"
                name="company"
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
              <TextField
                icon={
                  <Image
                    fluid
                    className="field-icon"
                    src={LicIcon}
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                }
                placeholder="Company License Number"
                name="license"
                type="text"
              />
              {/* <TextField
                icon={
                  <Image
                    fluid
                    className="field-icon"
                    src={AddIcon}
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                }
                placeholder="Complete Address"
                name="address"
                type="text"
              /> */}
              <GooglePlacesAutocomplete
                selectProps={{
                  address,
                  onChange: setAddress
                }}
                className="customaddress"
                apiKey={process.env.REACT_APP_MAP_KEY}
              />

              <p className="fw-bold mt-3">Upload Registration Documents</p>
              <div className="field-container dotted" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="d-flex align-items-center justify-content-center py-2">
                  <Image fluid className="me-3" src={UploadImg} loading="lazy" />
                  <p className="grey p-0 m-0">
                    {docFiles.length > 0 ? docFiles[0].name : 'Choose File / Drag & Drop Here'}
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-100 mt-3 h-56px gradient-btn-orange">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompanyInfoForm;

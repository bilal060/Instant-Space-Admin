import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredCategories, getUserSpaces } from '../../store/storeIndex';
import '../../assets/css/responsive.css';
import '../../assets/css/radio.css';
import MyDropDown from '../../pages/MyDropDown';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState('all');
  const dispatch = useDispatch();
  const filterableCategories = useSelector((state) => state?.category?.filterCategories);

  useEffect(() => {
    dispatch(getFilteredCategories('6470b05d2490274856cf6471'));
  }, [dispatch]);
  const filterSpaceHandler = (filterBy) => {
    if (filterBy === 'all') {
      dispatch(getUserSpaces(1));
    } else {
      dispatch(getUserSpaces(1, filterBy));
    }
    setFilterState(filterBy);
  };
  return (
    <div className="main my-3">
      <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-sm-0 gap-2 mx-0">
        <Col sm="3" md="3" lg="4" xl="6" className="align-middle ps-0 d-flex align-items-center">
          <span className="heading">My Spaces</span>
        </Col>
        <Col
          sm="9"
          md="9"
          lg="8"
          xl="6"
          className="d-flex flex-sm-row flex-column-reverse justify-content-between gap-3 p-0">
          {filterableCategories?.subcategories?.length > 0 && (
            <MyDropDown
              options={filterableCategories?.subcategories}
              selectedValue={filterState}
              onChange={filterSpaceHandler}
              labelName="Select Branch "
            />
          )}
          {/* {!addNew && (
            <div className="d-flex align-items-center min-w-max-content justify-content-start">
              <Button
                className="space-btn-font space-btn-size custom-button-font gradient-btn-orange h-40px"
                onClick={() => navigate('/dashboard/addspace')}>
                + Add new Space
              </Button>
            </div>
          )} */}
          <div className="d-flex align-items-center min-w-max-content">
            <Button
              className="space-btn-font space-btn-size custom-button-font gradient-btn-orange h-40px"
              onClick={() => navigate('/dashboard/addspace')}>
              + Add new Space
            </Button>
          </div>
        </Col>
      </Row>
      {/* {addNew && (
        <div className="NewSpace mt-4 p-4 promotional-banner">
          <Slider {...settings}>
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h3>Lorem ipsum dolor sit amet consecr.</h3>
                <p className="font-weight-400">
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s
                </p>
              </div>
              <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
            </div>
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h3>Lorem ipsum dolor sit amet consecr.</h3>
                <p className="font-weight-400">
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s
                </p>
              </div>
              <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
            </div>
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h3>Lorem ipsum dolor sit amet consecr.</h3>
                <p className="font-weight-400">
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s
                </p>
              </div>
              <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
            </div>
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h3>Lorem ipsum dolor sit amet consecr.</h3>
                <p className="font-weight-400">
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s
                </p>
              </div>
              <Image fluid className="mb-2" src={LogoImg} loading="lazy" />
            </div>
          </Slider>
        </div>
      )}
      {addNew && (
        <div className="NewSpace mt-4 ">
          <SpaceForm
            category={category}
            onHide={() => setLgShow(false)}
            setaddNew={setaddNew}
          />
        </div>
      )} */}
    </div>
  );
}

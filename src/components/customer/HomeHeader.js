import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import SpacesIcon from '../../assets/images/icons/Spaces';
import CustomModal1 from '../../shared/CustomModal1';
import CustomerHomeFilterForm from './filterForm';
import '../../assets/css/home.css';
import '../../assets/css/radio.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredCategories, getAllSpaces } from '../../store/storeIndex';

export default function CustomerHomeHeader({ view, setView, ...props }) {
  const dispatch = useDispatch();
  const filterableCategories = useSelector((state) => state.category.filterCategories);

  const [category, setCategory] = useState('all');
  const [lgShow, setLgShow] = useState(false);
  // const [loc, setLoc] = useState(null);

  useEffect(() => {
    dispatch(getFilteredCategories('6470b05d2490274856cf6471'));
  }, [dispatch]);

  const filterSpaceHandler = (filterBy) => {
    if (filterBy === 'all') {
      dispatch(getAllSpaces(1));
    } else {
      dispatch(getAllSpaces(1, filterBy));
    }
    setCategory(filterBy);
  };

  // const onAreaSearchHandler = (address) => {
  //   console.log(address);
  // }

  return (
    <>
      <div className="main mt-3 mb-4">
        {!props.short ? (
          <>
            <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-md-0 gap-2 align-items-center m-0">
              <Col md="5" xl="6" className="ps-0">
                <span className="heading">All Spaces</span>
              </Col>
              <Col md="7" xl="6" className="pe-0 ps-sm-3 ps-0">
                <div className="d-flex align-items-center justify-content-end gap-3">
                  {/* <div className="search w-100">
              <input
                type="text"
                placeholder="Search"
                className="border-0 outline-none h-100 w-100 bg-transparent text-[16px]"
              />
              <GooglePlacesAutocomplete
                apiKey="AIzaSyBji3krLZlmFpDakJ1jadbsMuL_ZJfazfA"
                selectProps={{
                  loc,
                  onChange : onAreaSearchHandler(loc),
                }}
              />
              <img src={searchIcon} alt="" />
            </div> */}
                  {/* <div className="d-flex align-items-center min-w-max-content">
                    <Button
                      onClick={() => setLgShow(true)}
                      variant="light"
                      className="fw-bolder d-flex gap-2 align-items-center px-4 h-48px"
                    >
                    <Image alt="gallery" src={filterBlue} className=" text-primary" />
                      Filter
                    </Button>
                  </div> */}
                </div>
              </Col>
            </Row>
            <div className="mt-4 text-grey d-flex align-items-center gap-2">
              <SpacesIcon /> Select Space Type
            </div>
          </>
        ) : (
          ''
        )}
        <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-md-0 gap-3 align-items-start mx-0">
          {!props.short ? (
            <Col md="7" xl="8" className="ps-0">
              <div className="">
                <div className="d-flex align-items-center gap-3 space-type flex-wrap">
                  <div className="cutomer-home">
                    <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
                      <div className="d-flex justify-content-between button align-items-center w-auto">
                        <div>
                          <Form.Check
                            checked={category === 'all'}
                            onChange={() => filterSpaceHandler('all')}
                            inline
                            label={<>All</>}
                            name="group1"
                            type="radio"
                            id={`inline-radio-all`}
                            className="p-0 m-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {Object.keys(filterableCategories).length > 0 &&
                    filterableCategories.subcategories.map((data, index) => {
                      return (
                        <div className="cutomer-home" key={index}>
                          <div className="d-flex button align-items-center w-auto gap-3 modal-tabs">
                            <div className="d-flex justify-content-between button align-items-center w-auto">
                              <div className="bg-white">
                                <Form.Check
                                  checked={category === data._id}
                                  onChange={() => filterSpaceHandler(data._id)}
                                  inline
                                  label={<>{data.name}</>}
                                  name="group1"
                                  type="radio"
                                  id={`inline-radio-${data._id}`}
                                  className="p-0 m-0 centered-tabs"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* <div className=" d-none dropOnSmall">
                <div className="d-flex align-items-center w-100 pe-sm-3">
                  {Object.keys(filterableCategories).length > 0 && (
                    <div className="d-flex align-items-center justify-content-start w-100 flex-wrap flex-sm-nowrap gap-1">
                      <Form.Label className="min-w-100 mb-0">Select Type: &nbsp;</Form.Label>
                      <Form.Select
                        aria-label="Default drop-input select example"
                        className="w-max-content"
                        defaultValue="all"
                        onChange={(e) => filterSpaceHandler(e.target.value)}>
                        <option value="all">All</option>
                        {filterableCategories.subcategories.map((data, index) => {
                          return (
                            <option key={index} value={data._id}>
                              {data.name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                  )}
                </div>
              </div> */}
            </Col>
          ) : (
            <Col md="5" xl="8" className="ps-0 py-2">
              <span className="heading ">All Spaces</span>
            </Col>
          )}
          <Col md="5" xl="4" className="pe-0 ps-md-3 ps-0 cutomer-home ">
            <div className="d-flex justify-content-md-end button align-items-center w-auto gap-3 space-type flex-wrap flex-md-nowrap">
              <div>
                <Form.Check
                  checked={view === 'Grid'}
                  onChange={() => {
                    setView('Grid');
                  }}
                  inline
                  label={<>Grid View</>}
                  name="group2"
                  type="radio"
                  id={`inline-radio-11`}
                  className="p-0 m-0"
                />
              </div>
              <div>
                <Form.Check
                  checked={view === 'Map View'}
                  onChange={() => {
                    setView('Map View');
                  }}
                  inline
                  label={<>Map View</>}
                  name="group2"
                  type="radio"
                  id={`inline-radio-22`}
                  className="p-0 m-0"
                />
              </div>
            </div>
          </Col>
        </Row>

        <CustomModal1
          class1={''}
          show={lgShow}
          onHide={() => setLgShow(false)}
          className="customer-home-filter"
        >
          <CustomerHomeFilterForm setLgShow={setLgShow} />
        </CustomModal1>
      </div>
    </>
  );
}

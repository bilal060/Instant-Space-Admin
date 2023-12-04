import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const SpaceFilter = () => {
  return (
    <div>
      <div className="main my-3">
        <Row className="mt-3 d-flex justify-content-between w-100 pe-0 gap-sm-0 gap-2 mx-0">
          <Col sm="5" md="4" lg="4" xl="7" className="align-middle p-0 d-flex align-items-center">
            <span className="heading">My Spaces</span>
          </Col>
          <Col
            sm="7"
            md="8"
            lg="8"
            xl="5"
            className="d-flex flex-sm-row flex-column-reverse justify-content-between gap-2 p-0"
          >
            <div className="d-flex align-items-center w-100">
              {/* {Object.keys(filterableCategories).length > 0 && ( */}
              <div className="d-flex align-items-center justify-content-start justify-content-sm-end w-100 gap-2">
                <Form.Label className=" mb-0 font-weight-600">Select Type:</Form.Label>
                <Form.Select
                  aria-label="Default drop-input select example"
                  className="w-50"
                  defaultValue="all"
                  //onChange={(e) => filterSpaceHandler(e.target.value)}
                >
                  <option value="all">All</option>
                  {/* {filterableCategories.subcategories.map((cat, index) => {
                                            return (
                                                <option key={index} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            );
                                        })} */}
                </Form.Select>
              </div>
              {/* )} */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SpaceFilter;

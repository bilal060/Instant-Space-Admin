import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import '../../assets/css/table.css';
import Profile from '../../assets/images/icons/table.svg';
import CustomModal1 from '../../shared/CustomModal1';
import SingleSpaceAddReviews from './SingleSpaceAddReviews';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SpaceCustomerStaff = () => {
  const { sid } = useParams();
  const singleSpace = useSelector((state) => state.space.singleSpace);
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <div className="bg-white p-3 rounded-8px h-100">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="heading w-max-content">Staff</div>
          <div className="d-flex align-items-center">
            {/* <Button className="btn-orange-outline w-max-content h-40px">Chat Now</Button> */}
            <Button
              className="btn-orange-outline ms-2 w-max-content h-40px"
              onClick={() => setLgShow(true)}>
              Add Review
            </Button>
          </div>
        </div>
        <CustomModal1
          heading="Add Review"
          show={lgShow}
          onHide={() => setLgShow(false)}
          className="new-space-modal new-space-modal">
          <SingleSpaceAddReviews singleSpaceId={sid} setLgShow={setLgShow} />
        </CustomModal1>
        {Object.keys(singleSpace).length > 0 && singleSpace.managers.length > 0 ? (
          <div className="bg-light ">
            <Table responsive style={{ minWidth: 'max-content' }}>
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                {singleSpace?.managers?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-0">
                        <div className="d-flex align-items-center  h-25">
                          {/* <Image src={`${item.Photo}`} className="table-pic-size rounded-1" /> */}
                          <Image
                            src={
                              item.photo
                                ? `${process.env.REACT_APP_SERVER_URL}${item.photo}`
                                : Profile
                            }
                            alt="user-image"
                            loading="lazy"
                            style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                          />
                          <div>
                            <p className="ps-3 p-0 m-0  grey">Full Name</p>
                            <p className="ps-3 p-0 m-0 tb-data w-100 text-capitalize">{`${item.firstName} ${item.lastName}`}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-0">
                        <p className="ps-3 p-0 m-0 grey w-100">Contact Info</p>
                        <p className="ps-3 p-0 m-0 tb-data w-100">{item.phoneNo}</p>
                      </td>
                      <td className="border-0">
                        <p className="ps-3 p-0 m-0 grey w-100">Shift Time Slot</p>
                        <p className="ps-3 p-0 m-0 tb-data w-100">{`${item.slot.from} to ${item.slot.to}`}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100 flex-column h-100">
            <p className="mb-5 font-24 font-weight-500 text-center">No staff added yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SpaceCustomerStaff;

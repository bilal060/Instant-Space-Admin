import React, { useState } from 'react';
import { Image, Button, Table } from 'react-bootstrap';
import spaceDetailsStaff from '../../assets/images/spaceDetailsStaff.svg';
import CustomModal1 from '../../shared/CustomModal1';
import ManagerForm from '../managers/ManagerForm';
import { useSelector } from 'react-redux';
import Profile from '../../assets/images/icons/table.svg';

const SpaceStaff = () => {
  const [lgShow, setLgShow] = useState(false);
  const singleSpace = useSelector((state) => state.space.singleSpace);
  console.log(singleSpace);
  return (
    <>
      <div className="bg-white rounded-8px h-100 d-flex flex-column">
        <div className="heading px-4 pt-4 w-100 ">Staff</div>
        {Object.keys(singleSpace).length > 0 && singleSpace.managers.length > 0 ? (
          <>
            <div className="bg-white rounded custom-table1">
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
          </>
        ) : (
          <div className="d-flex flex-column align-items-center gap-3 pb-3 px-3 h-100 justify-content-center">
            <Image src={spaceDetailsStaff} width={60} height={60} />
            <p>You don’t have any staff yet Add your staff</p>
            <div className="d-flex flex-column flex-md-row w-100 justify-content-center gap-3 flex-wrap">
              <Button className="btn-blue px-5 " onClick={() => setLgShow(true)}>
                <span>+ </span> Add Staff
              </Button>
            </div>
          </div>
        )}
      </div>
      <CustomModal1 heading="Add New Staff" show={lgShow} onHide={() => setLgShow(false)}>
        <ManagerForm onHide={() => setLgShow(false)} />
      </CustomModal1>
    </>
  );
};

export default SpaceStaff;

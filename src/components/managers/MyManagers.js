import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../assets/css/dashboard-misc.css';
import ManagerTable from './ManagerTable';
import { useSelector, useDispatch } from 'react-redux';
import { getOwnerManagers, getUserSpaces } from '../../store/storeIndex';
import MyDropDown from '../../pages/MyDropDown';

const ManagerMain = () => {
  const [filterState, setFilterState] = useState('all');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const userSpaces = useSelector((state) => state?.space?.userSpaces);
  useEffect(() => {
    dispatch(getUserSpaces(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getUserSpaces());
  }, [dispatch]);

  const filterManagerHandler = (filterBy) => {
    if (filterBy === 'all') {
      dispatch(getOwnerManagers());
    } else {
      dispatch(getOwnerManagers(1, filterBy));
    }
    setFilterState(filterBy);
  };
  return (
    <>
      <Row className="mt-3 d-flex justify-content-between w-100 p-0  gap-xl-0 gap-2 mx-0">
        <Col sm="5" xxl="4" xl="3" className="p-0 d-flex align-items-center">
          <span className="heading">My Managers</span>
        </Col>
        <Col
          xs="12"
          xxl="8"
          xl="9"
          className="d-flex flex-md-row flex-column-reverse justify-content-between gap-4 p-0">
          <div className="d-flex align-items-center justify-content-between flex-sm-row gap-2 flex-column w-100">
            <MyDropDown
              options={userSpaces.spaces}
              selectedValue={filterState}
              onChange={filterManagerHandler}
              labelName="Select Branch"
            />
            <MyDropDown
              options={userSpaces.spaces}
              selectedValue={filterState}
              onChange={filterManagerHandler}
              labelName="Select Shift"
            />
          </div>
        </Col>
      </Row>
      <div className="pt-3 px-0">
        <ManagerTable emptyDataMsg="You don’t have any Staff Yet" />
      </div>
    </>
  );
};

export default ManagerMain;

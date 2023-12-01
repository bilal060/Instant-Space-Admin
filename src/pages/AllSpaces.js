import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ViewAllSpaces from '../components/allSpaces/viewAllSpaces';
import withMainLayout from '../layout/MainLayout';
import Header from '../components/allSpaces/header';
import { getUserSpaces } from '../store/storeIndex';

const AllSpaces = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  useEffect(() => {
    dispatch(getUserSpaces(userId));
  }, [dispatch, userId]);
  const [addNew, setaddNew] = useState(false);

  return (
    <Container fluid>
      <Header addNew={addNew} setaddNew={setaddNew} />
      {!addNew && <ViewAllSpaces addNew={addNew} setaddNew={setaddNew} />}
    </Container>
  );
};
export default withMainLayout(AllSpaces);

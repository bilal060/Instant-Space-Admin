import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import withMainLayout from '../layout/MainLayout';
import HomeHeader from '../components/home/HomeHeader';
import UsersTable from '../components/home/UsersTable';

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState('Manager');
  return (
    <Container fluid>
      <HomeHeader
        page={page}
        heading="Users"
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        short={false}
      />
      <UsersTable short={false} filterBy={filterBy} page={page} setPage={setPage} />
    </Container>
  );
};
export default withMainLayout(AllUsers);

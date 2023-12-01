import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/home.css';
import '../../assets/css/radio.css';
import { Cards } from '../home/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { getAllSpaces, getUserSpaces } from '../../store/storeIndex';

export default function ViewAllSpaces(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const userRole = useSelector((state) => state.user.user.role);
  const spaces = useSelector((state) => {
    return userRole === 'Customer' ? state.space.all : state.space.userSpaces;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === 'Customer') {
      dispatch(getAllSpaces());
    } else {
      dispatch(getUserSpaces());
    }
  }, [dispatch, userRole]);
  const pageHandler = (page) => {
    setPage(page);
    dispatch(getUserSpaces(page));
  };

  return (
    <Row>
      {Object.keys(spaces)?.length > 0 &&
        props.short &&
        spaces.spaces?.length > 0 &&
        spaces.spaces.slice(0, props.length).map((space, index) => {
          return (
            <Col
              key={index}
              sm={props.length === 3 ? 6 : 6}
              md={props.length === 3 ? 6 : 6}
              lg={props.length === 3 ? 4 : 6}>
              <Cards
                onClick={() => {
                  if (userRole === 'Customer') {
                    navigate(`/dashboard/customer/single-space/${space._id}`);
                  } else {
                    navigate(`/dashboard/single-space/${space._id}`);
                  }
                }}
                class1={props.classes}
                space={space}
              />
            </Col>
          );
        })}
      {Object.keys(spaces)?.length > 0 &&
        !props.short &&
        spaces?.spaces?.length > 0 &&
        spaces.spaces.map((space, index) => {
          return (
            <Col key={index} xs={12} md={6} lg={4} xl={4} xxl={3}>
              <Cards
                onClick={() => {
                  if (userRole === 'Customer') {
                    navigate(`/dashboard/customer/single-space/${space._id}`);
                  } else {
                    navigate(`/dashboard/single-space/${space._id}`);
                  }
                }}
                class1={props.classes}
                space={space}
              />
            </Col>
          );
        })}
      {!props.short && spaces?.spaces?.length === 0 && (
        <Container>
          <Alert key="info" variant="info" className="me-2">
            No Spaces to Show Here !
          </Alert>
        </Container>
      )}

      {!props.short && spaces.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={spaces.totalRecords}
          limit={spaces.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={1}
        />
      ) : (
        ''
      )}
    </Row>
  );
}

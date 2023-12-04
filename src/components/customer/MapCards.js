import React, { useState, useEffect } from 'react';
import electric1 from '../../assets/images/icons/CardIcons/electric1.svg';
import electric2 from '../../assets/images/icons/CardIcons/electric2.svg';
import electric3 from '../../assets/images/icons/CardIcons/electric3.svg';
import electric4 from '../../assets/images/icons/CardIcons/electric4.svg';
import { Col, Row } from 'react-bootstrap';
import HorizontalCard from './HorizontalCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'react-bootstrap/Spinner';

const MapCards = ({ isLoading, loadMoreData, ...props }) => {
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.user.user.role);
  const spaces = useSelector((state) => {
    return userRole === 'Customer' ? state.space.all : state.space.userSpaces;
  });

  const spaceClickHandler = (spaceId) => {
    if (userRole === 'Customer') {
      navigate(`/dashboard/customer/single-space/${spaceId}`);
    } else {
      navigate(`/dashboard/single-space/${spaceId}`);
    }
  };

  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading &&
      hasMore
    ) {
      loadMoreData();
    }
  };

  const fetchData = () => {
    setTimeout(() => {
      const newCards = generateCards(page);
      setCards((prevCards) => [...prevCards, ...newCards]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newCards.length > 0);
    }, 1000);
  };
  const generateCards = (page) => {
    // Generate new cards based on the current page
    // Replace this with your actual data generation logic
    const newCards = [];
    const startIndex = (page - 1) * 3;
    for (let i = startIndex; i < startIndex + 3; i++) {
      newCards.push(<HorizontalCard />);
    }
    return newCards;
  };

  return (
    <div>
      <Row>
        <InfiniteScroll
          dataLength={cards.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
        >
          {Object.keys(spaces).length > 0 &&
            spaces.spaces.length > 0 &&
            spaces.spaces.slice(0, props.length).map((space, index) => {
              return (
                <Col key={index} md={6} xl={12} className="mb-3">
                  <HorizontalCard
                    onClick={() => {
                      if (userRole === 'Customer') {
                        navigate(`/dashboard/customer/single-space/${space._id}`);
                      } else {
                        navigate(`/dashboard/single-space/${space._id}`);
                      }
                    }}
                    title={space.description}
                    src={`${process.env.REACT_APP_SERVER_URL}${space.images[0]}`}
                    phone={space.contact}
                    capacity={space.capacity}
                    address={space.address}
                    type={space.categoryId.subcategories[0].name}
                    rate={space.rate_hour}
                    rating="5"
                    icon1={electric1}
                    icon2={electric2}
                    icon3={electric3}
                    icon4={electric4}
                    id={space._id}
                    spaceClickHandler={spaceClickHandler}
                  />
                </Col>
              );
            })}
        </InfiniteScroll>
      </Row>
    </div>
  );
};

export default MapCards;

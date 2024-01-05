// import React from 'react';
// import withMainLayout from '../layout/MainLayout.js';
// import { Col, Row } from 'react-bootstrap';
// import Drops from '../shared/Drops.js';
// import '../assets/css/notification.css';
// import NotificationsTable from '../components/Notifications/NotificationsTable';
// const Notifications = () => {
//   const options = ['Most Recent', 'Older'];
//   return (
//     <div>
//       <Row className="mt-3 d-flex justify-content-between w-100 pe-0">
//         <Col xs="12" lg="6" className="">
//           <span className="heading">Notifications</span>
//         </Col>

//         <Col xs="12" lg="6" className="d-flex end start pe-0">
//           <div className="d-flex align-items-center w-40 ">
//             <Drops title="Sort by:" options={options} />
//           </div>
//         </Col>
//       </Row>
//       <NotificationsTable />
//     </div>
//   );
// };

// export default withMainLayout(Notifications);

import React, { useState } from 'react';
import withMainLayout from '../layout/MainLayout.js';
import { Col, Row, Spinner } from 'react-bootstrap';
import '../assets/css/notification.css';
import NotificationsTable from '../components/Notifications/NotificationsTable';
import InfiniteScroll from 'react-infinite-scroll-component';
//import { useSelector } from 'react-redux';
//import { getPaginatedNotification } from '../store/storeIndex.js';

const Notifications = () => {
  //const [hasMore, setHasMore] = useState(true);
  //const [visitedNotificationPage, setVisitedNotificationPage] = useState(false);

  //const dispatch = useDispatch();
  //const notification = useSelector((state) => state.notification.paginatedNotifications);
  //const allnotification = useSelector((state) => state.notification.notifications);
  //const [page, setPage] = useState(1);
  const [mergedData, setMergedData] = useState([]);

  // useEffect(() => {
  //   setMergedData((prevNotifications) => [...prevNotifications, ...notification]);
  // }, [notification]);
  // function removeDuplicates(data) {
  //   const uniqueIds = {};
  //   return data.reduce((result, item) => {
  //     uniqueIds[item._id] = item;
  //     return Object.values(uniqueIds);
  //   }, []);
  // }

  // useEffect(() => {
  //   setMergedData((prevNotifications) => {
  //     const updatedData = [...prevNotifications, ...notification];
  //     const sortedData = updatedData.sort((a, b) => {
  //       return new Date(b.createdAt) - new Date(a.createdAt);
  //     });
  //     return removeDuplicates(sortedData);
  //   });
  // }, [notification]);

  // const fetchMoreData = () => {
  //   let timeCounter;
  //   if (mergedData.length === allnotification.length) {
  //     setHasMore(false);
  //     return;
  //   }
  //   timeCounter = setTimeout(() => {
  //     setPage(page + 1);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timeCounter);
  //   };
  // };

  // useEffect(() => {
  //   if (!visitedNotificationPage) {
  //     setMergedData([]);
  //     setVisitedNotificationPage(true);
  //   } else {
  //     dispatch(getPaginatedNotification(page));
  //   }
  // }, [dispatch, page, visitedNotificationPage]);

  return (
    <>
      <InfiniteScroll
        dataLength={mergedData.length}
        // next={fetchMoreData}
        // hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        loader={
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }>
        <Row className="mt-3 d-flex justify-content-between w-100 pe-0">
          <Col sm="6" className="">
            <span className="heading">Notifications</span>
          </Col>
        </Row>

        <NotificationsTable setMergedData={setMergedData} mergedData={mergedData} />
      </InfiniteScroll>
    </>
  );
};

export default withMainLayout(Notifications);

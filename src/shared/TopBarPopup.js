// import React, { useState } from 'react';
// import TopBarPopupBox from './TopBarPopupBox';
// import UseImg from '../assets/images/UserImg.svg';
// import { Dropdown } from 'react-bootstrap';
// import MassegesRadios from './MassegesRadios';
// import { Link } from 'react-router-dom';
// const TopBarPopup = () => {
//   const [categoryradio, setCategoryradio] = useState('All');

//   const card = [
//     {
//       img: UseImg,
//       description: "orem Ipsum has been the industry's orem Ipsum has been the industry's ",
//       time: '4 Days ago'
//     },
//     {
//       img: UseImg,
//       description: "orem Ipsum has been the industry's orem Ipsum has been the industry's ",
//       time: '4 Days ago'
//     }
//   ];
//   const radio = [
//     {
//       id: '1',
//       text: 'All'
//     },
//     {
//       id: '2',
//       text: 'Unread'
//     }
//   ];
//   return (
//     <>
//       <div>
//         <Dropdown.Header className="pb-3 mb-1 px-4 py-0">
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="text-dark font-weight-700 font-20">Notifications</div>
//             <div>
//               <button
//                 className="bg-white text-black border-0 font-weight-700"
//                 style={{ fontSize: '2rem', lineHeight: '10px' }}>
//                 ...
//               </button>
//             </div>
//           </div>
//         </Dropdown.Header>

//         <Dropdown.Header className="px-4 py-0">
//           <div className=" d-flex gap-3 mb-3 pb-1 align-items-center w-100">
//             {radio.map((data, index) => {
//               return (
//                 <MassegesRadios
//                   key={index}
//                   data={data}
//                   category={categoryradio}
//                   setCategory={setCategoryradio}
//                   className={`${categoryradio === 'All' ? 'all' : 'unread'}`}
//                 />
//               );
//             })}
//           </div>
//           <div className="d-flex justify-content-between align-items-center text-dark font-12 font-weight-500 mb-3">
//             <div>New</div>
//             <Link
//               to={'/dashboard/notifications'}
//               className="top-popup-primary text-decoration-none">
//               See All
//             </Link>
//           </div>
//         </Dropdown.Header>
//         {categoryradio === 'All' ? (
//           <>
//             <TopBarPopupBox cards={card} />
//             <Dropdown.Header className="px-4 py-0">
//               <div className="text-dark font-12 font-weight-500 mb-3 mt-3 pt-1">Earliar</div>
//             </Dropdown.Header>
//             <TopBarPopupBox cards={card} />
//           </>
//         ) : (
//           <TopBarPopupBox cards={card} />
//         )}
//       </div>
//     </>
//   );
// };

// export default TopBarPopup;

import React, { useEffect, useState } from 'react';
import TopBarPopupBox from './TopBarPopupBox';
// import UseImg from '../assets/images/UserImg.svg';
import { Button, Dropdown } from 'react-bootstrap';
import MassegesRadios from './MassegesRadios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { updateNotification } from '../store/notification/actions/actionCreators';
const TopBarPopup = () => {
  //const dispatch = useDispatch();
  const [categoryradio, setCategoryradio] = useState('All');
  // const notification = useSelector((state) => state.notification?.notifications);
  const notiConsole = useSelector((state) => state);
  console.log(notiConsole, 'notiConsole');
  const newMessages = [];
  const olderMessages = [];
  const currentDate = new Date();
  const notification = [
    {
      message: 'lorejgjh hgjh g ',
      createdAt: '',
      type: 'chat',
      conversationId: {
        _id: 'hhjghjg'
      },
      sender: {
        photo: 'hjhgjh.jpg',
        fullName: 'testMuhsan'
      }
    },
    {
      message: 'lorejgjh hgjh g ',
      createdAt: '',
      type: 'chat',
      conversationId: {
        _id: 'hhjghjg'
      },
      sender: {
        photo: 'hjhgjh.jpg',
        fullName: 'testMuhsan'
      }
    }
  ];

  notification?.forEach((message) => {
    const messageDate = new Date(message.createdAt);
    if (
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      newMessages.push(message);
    } else {
      olderMessages.push(message);
    }
  });
  const [unreadNotification, setUnreadNotification] = useState();

  useEffect(() => {
    const unreadMessages = notification?.filter((obj) => obj.isRead === false);
    setUnreadNotification(unreadMessages);
  }, [notification]);

  const radio = [
    {
      id: '1',
      text: 'All'
    },
    {
      id: '2',
      text: 'Unread'
    }
  ];
  return (
    <>
      <div>
        <Dropdown.Header className="pb-3 mb-1 px-4 py-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-dark font-weight-700 font-20">Notifications</div>
            <div>
              <Button
                // onClick={() => dispatch(updateNotification())}
                className="bg-white text-dark border-0 font-12 font-weight-500 p-0"
                style={{ color: 'black !important' }}>
                Mark all as Read
              </Button>
            </div>
          </div>
        </Dropdown.Header>

        {notification?.length > 0 ? (
          <>
            <Dropdown.Header className="px-4 py-0">
              <div className=" d-flex  mb-3 pb-1 align-items-center w-100">
                {radio.map((data, index) => {
                  return (
                    <MassegesRadios
                      key={index}
                      data={data}
                      category={categoryradio}
                      setCategory={setCategoryradio}
                      className={`${categoryradio === 'All' ? 'all' : 'unread'}`}
                    />
                  );
                })}
              </div>
              <div className="d-flex justify-content-between align-items-center text-dark font-12 font-weight-500 mb-3">
                <div>New</div>
                <Link
                  to={'/dashboard/notifications'}
                  className="top-popup-primary text-decoration-none">
                  See All
                </Link>
              </div>
            </Dropdown.Header>
            {categoryradio === 'All' ? (
              <div className="notifications">
                <TopBarPopupBox notification={newMessages} />
                {olderMessages !== undefined && olderMessages.length > 0 && (
                  <>
                    <Dropdown.Header className="px-4 py-0">
                      <div className="text-dark font-12 font-weight-500 mb-3 mt-3 pt-1">
                        Earliar
                      </div>
                    </Dropdown.Header>
                    <TopBarPopupBox notification={olderMessages} />
                  </>
                )}
              </div>
            ) : unreadNotification.length > 0 ? (
              <div className="notifications">
                <TopBarPopupBox notification={unreadNotification} />
              </div>
            ) : (
              <p className="text-dark font-16 font-weight-500 m-0 text-grey mt-3 px-4">
                No unread notifications yet.
              </p>
            )}
          </>
        ) : (
          <p className="text-dark font-16 font-weight-500 m-0 text-grey mt-3 px-4">
            No notifications yet.
          </p>
        )}
      </div>
    </>
  );
};

export default TopBarPopup;

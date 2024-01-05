// import React from 'react';
// import { Image } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';

// const TopBarPopupBox = ({ cards }) => {
//   return (
//     <>
//       {cards.map((items, index) => {
//         return (
//           <DropdownItem className="px-4" key={index}>
//             <div className="d-flex gap-3">
//               <div>
//                 <Image src={items.img} className="rounded-circle" width={50} />
//               </div>
//               <div className="d-flex flex-column ">
//                 <p className="font-12 text-wrap mb-0">{items.description}</p>
//                 <p className="font-10 top-popup-primary text-14 mb-0">{items.time}</p>
//               </div>
//             </div>
//           </DropdownItem>
//         );
//       })}
//     </>
//   );
// };

// export default TopBarPopupBox;
import React from 'react';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
// import TimeAgo from 'javascript-time-ago';
// import en from 'javascript-time-ago/locale/en';
import { useNavigate } from 'react-router-dom';
import ImageDisplay from '../components/messages/Image';

const TopBarPopupBox = ({ notification }) => {
  // TimeAgo.addLocale(en);
  // const timeAgo = new TimeAgo('en-US');
  const navigate = useNavigate();

  return (
    <>
      {(notification || []).slice(0, 5).map((items, index) => {
        return (
          <DropdownItem
            className="px-4 py-2"
            key={index}
            onClick={() =>
              navigate(
                items.type === 'chat'
                  ? `/dashboard/messages/${items.conversationId._id}`
                  : `/dashboard/bookings`
              )
            }>
            <div className="d-flex gap-3">
              <div>
                <ImageDisplay
                  src={`${process.env.REACT_APP_SERVER_URL}${items.sender.photo}`}
                  className="rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                  alt="user"
                />
              </div>
              <div className="d-flex flex-column justify-content-center w-100">
                <p className="font-12 text-wrap mb-0 d-flex flex-wrap gap-sm-1">
                  {items.type === 'chat'
                    ? ' You have a new message from'
                    : items?.status
                      ? ' You have a booking status update from'
                      : ' You have a new booking request from'}

                  <span className="fw-bold mb-0 text-capitalize">{items.sender.fullName}</span>
                </p>
                <p className="font-10 top-popup-primary mb-0">
                  {/* {timeAgo.format(new Date(items.createdAt))} */}
                </p>
              </div>
            </div>
          </DropdownItem>
        );
      })}
    </>
  );
};

export default TopBarPopupBox;

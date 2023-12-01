import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../assets/css/calendar.css';
import { getAllBookings } from '../../store/booking/actions/actionCreators';
import { useDispatch, useSelector } from 'react-redux';

let eventGuid = 0;
function createEventId() {
  return String(eventGuid++);
}

const EventCalender = () => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const userRole = useSelector((state) => state.user.user.role);
  const bookings = useSelector((state) => state.booking.bookings.bookings);
  useEffect(() => {
    dispatch(getAllBookings(userId, token, userRole, 'upcoming'));
  }, [dispatch, userId, token, userRole]);
  useEffect(() => {
    const formatBookingData = bookings?.map((booking) => ({
      id: createEventId(),
      title: booking.category,
      start: booking.from
    }));
    setEvents(formatBookingData);
  }, [bookings]);
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default EventCalender;

function renderEventContent(eventInfo) {
  return (
    <>
      <label>{eventInfo.event.title}</label>
    </>
  );
}

import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types'; // Import PropTypes

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onSelectEvent }) => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      defaultView={Views.MONTH} // Set the default view to 'month'
      views={['month']}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={onSelectEvent} // Use the passed onSelectEvent prop
    />
  </div>
);

// Add propTypes to validate props
MyCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onSelectEvent: PropTypes.func.isRequired, // Validate the onSelectEvent prop
};

export default MyCalendar;

import { useParams } from 'react-router-dom';
import { INITIAL_EVENTS } from '../data/mockEvents';

function EventDetails() {
  const { eventId } = useParams();

  const event = INITIAL_EVENTS.find(
    (item) => item.id === Number(eventId)
  );

  if (!event) {
    return (
      <div className="event-details-page">
        <h2>Event not found</h2>
        <p>Please select an event from Explore Events.</p>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <section className="event-details-banner">
        <span className="event-category">
          {event.category}
        </span>

        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </section>

      <section className="event-details-content">
        <div className="event-about">
          <h2>About This Event</h2>
          <p>{event.description}</p>
        </div>

        <div className="event-booking-card">
          <h2>Event Information</h2>

          <p><strong>Date:</strong> {event.event_date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>
            <strong>Price:</strong>{' '}
            {Number(event.price) === 0
              ? 'Free'
              : `₹${event.price}`}
          </p>

          <button
            className="book-ticket-btn"
            onClick={() => alert('Booking feature coming soon!')}
          >
            Book Ticket
          </button>
        </div>
      </section>
    </div>
  );
}

export default EventDetails;
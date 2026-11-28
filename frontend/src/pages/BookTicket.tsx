import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL_EVENTS } from '../data/mockEvents';
import '../styles/booking.css';

function BookTicket() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const event = INITIAL_EVENTS.find(
    (item) => String(item.id) === String(eventId)
  );

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!event) {
    return (
      <div className="booking-container">
        <h2>Event not found</h2>
        <button onClick={() => navigate('/events')}>
          Explore Events
        </button>
      </div>
    );
  }

  const ticketPrice = Number(event.price);
  const totalPrice = ticketPrice * quantity;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const booking = {
      bookingId: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.event_date,
      eventLocation: event.location,
      ticketPrice,
      quantity,
      totalPrice,
      attendeeName: name,
      attendeeEmail: email,
      attendeePhone: phone,
      bookingDate: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem('myBookings') || '[]'
    );

    existingBookings.push(booking);

    localStorage.setItem(
      'myBookings',
      JSON.stringify(existingBookings)
    );

    alert('Your booking has been confirmed!');

    navigate('/booking-confirmation', {
        state:{ booking },
    });
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Book Your Ticket</h1>
        <p>Complete your details to reserve your seat.</p>
      </div>

      <div className="booking-content">
        <div className="booking-event-card">
          <h2>{event.title}</h2>

          <p>
            <strong>Date:</strong> {event.event_date}
          </p>

          <p>
            <strong>Location:</strong> {event.location}
          </p>

          <p>
            <strong>Category:</strong> {event.category}
          </p>

          <div className="ticket-price">
            ₹{ticketPrice} <span>per ticket</span>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleBooking}>
          <h2>Booking Details</h2>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Number of Tickets</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} value={number}>
                {number} Ticket{number > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          <div className="booking-total">
            <span>Total Amount</span>
            <strong>₹{totalPrice}</strong>
          </div>

          <button type="submit" className="confirm-booking-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookTicket;
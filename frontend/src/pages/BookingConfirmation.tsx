import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/booking.css';

function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="confirmation-container">
        <h2>No booking details found</h2>
        <button onClick={() => navigate('/events')}>
          Explore Events
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>

        <h1>Booking Confirmed!</h1>

        <p className="confirmation-message">
          Your ticket has been booked successfully.
        </p>

        <div className="confirmation-details">
          <h2>{booking.eventTitle}</h2>

          <p>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>

          <p>
            <strong>Date:</strong> {booking.eventDate}
          </p>

          <p>
            <strong>Location:</strong> {booking.eventLocation}
          </p>

          <p>
            <strong>Tickets:</strong> {booking.quantity}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹{booking.totalPrice}
          </p>
        </div>

        <button
          className="confirmation-btn"
          onClick={() => navigate('/my-bookings')}
        >
          View My Bookings
        </button>

        <button
          className="continue-btn"
          onClick={() => navigate('/events')}
        >
          Explore More Events
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;
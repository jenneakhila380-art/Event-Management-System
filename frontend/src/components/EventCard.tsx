import React from 'react';
import { EventItem } from '../types/event';

interface EventCardProps {
  event: EventItem;
  variant?: 'home' | 'explore';
}

export const EventCard: React.FC<EventCardProps> = ({ event, variant = 'explore' }) => {
  const isFree = Number(event.price) === 0 || event.price === '0.00' || event.price === 'Free';
  const priceDisplay = isFree ? 'Free' : `₹${event.price}`;

  if (variant === 'home') {
    const homeClass = event.id === 1 ? 'event-one' : event.id === 2 ? 'event-two' : 'event-three';
    return (
      <article className="event-card">
        <div className={`event-image ${homeClass}`}>
          <span className="event-tag">{event.category.toUpperCase()}</span>
        </div>
        <div className="event-info">
          <p className="event-date">{event.event_date}</p>
          <h3>{event.title}</h3>
          <p className="event-location">📍 {event.location}</p>
          <div className="event-bottom">
            <span>{priceDisplay}</span>
            <a href="#events">View Details →</a>
          </div>
        </div>
      </article>
    );
  }

  const exploreImageClass = event.imageClass || 'event-image-one';

  return (
    <article
      className="explore-event-card"
      data-category={event.category}
      data-price={event.price}
      data-name={event.title}
      data-location={event.location}
    >
      <div className={`explore-event-image ${exploreImageClass}`}>
        <span className="explore-event-tag">{event.category.toUpperCase()}</span>
      </div>
      <div className="explore-event-info">
        <span className="explore-event-date">{event.event_date}</span>
        <h3>{event.title}</h3>
        <p className="explore-event-location">📍 {event.location}</p>
        <div className="explore-event-bottom">
          <span className={`event-price ${isFree ? 'free-price' : ''}`}>
            {priceDisplay}
          </span>
          <a href="#" className="event-details-link">
            View Details →
          </a>
        </div>
      </div>
    </article>
  );
};

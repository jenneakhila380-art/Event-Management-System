import { EventItem } from '../types/event';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Future Tech Summit',
    category: 'technology',
    event_date: 'DEC 15, 2026',
    location: 'Hyderabad, India',
    price: 299,
    is_featured: true,
    description: 'Explore the future of AI, cloud, and modern software technologies with industry leaders.',
    imageClass: 'event-image-one'
  },
  {
    id: 2,
    title: 'Live Music Night',
    category: 'music',
    event_date: 'DEC 20, 2026',
    location: 'Hyderabad, India',
    price: 499,
    is_featured: true,
    description: 'An unforgettable night of indie rock, electronic fusion, and live acoustics.',
    imageClass: 'event-image-two'
  },
  {
    id: 3,
    title: 'Creative Design Workshop',
    category: 'education',
    event_date: 'DEC 25, 2026',
    location: 'Hyderabad, India',
    price: 0,
    is_featured: true,
    description: 'Hands-on UI/UX and product design workshop for aspiring designers.',
    imageClass: 'event-image-three'
  },
  {
    id: 4,
    title: 'Art and Culture Festival',
    category: 'arts',
    event_date: 'JAN 05, 2027',
    location: 'Bangalore, India',
    price: 199,
    is_featured: false,
    description: 'Immerse yourself in traditional and modern art exhibits, craft workshops, and performances.',
    imageClass: 'event-image-four'
  },
  {
    id: 5,
    title: 'Startup Networking Meet',
    category: 'business',
    event_date: 'JAN 10, 2027',
    location: 'Chennai, India',
    price: 799,
    is_featured: false,
    description: 'Connect with founders, investors, and innovators in the startup ecosystem.',
    imageClass: 'event-image-five'
  },
  {
    id: 6,
    title: 'Web Development Bootcamp',
    category: 'technology',
    event_date: 'JAN 15, 2027',
    location: 'Pune, India',
    price: 0,
    is_featured: false,
    description: 'Full stack web development crash course covering modern frameworks and APIs.',
    imageClass: 'event-image-six'
  }
];

export interface EventItem {
  id: number;
  title: string;
  category: string;
  event_date: string;
  location: string;
  price: number | string;
  is_featured?: boolean;
  description?: string;
  imageClass?: string;
}

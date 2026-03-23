export interface Event {
  id: string;
  title?: string;
  startDate?: string;
  endDate?: string | null;
  place?: string | null;
  phone?: string | null;
  homepage?: string | null;
  description?: string | null;
  host?: string | null;
  organizer?: string | null;
  sponsor?: string | null;
  provider?: string | null;
  lat?: string | number | null;
  lon?: string | number | null;
  categories: string[];
}

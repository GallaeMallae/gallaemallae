export interface Event {
  id: string;
  name?: string;
  start_date?: string;
  end_date?: string | null;
  venue?: string | null;
  phone?: string | null;
  homepage_url?: string | null;
  description?: string | null;
  host?: string | null;
  organizer?: string | null;
  sponsor?: string | null;
  provider?: string | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  categories: string[];
  data_reference_date?: string | null;
  related_info?: string | null;
  road_address?: string | null;
  lot_address?: string | null;
}

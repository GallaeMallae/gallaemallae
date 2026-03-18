export interface PublicEventResponse {
  fstvlNm: string;
  opar?: string;
  fstvlStartDate: string;
  fstvlEndDate: string;
  fstvlCo?: string;
  mnnstNm?: string;
  auspcInsttNm?: string;
  suprtInsttNm?: string | null;
  phoneNumber?: string;
  homepageUrl?: string;
  rdnmadr?: string;
  lnmadr?: string;
  latitude: string | number;
  longitude: string | number;
  insttNm?: string;
}

export interface BaseEvent extends Omit<
  Partial<PublicEventResponse>,
  "latitude" | "longitude" | "fstvlStartDate" | "fstvlEndDate"
> {
  id: string;
  categories: string[];
  category?: string;
  start_date: string | null;
  startDate?: string;
  end_date?: string | null;
  road_address?: string | null;
  venue?: string | null;
  phone?: string | null;
  homepage_url?: string | null;
  title?: string;
  fstvlStartDate?: string | null;
  fstvlEndDate?: string | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  description?: string | null;
  host?: string | null;
  organizer?: string | null;
  sponsor?: string | null;
  provider?: string | null;
  name?: string | null; // Property 'name' 에러 해결
  endDate?: string | null; // Property 'endDate' 에러 해결
}

export type Event = BaseEvent;

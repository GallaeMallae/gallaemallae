export interface PublicEventResponse {
  fstvlNm: string;
  opar?: string;
  fstvlStartDate: string;
  fstvlEndDate: string;
  fstvlCo?: string;
  mnnstNm?: string;
  auspcInsttNm?: string;
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
  endDate?: string;
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
}

export type Event = BaseEvent;

interface FestivalItem {
  fstvlNm: string;
  opar: string;
  fstvlStartDate: string;
  fstvlEndDate: string;
  fstvlCo: string;
  mnnstNm: string;
  auspcInsttNm: string;
  suprtInsttNm: string;
  phoneNumber: string;
  homepageUrl: string;
  latitude: string;
  longitude: string;
  rdnmadr: string;
  instt_nm: string;
}

interface Event {
  id: number;
  title: string;
  place: string;
  startDate: string;
  endDate: string;
  description: string;
  host: string; // 주관기관
  organizer: string; // 주최기관
  sponsor: string; // 후원기관
  phone: string;
  homepage: string;
  lat: number;
  lng: number;
  address: string;
  provider: string; // 제공기관
}

export async function getData(): Promise<Event[]> {
  const res = await fetch("/api/events");

  if (!res.ok) {
    throw new Error("API 실패");
  }

  const data = await res.json();

  const items: FestivalItem[] = data?.response?.body?.items || [];

  return items.map((item, i) => ({
    id: i,

    title: item.fstvlNm,
    place: item.opar,
    startDate: item.fstvlStartDate,
    endDate: item.fstvlEndDate,
    description: item.fstvlCo,
    host: item.mnnstNm,
    organizer: item.auspcInsttNm,
    sponsor: item.suprtInsttNm,
    phone: item.phoneNumber,
    homepage: item.homepageUrl,
    lat: Number(item.latitude),
    lng: Number(item.longitude),
    address: item.rdnmadr,
    provider: item.instt_nm,
  }));
}

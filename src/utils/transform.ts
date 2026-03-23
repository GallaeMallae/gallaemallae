import { Event } from "@/types/event";
import { CategoryId } from "@/types/common";

export interface EventApi {
  fstvlNm?: string;
  fstvlStartDate?: string;
  fstvlEndDate?: string;
  fstvlCo?: string;
  opar?: string;
  mnnstNm?: string;
  auspcInsttNm?: string;
  suprtInsttNm?: string;
  phoneNumber?: string;
  homepageUrl?: string;
  rdnmadr?: string;
  lnmadr?: string;
  latitude?: string;
  longitude?: string;
  insttNm?: string;
}

export const transformEvent = (item: EventApi): Event | null => {
  if (!item.latitude || !item.longitude) return null;

  const text = `${item.fstvlNm}+${item.fstvlCo}`;

  let category: CategoryId;

  if (text.includes("축제")) {
    category = "festival";
  } else if (text.includes("공연")) {
    category = "performance";
  } else if (text.includes("전시")) {
    category = "exhibition";
  } else {
    category = "etc";
  }

  return {
    id: `${item.fstvlNm}-${item.fstvlStartDate}`,
    title: item.fstvlNm ?? "-",
    startDate: item.fstvlStartDate ?? "-",
    endDate: item.fstvlEndDate ?? "-",
    place: item.opar ?? "-",
    phone: item.phoneNumber ?? "-",
    homepage: item.homepageUrl ?? "-",
    description: item.fstvlCo ?? "-",
    host: item.auspcInsttNm ?? "-",
    organizer: item.mnnstNm ?? "-",
    sponsor: item.suprtInsttNm ?? "-",
    provider: item.insttNm ?? "-",
    lat: Number(item.latitude),
    lon: Number(item.longitude),
    categories: [category],
  };
};

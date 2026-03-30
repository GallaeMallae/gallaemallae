// import { CategoryId } from "@/types/common";
// import { TablesInsert } from "@/types/supabase";

// export interface EventApi {
//   fstvlNm?: string;
//   fstvlStartDate?: string;
//   fstvlEndDate?: string;
//   fstvlCo?: string;
//   opar?: string;
//   mnnstNm?: string;
//   auspcInsttNm?: string;
//   suprtInsttNm?: string;
//   phoneNumber?: string;
//   homepageUrl?: string;
//   rdnmadr?: string;
//   lnmadr?: string;
//   latitude?: string;
//   longitude?: string;
//   insttNm?: string;
//   relateInfo?: string;
//   referenceDate?: string;
// }

// export const transformEvent = (
//   item: EventApi,
// ): TablesInsert<"events"> | null => {
//   if (!item.latitude || !item.longitude) return null;

//   const text = `${item.fstvlNm}+${item.fstvlCo}`;

//   let category: CategoryId;

//   if (text.includes("축제")) {
//     category = "festival";
//   } else if (text.includes("공연")) {
//     category = "performance";
//   } else if (text.includes("전시")) {
//     category = "exhibition";
//   } else {
//     category = "etc";
//   }

//   return {
//     name: item.fstvlNm ?? "-",
//     start_date: item.fstvlStartDate ?? "-",
//     end_date: item.fstvlEndDate ?? "-",
//     venue: item.opar ?? "-",
//     phone: item.phoneNumber ?? "-",
//     homepage_url: item.homepageUrl ?? "-",
//     description: item.fstvlCo ?? "-",
//     host: item.auspcInsttNm ?? "-",
//     organizer: item.mnnstNm ?? "-",
//     sponsor: item.suprtInsttNm ?? "-",
//     provider: item.insttNm ?? "-",
//     latitude: Number(item.latitude),
//     longitude: Number(item.longitude),
//     categories: [category],
//     data_reference_date: item.referenceDate,
//     road_address: item.rdnmadr,
//     related_info: item.relateInfo,
//     lot_address: item.rdnmadr,
//   };
// };

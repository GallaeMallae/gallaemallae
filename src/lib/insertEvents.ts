// import { supabaseAdmin } from "@/lib/supabase";
// import { transformEvent } from "@/utils/transform";
// import { EventApi } from "@/utils/transform";
// import { fetchEvents } from "@/lib/api/fetchEvents";

// export const insertEvents = async () => {
//   const data: EventApi[] = await fetchEvents();
//   const today = new Date().toISOString().split("T")[0];

//   const events = data
//     .filter((event) => {
//       if (!event.fstvlEndDate) return false;
//       return event.fstvlEndDate >= today;
//     })
//     .map(transformEvent)
//     .filter(
//       (v): v is NonNullable<ReturnType<typeof transformEvent>> => v !== null,
//     );

//   const { error } = await supabaseAdmin.from("events").insert(events);

//   if (error) {
//     console.error("insert 실패:", error);
//     throw error;
//   } else {
//     console.log("insert 성공");
//   }
// };

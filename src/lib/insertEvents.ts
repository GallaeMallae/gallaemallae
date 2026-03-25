import { supabaseAdmin } from "@/lib/supabase";
import { transformEvent } from "@/utils/transform";
import { EventApi } from "@/utils/transform";

export const insertEvents = async () => {
  const SERVICE_KEY = process.env.NEXT_API_KEY;
  const res = await fetch(
    `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=100&type=json`,
  );
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`공공데이터 API 요청 실패: ${res.status}`);
  }

  const items = json?.response?.body?.items;
  if (!Array.isArray(items)) {
    throw new Error("공공데이터 API 응답 형식이 예상과 다릅니다.");
  }
  const data: EventApi[] = items;

  const events = data
    .map(transformEvent)
    .filter(
      (v): v is NonNullable<ReturnType<typeof transformEvent>> => v !== null,
    );

  const { error } = await supabaseAdmin.from("events").insert(events);

  if (error) {
    console.error("insert 실패:", error);
    throw error;
  } else {
    console.log("insert 성공");
  }
};

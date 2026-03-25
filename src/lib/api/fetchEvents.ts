export const fetchEvents = async () => {
  const SERVICE_KEY = process.env.NEXT_API_KEY;
  const res = await fetch(
    `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&type=json`,
  );

  if (!res.ok) {
    throw new Error(`공공데이터 API 요청 실패: ${res.status}`);
  }

  const json = await res.json();
  const items = json?.response?.body?.items;
  if (!Array.isArray(items)) {
    throw new Error("공공데이터 API 응답 형식이 예상과 다릅니다.");
  }
  return items;
};

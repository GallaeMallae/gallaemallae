import { FetchLocationNameResponse } from "@/types/apiResponse";

export async function fetchLocationName(
  latitude: number,
  longitude: number,
): Promise<string> {
  const REST_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    {
      headers: {
        Authorization: `KakaoAK ${REST_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("[Kakao API] : 지역명 조회 실패");
  }

  const data: FetchLocationNameResponse = await res.json();
  const address = data.documents?.[0]?.address;

  if (!address) {
    throw new Error("[Kakao API] : 유효하지 않은 주소 정보");
  }

  return `${address.region_1depth_name} ${address.region_2depth_name}`;
}

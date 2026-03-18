export interface PublicEventResponse {
  fstvlNm: string; // 축제명
  rdnmadr?: string; // 도로명주소
  lnmadr?: string; // 지번주소
  latitude: string; // 위도
  longitude: string; // 경도
  fstvlStartDate: string; // 시작일자
  fstvlEndDate: string; // 종료일자
  // 필요한 필드 추가...
}

// 우리 앱에서 사용할 깔끔한 타입
// src/types/event.ts
export interface Event {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  category: string;
  categories: string[]; // 추가됨
  startDate: string;
  start_date: string | null; // 추가됨 (필터 함수 전용)
  endDate: string;
}

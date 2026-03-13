import { EventCardItem, DetailCardItem, IntroduceType } from "@/types/common";

export const MOCK_EVENTS: EventCardItem[] = [
  {
    title: "BTS 컴백 라이브: ARIRANG BTS 컴백 라이브: ARIRANG",
    location: "광화문 광장",
    startDate: "2026-03-21",
    endDate: "2026-03-21",
    category: "공연",
    isLiked: true,
  },
  {
    title: "서울 벚꽃 축제",
    location: "여의도 한강공원",
    startDate: "2026-04-01",
    endDate: "2026-04-05",
    category: "축제",
    isLiked: false,
  },
  {
    title: "현대 미술 특별전",
    location: "국립현대미술관",
    startDate: "2026-05-10",
    endDate: "2026-06-10",
    category: "전시",
    isLiked: true,
  },
  {
    title: "푸드트럭 페스티벌",
    location: "반포 한강공원",
    startDate: "2026-03-08",
    endDate: "2026-03-12",
    category: "기타",
    isLiked: false,
  },
  {
    title: "BTS 컴백 라이브: ARIRANG BTS 컴백 라이브: ARIRANG",
    location: "광화문 광장",
    startDate: "2026-03-21",
    endDate: "2026-03-21",
    category: "공연",
    isLiked: true,
  },
  {
    title: "서울 벚꽃 축제",
    location: "여의도 한강공원",
    startDate: "2026-04-01",
    endDate: "2026-04-05",
    category: "축제",
    isLiked: false,
  },
  {
    title: "현대 미술 특별전",
    location: "국립현대미술관",
    startDate: "2026-05-10",
    endDate: "2026-06-10",
    category: "전시",
    isLiked: true,
  },
  {
    title: "푸드트럭 페스티벌",
    location: "반포 한강공원",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    category: "기타",
    isLiked: false,
  },
  {
    title: "BTS 컴백 라이브: ARIRANG BTS 컴백 라이브: ARIRANG",
    location: "광화문 광장",
    startDate: "2026-03-21",
    endDate: "2026-03-21",
    category: "공연",
    isLiked: true,
  },
  {
    title: "서울 벚꽃 축제",
    location: "여의도 한강공원",
    startDate: "2026-04-01",
    endDate: "2026-04-05",
    category: "축제",
    isLiked: false,
  },
  {
    title: "현대 미술 특별전",
    location: "국립현대미술관",
    startDate: "2026-05-10",
    endDate: "2026-06-10",
    category: "전시",
    isLiked: true,
  },
  {
    title: "푸드트럭 페스티벌",
    location: "반포 한강공원",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    category: "기타",
    isLiked: false,
  },
];

export const MOCK_DETAIL: DetailCardItem = {
  description:
    "매년 가을밤 여의도 한강공원을 화려하게 수놓는 서울 세계 불꽃 축제는 세계 정상급 불꽃팀들이 참가하여 가을 하늘에 마법같은 감동을 선사합니다.",

  organization: {
    host: "서울특별시",
    organizer: "한화",
    sponsor: "한화그룹",
    provider: "서울시 관광재단",
  },

  information: [
    "대중교통 이용을 적극 권장합니다.",
    "행사장 주변 교통 통제가 있을 예정입니다.",
    "개인 돗자리 및 보온용 의류 지참을 추천드립니다.",
  ],
};

export const MOCK_INTRODUCE: Record<IntroduceType, string> = {
  date: "2024.10.05 - 2024.10.05",
  place: "여의도 한강공원 일대",
  tel: "02-1234-5678",
  homepage: "https://www.naver.com",
};

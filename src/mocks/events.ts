import { EventCardItem } from "@/types/common";

export const MOCK_EVENTS: EventCardItem[] = [
  {
    id: 1,
    title: "BTS 컴백 라이브: ARIRANG",
    location: "광화문 광장",
    startDate: "2026-03-21",
    endDate: "2026-03-21",
    category: "공연",
    isLiked: true,
  },
  {
    id: 2,
    title: "서울 벚꽃 축제",
    location: "여의도 한강공원",
    startDate: "2026-04-01",
    endDate: "2026-04-05",
    category: "축제",
    isLiked: false,
  },
  {
    id: 3,
    title: "현대 미술 특별전",
    location: "국립현대미술관",
    startDate: "2026-05-10",
    endDate: "2026-06-10",
    category: "전시",
    isLiked: true,
  },
  {
    id: 4,
    title: "푸드트럭 페스티벌",
    location: "반포 한강공원",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    category: "기타",
    isLiked: false,
  },
];

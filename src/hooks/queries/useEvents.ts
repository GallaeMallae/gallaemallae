import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/api/events";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 60, // 축제 데이터는 자주 안 변하니까 1시간 정도 캐싱
  });
};

import { useQuery } from "@tanstack/react-query";
import { fetchEventsData } from "@/lib/api/events";
import { Event } from "@/types/event";

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEventsData,
    staleTime: 1000 * 60 * 60, // 1시간 캐싱
  });
};

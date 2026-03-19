import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/api/fetchData";
import { Event } from "@/types/event";

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 60, // 1시간 캐싱
  });
};

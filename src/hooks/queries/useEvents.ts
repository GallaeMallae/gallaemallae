import { useQuery } from "@tanstack/react-query";
import { fetchEventsData } from "@/lib/api/events";
import { Event } from "@/types/event";
import { toEvent } from "@/utils/mapper";

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const data = await fetchEventsData();
      return data.map(toEvent);
    },
    staleTime: 1000 * 60 * 60,
  });
};

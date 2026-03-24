import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchEventsData } from "@/lib/api/events";
import { toEvent } from "@/utils/mapper";
import { Event } from "@/types/event";

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: QUERY_KEYS.EVENTS,
    queryFn: async () => {
      const data = await fetchEventsData();
      return data.map(toEvent);
    },
    staleTime: 1000 * 60 * 60,
  });
};

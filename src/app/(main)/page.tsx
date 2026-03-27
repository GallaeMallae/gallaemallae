import HomeClient from "@/components/home/HomeClient";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { fetchEvents } from "@/lib/api/events";
import { QUERY_KEYS } from "@/lib/constants";

export default async function Home() {
  const queryClient = new QueryClient();
  const supabase = await createClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.EVENTS,
    queryFn: () => fetchEvents(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}

import HomeClient from "@/components/home/HomeClient";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { fetchEvents, fetchLikedEvents } from "@/lib/api/events";
import { QUERY_KEYS } from "@/lib/constants";

export default async function Home() {
  const queryClient = new QueryClient();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.EVENTS,
    queryFn: () => fetchEvents(supabase),
  });

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LIKED_EVENTS(user.id),
      queryFn: () => fetchLikedEvents(supabase, user.id),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}

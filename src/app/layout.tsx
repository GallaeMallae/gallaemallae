import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts/fonts";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { getProfile } from "@/lib/api/profile/getProfile";
import { QUERY_KEYS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "갈래말래",
  description: "위치 기반 문화 행사 추천 서비스, 갈래말래",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: () => user ?? null,
  });

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.PROFILE(user.id),
      queryFn: () => getProfile(supabase, user.id),
    });
  }

  return (
    <html lang="ko">
      <body className={`${pretendard.variable} bg-background-base font-sans`}>
        <ReactQueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthProvider initialUserId={user?.id}>{children}</AuthProvider>
          </HydrationBoundary>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

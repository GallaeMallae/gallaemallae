import "@/app/globals.css";
import { pretendard } from "@/app/fonts/fonts";
import { Toaster } from "@/components/ui/sonner";
import AlertModal from "@/components/modal/AlertModal";
import type { Metadata } from "next";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { fetchProfile } from "@/lib/api/profile";
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

  queryClient.setQueryData(QUERY_KEYS.USER, user ?? null);

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.PROFILE(user.id),
      queryFn: () => fetchProfile(supabase, user.id),
    });
  }

  return (
    <html lang="ko">
      <body className={`${pretendard.variable} bg-background-base font-sans`}>
        <ReactQueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthProvider initialUserId={user?.id}>
              {children}
              <AlertModal />
              <Toaster />
            </AuthProvider>
          </HydrationBoundary>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

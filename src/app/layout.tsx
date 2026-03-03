import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts/fonts";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import ProfileInitializer from "@/components/ProfileInitializer";

export const metadata: Metadata = {
  title: "갈래말래",
  description: "위치 기반 문화 행사 추천 서비스, 갈래말래",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans`}>
        <ReactQueryProvider>
          <AuthProvider>
            <ProfileInitializer />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

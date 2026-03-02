import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts/fonts";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";

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
      <body className={`${pretendard.variable} pb-16 font-sans md:pb-0`}>
        <ReactQueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

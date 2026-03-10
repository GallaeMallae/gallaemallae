import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 p-6">{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}

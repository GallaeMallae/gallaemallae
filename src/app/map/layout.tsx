import Header from "@/components/common/Header";
import Script from "next/script";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_KAKAO_JS_KEY is not defined");
  }

  return (
    <div>
      <Header />
      <main>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
        {children}
      </main>
    </div>
  );
}

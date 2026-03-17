"use client";

import { useKakaoLoader } from "react-kakao-maps-sdk";

export default function KakaoMapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
  });

  return <>{children}</>;
}

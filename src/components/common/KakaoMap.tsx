"use client";

import { Map } from "react-kakao-maps-sdk";

type KakaoMapProps = {
  center: { lat: number; lng: number };
  level?: number;
  children?: React.ReactNode;
  onCreate?: (map: kakao.maps.Map) => void;
};

export default function KakaoMap({
  center,
  level = 5,
  children,
  onCreate,
}: KakaoMapProps) {
  return (
    <Map
      center={center}
      level={level}
      onCreate={onCreate}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </Map>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // 구글 프로필 이미지 도메인
        port: "",
        pathname: "/a/**",
      },
      // 카카오: 구형 URL은 http로 이미지가 내려오는 경우가 있어 일부 허용
      {
        protocol: "http",
        hostname: "*.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

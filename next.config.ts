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
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net", // 카카오 프로필 이미지 도메인
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.kakaocdn.net", // 카카오 모든 서브도메인 대응
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "./PretendardVariable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

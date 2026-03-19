import { useSyncExternalStore } from "react";

export function useIsDesktop(query = "(min-width: 768px)") {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// useSyncExternalStore 훅 사용법
// return useSyncExternalStore(
//   subscribe, // 구독 등록
//   getSnapshot, // 클라이언트 현재 값(우리가 받는 최종 값)
//   getServerSnapshot, // SSR용 기본값
// );

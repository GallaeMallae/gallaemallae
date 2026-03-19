import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export async function proxy(request: NextRequest) {
  // 쿠키 만료 방지 위해 세션 갱신, response 객체에 Set-Cookie 정보 포함
  const response = await updateSession(request);

  if (request.nextUrl.pathname.startsWith("/mypage")) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      loginUrl.searchParams.set("next", request.nextUrl.pathname);

      const redirectResponse = NextResponse.redirect(loginUrl);

      // 리다이렉트 객체에 updateSession으로 만들어진 헤더 정보 복사
      response.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value);
      });

      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

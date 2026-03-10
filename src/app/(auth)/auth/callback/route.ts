import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorCode = searchParams.get("error");
  // 인증 후 이동할 페이지
  const next = searchParams.get("next") ?? "/";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  // 에러코드가 있는 에러(lib/contsants에 정리)
  if (errorCode) {
    const errorUrl = new URL("/login", origin);
    errorUrl.searchParams.set("error", errorCode);
    errorUrl.searchParams.set("next", safeNext);
    return NextResponse.redirect(errorUrl);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(safeNext, origin));
    }
  }

  // 세션 교환 실패 등 기타 에러
  const fallbackUrl = new URL("/login", origin);
  fallbackUrl.searchParams.set("error", "callback_failed");
  fallbackUrl.searchParams.set("next", safeNext);
  return NextResponse.redirect(fallbackUrl);
}

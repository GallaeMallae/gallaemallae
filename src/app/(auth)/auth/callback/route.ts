import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorCode = searchParams.get("error");
  // 인증 후 이동할 페이지
  const next = searchParams.get("next") ?? "/";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  if (errorCode) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorCode)}`, origin),
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(safeNext, origin));
    }
  }

  // 에러 발생 시 에러 코드를 가지고 로그인 페이지로 리다이렉트
  return NextResponse.redirect(new URL(`/login?error=callback_failed`, origin));
}

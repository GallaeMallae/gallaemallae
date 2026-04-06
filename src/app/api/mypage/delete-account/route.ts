import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "유저 ID가 필요합니다." },
        { status: 400 },
      );
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) throw error;

    return NextResponse.json({ message: "성공적으로 삭제되었습니다." });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    console.error("탈퇴 API 오류:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

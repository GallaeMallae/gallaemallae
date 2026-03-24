import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("DB 조회 실패:", error);
      return NextResponse.json({ error: "데이터 조회 실패" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("서버 에러:", error);
    return NextResponse.json({ error: "서버 에러 발생" }, { status: 500 });
  }
}

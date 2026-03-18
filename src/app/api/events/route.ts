import { NextResponse } from "next/server";

export async function GET() {
  const SERVICE_KEY = process.env.NEXT_API_KEY;

  const url = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=10&type=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "API 호출 실패" }, { status: 500 });
  }
}

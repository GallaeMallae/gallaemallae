import { NextResponse } from "next/server";
import { transformEvent } from "@/utils/transform";

export async function GET() {
  const SERVICE_KEY = process.env.NEXT_API_KEY;
  try {
    const res = await fetch(
      `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=100&type=json`,
    );

    const data = await res.json();

    const items = data.response?.body?.items ?? [];
    const transformed = items.map(transformEvent).filter(Boolean);

    return NextResponse.json(transformed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}

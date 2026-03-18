import { NextResponse } from "next/server";

export async function GET() {
  const serviceKey = process.env.PUBLIC_API_KEY;

  const baseUrl =
    "https://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api";

  const params = new URLSearchParams({
    serviceKey: serviceKey || "",
    type: "json",
    pageNo: "1",
    numOfRows: "20",
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API ERROR: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "데이터 가져오기 실패" },
      { status: 500 },
    );
  }
}

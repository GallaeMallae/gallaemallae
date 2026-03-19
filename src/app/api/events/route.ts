import { NextResponse } from "next/server";

export async function GET() {
  const serviceKey = process.env.NEXT_API_KEY;

  if (!serviceKey) {
    console.error("❌ 에러: 환경변수에 API 키가 없습니다.");
    return NextResponse.json({ error: "API Key missing" }, { status: 500 });
  }

  // 키에 특수문자가 포함된 경우를 대비해 디코딩 후 사용
  const decodedKey = decodeURIComponent(serviceKey);
  const url = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${decodedKey}&type=json&numOfRows=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`API 응답 오류: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: "External API Error" },
        { status: 502 },
      );
    }
    const data = await response.json();

    const items = data.response?.body?.items;

    if (!items || !Array.isArray(items)) {
      console.warn(data);
      return NextResponse.json([]);
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error("서버 라우트 내부 에러 발생:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: String(error) },
      { status: 500 },
    );
  }
}

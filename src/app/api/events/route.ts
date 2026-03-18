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
    const data = await response.json();

    // 1. 공공데이터 응답 구조가 정상인지 단계별로 확인
    // 보통 response.body.items 구조인데, 데이터가 없으면 items가 ""(빈문자열)로 올 때가 있음
    const items = data.response?.body?.items;

    if (!items || !Array.isArray(items)) {
      console.warn(
        "⚠️ 경고: API 응답에 데이터 아이템이 없거나 배열이 아닙니다.",
        data,
      );
      return NextResponse.json([]); // 빈 배열 반환해서 클라이언트 에러 방지
    }

    return NextResponse.json(items);
  } catch (error) {
    // 2. 여기서 진짜 에러 원인을 터미널에 찍어줌
    console.error("❌ 서버 라우트 내부 에러 발생:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: String(error) },
      { status: 500 },
    );
  }
}

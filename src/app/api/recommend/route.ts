import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { weather, temp, pm10, pm25 } = await req.json();

  if (!weather || temp == null || pm10 == null || pm25 == null) {
    return NextResponse.json({ error: "Invalid Params" }, { status: 400 });
  }

  const prompt = `
    현재 날씨와 미세먼지 정보를 기반으로 외출 추천 정도를 판단해라.

    입력:
    날씨: ${weather}
    기온: ${temp}
    미세먼지: ${pm10}
    초미세먼지: ${pm25}

    다음 JSON 형식으로만 응답해라.

    {
      "recommendType": "veryPositive | positive | neutral | negative",
      "comment": "판단 이유를 한 문장으로 설명"
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(content);

    return NextResponse.json({
      recommendType: parsed.recommendType,
      comment: parsed.comment,
    });
  } catch (e) {
    return NextResponse.json({ error: "OpenAI error" }, { status: 500 });
  }
}

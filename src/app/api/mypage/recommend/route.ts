import { CATEGORY_NAME_MAP } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

interface FlattenedEvent {
  id: string;
  name: string;
  categories: string[];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { data: rawLikes } = await supabase
      .from("event_likes")
      .select("events(id, name, categories)")
      .eq("user_id", user.id);

    const { data: rawPlans } = await supabase
      .from("event_plans")
      .select("events(id, name, categories)")
      .eq("user_id", user.id);

    // 조인 때문에 events 계층 추가된 것을 평탄화
    const likedEvents: FlattenedEvent[] = (
      rawLikes?.map((item) => item.events) || []
    ).filter(Boolean) as FlattenedEvent[];
    const plannedEvents: FlattenedEvent[] = (
      rawPlans?.map((item) => item.events) || []
    ).filter(Boolean) as FlattenedEvent[];

    const formatUserEventData = (events: FlattenedEvent[]) => {
      return events
        .map((e) => {
          const cats = e.categories
            .map(
              (cat) =>
                CATEGORY_NAME_MAP[cat as keyof typeof CATEGORY_NAME_MAP] || cat,
            )
            .join(", ");
          return `${e.name} [${cats}]`;
        })
        .join("\n- "); // 줄바꿈과 불렛포인트로 구분
    };

    const extractCategories = (events: FlattenedEvent[]): string[] => {
      return events.flatMap((event) =>
        event.categories.map(
          (category) =>
            CATEGORY_NAME_MAP[category as keyof typeof CATEGORY_NAME_MAP] ||
            category,
        ),
      );
    };

    const likedList = formatUserEventData(likedEvents);
    const plannedList = formatUserEventData(plannedEvents);

    // 일정 목록, 관심 목록 통틀어 어떤 카테고리 몇 회 나오는지 추출
    const allCategories = [
      ...extractCategories(likedEvents),
      ...extractCategories(plannedEvents),
    ];
    const categoryCounts = allCategories.reduce(
      (acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const userSummary = Object.entries(categoryCounts)
      .map(([name, count]) => `${name}(${count}회)`)
      .join(", ");

    // 제외할 ID 목록(이미 일정, 관심에 포함된 행사)
    const excludedIds = [
      ...likedEvents.map((event) => event.id),
      ...plannedEvents.map((event) => event.id),
    ];

    // 30일 이내의 모든 행사 후보군 조회
    const now = new Date();
    const startDate = now.toISOString().split("T")[0];
    // 30일(30 * 24시간 * 60분 * 60초 * 1000밀리초) 계산
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    let query = supabase
      .from("events")
      .select("*")
      .gte("start_date", startDate)
      .lte("start_date", endDate);

    // 이미 추가된 행사는 후보군에서 제외
    if (excludedIds.length > 0) {
      query = query.not("id", "in", `(${excludedIds.join(",")})`);
    }

    const { data: candidates, error: candidatesError } = await query;

    if (candidatesError) throw candidatesError;

    // 후보군이 하나도 없을 경우 (모든 행사를 이미 추가했을 때)
    if (!candidates || candidates.length === 0) {
      return NextResponse.json({
        message: "새로운 추천 행사가 없습니다.",
      });
    }

    // 토큰 다이어트와 추천의 다양성을 위해 무작위 셔플 후 12개 선택
    const shuffled = [...(candidates || [])].sort(() => Math.random() - 0.5);
    const shuffledCandidates = shuffled.slice(0, 12);

    // AI에게 보낼 후보군 텍스트 가공 (번호 | 제목 | 카테고리 | 날짜 | 장소 | 설명)
    const candidateText = shuffledCandidates
      .map((event, i) => {
        const koreanCategories = event.categories
          .map(
            (category) =>
              CATEGORY_NAME_MAP[category as keyof typeof CATEGORY_NAME_MAP] ||
              category,
          )
          .join(",");

        const address =
          event.road_address || event.lot_address || "지역 정보 없음";
        const shortAddress = address.split(" ").slice(0, 2).join(" "); // 울산광역시 남구, 경기도 하남시 ...

        return `${i} | ${event.name} | ${koreanCategories} | ${event.start_date} | 장소: ${shortAddress} | 설명: ${event.description}`;
      })
      .join("\n");

    const prompt = `
      # 페르소나: 전문 이벤트 큐레이터
      # 입력 데이터
      - 1. 사용자 관심 리스트 (과거 이력):
        - ${likedList || "없음"}
        
        2. 사용자 일정 추가 리스트 (강한 선호):
        - ${plannedList || "없음"}
        
        3. 선호 카테고리 통계: ${userSummary}
      - 추천 후보군 (번호 | 제목 | 카테고리 | 날짜 | 장소 | 설명):
      ${candidateText}

      # 지시 사항: 사용자의 선호 카테고리와 가장 유사한 후보의 '번호'를 하나 골라라. 추천 이유는 사용자의 취향과 현재 상황을 결합하여 한 문장으로 써라.

      # 평가 및 선정 프로세스 (우선순위 순)
      Step 1. [취향 일치도 - 60%]: 유저 선호 카테고리와 후보 매칭.
      Step 2. [물리적 거리 - 25%]: 사용자의 현재 위치와 행사 장소의 거리를 고려해라. (가까울수록 가점)
      Step 3. [시급성 - 15%]: 행사 시작일이 오늘과 가까운지 고려하라.

      # 응답 형식 (JSON)
      {
        "idx": 선정된 번호(숫자),
        "reason": "추천 이유"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    console.log("completion", completion);

    const aiResult = JSON.parse(completion.choices[0].message.content || "{}");
    console.log("aiResult: ", aiResult);
    const selectedEvent = shuffledCandidates[aiResult.idx];
    console.log("selectedEvent: ", selectedEvent);

    if (!selectedEvent) throw new Error("AI가 유효하지 않은 번호를 선택함");

    return NextResponse.json({
      ...selectedEvent,
      // recommendReason: aiResult.reason,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "추천 처리 중 오류 발생" },
      { status: 500 },
    );
  }
}

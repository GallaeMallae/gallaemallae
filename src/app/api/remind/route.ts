import { Database } from "@/types/supabase";
import { createClient, QueryData } from "@supabase/supabase-js";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  // 해당 부분 보안 로직은 Vercel에서 CRON_SECRET 발급받아서 적용시 사용
  // const authHeader = req.headers.get("authorization");
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );

  try {
    const now = new Date();
    // 만약 배포 환경(Vercel)이라면 UTC 기준이므로 한국 시간에 맞추기 위해 9시간을 더함
    const kstOffset = 9 * 60 * 60 * 1000;
    const isVercel = process.env.VERCEL === "1"; // Vercel 환경인지 확인
    const kstNow = isVercel ? new Date(now.getTime() + kstOffset) : now;
    // Vercel 환경 변수에서 Key: TZ, Value: Asia/Seoul 라고 설정시 계산 필요 없이 new Date()로 한국 시간 사용 가능

    const targetDate = format(addDays(kstNow, 7), "yyyy-MM-dd");

    const query = supabase
      .from("event_plans")
      .select(
        `
        profiles:user_id ( email, nickname ),
        events:event_id!inner ( 
          name, venue, start_date, road_address, lot_address, phone, homepage_url, organizer 
        )
      `,
      )
      .eq("events.start_date", targetDate);

    type ReminderItems = QueryData<typeof query>;
    const { data: list, error } = await query;

    if (error) throw error;
    if (!list || list.length === 0) {
      return NextResponse.json({
        message: `${targetDate} 행사 시작 대상 없음`,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const sendResults = await Promise.allSettled(
      (list as ReminderItems).map(async (item) => {
        // Supabase 조인은 결과가 배열로 나와서 인덱스로 첫 요소 선택
        const profile = Array.isArray(item.profiles)
          ? item.profiles[0]
          : item.profiles;
        const e = Array.isArray(item.events) ? item.events[0] : item.events;

        if (!profile || !e) return;

        const { email, nickname } = profile;
        const displayDate = format(new Date(e.start_date), "M월 d일 (eeee)", {
          locale: ko,
        });
        const address =
          e.road_address || e.lot_address || "상세 주소 정보 없음";

        return transporter.sendMail({
          from: `갈래말래 <${process.env.GOOGLE_USER}>`,
          to: email,
          subject: `[D-7] ${nickname}님, '${e.name}'가 일주일 앞으로 다가왔습니다!`,
          html: `
            <div style="max-width: 550px; margin: 0 auto; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 15px 0 0 0; font-size: 28px; letter-spacing: -0.5px;">행사가 일주일 남았습니다!</h1>
              </div>
              
              <div style="padding: 40px 30px; color: #1f2937;">
                <p style="font-size: 18px; margin-bottom: 20px;">안녕하세요, <b>${nickname}</b>님!</p>
                <p style="line-height: 1.7; color: #4b5563;">설레는 마음으로 기다리시던 <b>${e.name}</b> 행사가 어느덧 일주일 뒤로 다가왔습니다. 잊지 않으시도록 정보를 정리해 드려요.</p>
                
                <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <h3 style="margin: 0 0 20px 0; color: #0369a1; font-size: 20px;">📍 행사 상세 정보</h3>
                  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; width: 70px; vertical-align: top;"><b>행사명</b></td>
                      <td style="padding: 8px 0 8px 10px; color: #111827;">${e.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><b>일시</b></td>
                      <td style="padding: 8px 0 8px 10px; color: #111827;">${displayDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><b>장소</b></td>
                      <td style="padding: 8px 0 8px 10px; color: #111827;">${e.venue}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><b>주소</b></td>
                      <td style="padding: 8px 0 8px 10px; color: #111827; font-size: 14px;">${address}</td>
                    </tr>
                    ${
                      e.homepage_url
                        ? `
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><b>홈페이지</b></td>
                            <td style="padding: 8px 0 8px 10px; color: #111827; font-size: 14px;">
                              <a href="${e.homepage_url}" style="color: #0ea5e9; text-decoration: underline; font-size: 14px; opacity: 0.8;">
                                행사 공식 홈페이지 가기
                              </a>
                            </td>
                          </tr>
                          `
                        : ""
                    }
                    ${e.phone ? `<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><b>문의</b></td><td style="padding: 8px 0 8px 10px; color: #111827;">${e.phone}</td></tr>` : ""}
                  </table>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://gallaemallae.vercel.app"}/mypage" 
                    style="background-color: #0ea5e9; color: white; padding: 16px 40px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; display: inline-block; transition: all 0.2s;">
                    내 일정 자세히 보기
                  </a>
                </div>
              </div>

              <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #f3f4f6;">
                <p style="margin: 0; font-size: 13px; color: #9ca3af;">본 메일은 시스템에 의해 자동 발송된 메시지입니다.</p>
                <div style="margin-top: 15px;">
                  <span style="font-weight: bold; color: #3b82f6;">갈래말래</span>
                </div>
              </div>
            </div>
          `,
        });
      }),
    );

    return NextResponse.json({
      message: "발송 작업 완료",
      total: list.length,
      results: sendResults.map((result) => result.status),
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 에러가 발생했습니다.";
    console.error("Cron Error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Vercel 배포 시 프로젝트 루트 디렉토리에 vercel.json 파일에 넣어줘야 함
// 밤 12시 넘어가면 remind 호출해서 메일 보내는 crons
// {
//   "crons": [
//     {
//       "path": "/api/cron/remind",
//       "schedule": "0 0 * * *"
//     }
//   ]
// }

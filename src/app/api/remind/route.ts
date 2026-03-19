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
            <div style="max-width: 560px; margin: 0 auto; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; background-color: #ffffff; border: 1px solid #ebebeb; border-radius: 20px; overflow: hidden;">
              <div style="background-color: #0da3e4; padding: 40px 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; line-height: 1.3; font-weight: 600;">행사 리마인드 알림</h1>
              </div>
              
              <div style="padding: 40px 32px; color: #333333;">
                <p style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">안녕하세요, ${nickname}님!</p>
                <p style="font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 32px;">
                  설레는 마음으로 기다리시던 <b>${e.name}</b> 행사가 어느덧 일주일 뒤로 다가왔습니다. 잊지 않으시도록 정보를 정리해 드려요.
                </p>
                
                <div style="background-color: #e7f6fc; border-left: 4px solid #0da3e4; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                  <h3 style="margin: 0 0 16px 0; color: #0da3e4; font-size: 20px; font-weight: 600;">📍 행사 상세 정보</h3>
                  <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
                    <tr>
                      <td style="padding: 8px 0; color: #666666; width: 80px; vertical-align: top; font-size: 14px;"><b>행사명</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111; font-weight: 500;">${e.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>일시</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111;">${displayDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>장소</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111;">${e.venue}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>주소</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111;">${address}</td>
                    </tr>
                    ${
                      e.homepage_url
                        ? `
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>링크</b></td>
                      <td style="padding: 8px 0 8px 16px;">
                        <a href="${e.homepage_url}" style="color: #0da3e4; text-decoration: underline;">공식 홈페이지</a>
                      </td>
                    </tr>`
                        : ""
                    }
                    ${
                      e.phone
                        ? `
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>문의</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111;">${e.phone}</td>
                    </tr>`
                        : ""
                    }
                  </table>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://gallaemallae.vercel.app"}/mypage" 
                    style="background-color: #0da3e4; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; display: inline-block;">
                    내 일정 자세히 보기
                  </a>
                </div>
              </div>

              <div style="background-color: #f9fafb; padding: 32px; text-align: center; border-top: 1px solid #ebebeb;">
                <p style="margin: 0; font-size: 12px; color: #666666; line-height: 1.4;">본 메일은 시스템에 의해 자동 발송된 메시지입니다.</p>
                <div style="margin-top: 16px;">
                  <span style="font-weight: 700; color: #0da3e4; font-size: 14px;">갈래말래 Gallaemallae</span>
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
//       "path": "/api/remind",
//       "schedule": "0 0 * * *"
//     }
//   ]
// }

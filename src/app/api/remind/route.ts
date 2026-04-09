import { Database } from "@/types/supabase";
import { getKstNow } from "@/utils/date";
import { createClient, QueryData } from "@supabase/supabase-js";
import { addDays, format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("Missing CRON_SECRET");
    return new Response("Server misconfigured", { status: 500 });
  }
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );

  try {
    const targetDate = format(addDays(getKstNow(), 7), "yyyy-MM-dd");

    const query = supabase
      .from("event_plans")
      .select(
        `
        visit_date,
        profiles:user_id ( email, nickname ),
        events:event_id ( 
          name, 
          venue, 
          start_date, 
          phone, 
          homepage_url, 
          organization,
          sido,
          sigungu,
          eupmyeondong
        )
      `,
      )
      .eq("visit_date", targetDate);

    type ReminderItems = QueryData<typeof query>;

    const { data: list, error } = await query;

    if (error) throw error;
    if (!list || list.length === 0) {
      return NextResponse.json({
        message: `${targetDate} 방문 예정 대상 없음`,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    let attempted = 0;
    let skipped = 0;
    let failed = 0;
    const failures: unknown[] = [];

    const sendResults = await Promise.allSettled(
      (list as ReminderItems).map(async (item) => {
        if (!item.visit_date)
          return { type: "skipped", reason: "Missing visit_date" };

        const profile = Array.isArray(item.profiles)
          ? item.profiles[0]
          : item.profiles;
        const e = Array.isArray(item.events) ? item.events[0] : item.events;

        if (!profile || !e)
          return { type: "skipped", reason: "Missing profile or event data" };

        const displayVisitDate = format(
          parseISO(item.visit_date),
          "M월 d일 (eeee)",
          { locale: ko },
        );
        const { email, nickname } = profile;
        const dateParam = item.visit_date;
        const monthParam = item.visit_date.slice(0, 7);
        const fullAddress =
          [e.sido, e.sigungu, e.eupmyeondong].filter(Boolean).join(" ") ||
          "주소 정보 없음";
        const mypageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/mypage?date=${dateParam}&month=${monthParam}`;

        try {
          await transporter.sendMail({
            from: `갈래말래 <${process.env.GOOGLE_USER}>`,
            to: email,
            subject: `[D-7] ${nickname}님, '${e.name}' 방문 일주일 전입니다!`,
            html: `
            <div style="max-width: 560px; margin: 0 auto; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; background-color: #ffffff; border: 1px solid #ebebeb; border-radius: 20px; overflow: hidden;">
              <div style="background-color: #0da3e4; padding: 40px 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; line-height: 1.3; font-weight: 600;">방문 리마인드 알림</h1>
              </div>
              
              <div style="padding: 40px 32px; color: #333333;">
                <p style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">안녕하세요, ${nickname}님!</p>
                <p style="font-size: 16px; line-height: 1.6; color: #444444; margin-bottom: 32px;">
                  일정에 추가하셨던 <b>${e.name}</b> 방문일이 일주일 앞으로 다가왔습니다.
                </p>
                
                <div style="background-color: #e7f6fc; border-left: 4px solid #0da3e4; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                  <h3 style="margin: 0 0 16px 0; color: #0da3e4; font-size: 20px; font-weight: 600;">📍 방문 예정 정보</h3>
                  <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
                    <tr>
                      <td style="padding: 8px 0; color: #666666; width: 80px; vertical-align: top; font-size: 14px;"><b>행사명</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111; font-weight: 500;">${e.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>방문 예정일</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111; font-weight: 600;">${displayVisitDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>장소</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111;">${e.venue || "정보 없음"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>주소</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111;">${fullAddress}</td>
                    </tr>
                    ${
                      e.organization
                        ? `
                    <tr>
                      <td style="padding: 8px 0; color: #666666; vertical-align: top; font-size: 14px;"><b>주최</b></td>
                      <td style="padding: 8px 0 8px 16px; color: #111111;">${e.organization}</td>
                    </tr>`
                        : ""
                    }
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
                  <a href="${mypageUrl}" 
                    style="background-color: #0da3e4; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; display: inline-block;">
                    내 일정 확인하기
                  </a>
                </div>
              </div>
            </div>
          `,
          });

          return { type: "sent", to: email };
        } catch (err) {
          throw err;
        }
      }),
    );

    sendResults.forEach((result) => {
      if (result.status === "fulfilled") {
        // 성공한 프로미스 중 'skipped'와 'sent' 구분
        if (result.value.type === "skipped") {
          skipped++;
        } else {
          attempted++; // 실제 발송 시도(성공)
        }
      } else {
        failed++;
        attempted++; // 발송을 시도했으나 실패함
        failures.push(result.reason);
      }
    });

    // 실패 건수가 하나라도 있으면 500 혹은 207(Multi-Status) 반환
    const status = failed > 0 ? 500 : 200;

    return NextResponse.json(
      {
        message: failed > 0 ? "일부 발송 실패 발생" : "작업 완료",
        metrics: {
          total_records: list.length,
          sent: attempted - failed,
          skipped: skipped,
          failed: failed,
        },
        errors: failures.length > 0 ? failures : undefined,
      },
      { status },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 에러가 발생했습니다.";
    console.error("Cron Error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

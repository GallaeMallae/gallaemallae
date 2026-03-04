import { MypageCalendar } from "@/components/MypageCalendar";

export default function Mypage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="h-40 rounded-xl bg-white p-4 shadow">프로필</div>
        <div className="h-40 rounded-xl bg-blue-500 p-4 text-white shadow">
          날씨
        </div>
        <div className="h-40 rounded-xl bg-white p-4 shadow">축제추천</div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="flex flex-col gap-8 lg:col-span-1">
          <div className="h-64 rounded-xl bg-white p-4 shadow">
            나의 일정 목록
          </div>
          <div className="h-64 rounded-xl bg-white p-4 shadow">
            나의 관심 목록
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow lg:col-span-3">
          <MypageCalendar />
        </div>
      </div>
    </div>
  );
}

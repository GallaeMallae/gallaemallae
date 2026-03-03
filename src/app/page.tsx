import { Button } from "@/components/ui/button";
import RecommendationCard from "@/components/common/RecommendCard";

export default function Home() {
  return (
    <div className="p-4">
      <p>갈래말래</p>
      <p className="font-semibold">갈래말래 세미볼드</p>
      <p className="font-bold">갈래말래 볼드</p>

      <br />

      {/* Headings 클래스명 작성 X - 태그만 써도 됨 */}
      <h1>갈래말래 h1</h1>
      <h2>갈래말래 h2</h2>
      <h3>갈래말래 h3</h3>

      {/* Body 클래스명 작성 O  */}
      <p className="text-title1">갈래말래 타이틀1</p>
      <p className="text-title2">갈래말래 타이틀2</p>
      <p className="text-desc1">갈래말래 본문1</p>
      <p className="text-desc2">갈래말래 본문1</p>
      <p className="text-caption">갈래말래</p>

      <br />

      <div className="mb-4 flex gap-2">
        <Button className="bg-symbol-sky-sub text-symbol-sky">Go</Button>
        <Button className="bg-symbol-brown">Go</Button>
        <Button className="bg-festival-sub text-festival">축제</Button>
        <Button className="bg-performance-sub text-performance">공연</Button>
        <Button className="bg-exhibition-sub text-exhibition">전시</Button>
        <Button className="bg-etc-sub text-etc">기타</Button>
      </div>

      <div className="flex flex-col gap-4">
        <RecommendationCard recommendLevel="veryPositive" />
        <RecommendationCard recommendLevel="positive" />
        <RecommendationCard recommendLevel="neutral" />
        <RecommendationCard recommendLevel="negative" />
      </div>
    </div>
  );
}

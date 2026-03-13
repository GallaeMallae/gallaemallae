import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export default function EventDetailModalButton() {
  return (
    <div className="flex gap-4">
      <Button className="bg-symbol-sky text-desc1! flex h-12 flex-1 text-white">
        나의 일정에 추가하기
        <ArrowRight size={20} />
      </Button>

      <Button size="icon" variant="ghost">
        <Heart size={24} className="text-slate-300" />
      </Button>
    </div>
  );
}

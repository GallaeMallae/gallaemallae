import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function MoreCard({ onClick }: { onClick: () => void }) {
  return (
    <Card className="cursor-pointer rounded-2xl" onClick={onClick}>
      <CardContent className="flex flex-col items-center justify-center gap-4 py-6">
        <div className="bg-symbol-sky flex h-10 w-10 items-center justify-center rounded-full">
          <Plus className="h-6 w-6 text-white" />
        </div>

        <span className="text-caption text-symbol-sky font-bold">더보기</span>
      </CardContent>
    </Card>
  );
}

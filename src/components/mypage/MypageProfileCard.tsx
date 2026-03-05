import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MypageProfileCard() {
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl">
      <CardContent className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-full flex-col items-center justify-center gap-4 md:gap-2 lg:flex-row lg:gap-4">
          <div className="flex shrink-0 items-center justify-center">
            <div className="size-16 rounded-full bg-red-300 md:size-14 lg:size-20" />
          </div>
          <div className="flex h-full flex-col items-center justify-center overflow-hidden">
            <div className="text-title2 w-full text-center font-bold">
              닉네임
            </div>
            <div className="text-muted-foreground w-full truncate text-center text-sm sm:text-left">
              test1234@email.com
            </div>
          </div>
        </div>
        <Button variant="outline" className="hover:bg-muted w-full font-bold">
          프로필 수정
        </Button>
      </CardContent>
    </Card>
  );
}

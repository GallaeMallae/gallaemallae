import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MypageProfileCard() {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardContent className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-full flex-col items-center justify-center gap-4 sm:gap-6 lg:flex-row">
          <div className="flex shrink-0 items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-red-300" />
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

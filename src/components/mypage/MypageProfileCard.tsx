"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function MypageProfileCard() {
  // supabase 데이터 연동 전까지 state 사용
  const [nickname, setNickname] = useState("닉네임");
  const [email, setEmail] = useState("test1234@email.com");

  const handleSave = () => {
    // TODO: Supabase로 프로필 변경 요청 추후 추가 필요
    console.log("저장 데이터:", { nickname, email });
  };

  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl">
      <CardContent className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-full flex-col items-center justify-center gap-4 md:gap-2">
          <div className="flex shrink-0 items-center justify-center">
            <div className="size-16 rounded-full bg-red-300 md:size-14" />
          </div>
          <div className="flex h-full flex-col items-center justify-center overflow-hidden">
            <div className="text-desc1 w-full text-center font-bold">
              닉네임
            </div>
            <div className="text-muted-foreground text-caption w-full truncate text-center sm:text-left">
              test1234@email.com
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="hover:bg-muted w-full font-bold"
            >
              프로필 수정
            </Button>
          </DialogTrigger>

          <DialogContent className="rounded-2xl sm:max-w-100">
            <DialogHeader>
              <DialogTitle className="text-title1 font-bold">
                프로필 수정
              </DialogTitle>
              <DialogDescription>
                수정하고자 하는 별명과 이메일을 입력하세요.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="flex flex-col items-center gap-3">
                <div className="size-20 rounded-full bg-red-300 shadow-inner" />
                <Button
                  variant="outline"
                  className="hover:bg-muted w-full rounded-2xl font-bold"
                >
                  이미지 변경
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-desc2 font-medium">
                    별명
                  </Label>
                  <Input
                    id="name"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="focus-visible:ring-symbol-sky rounded-2xl border-gray-200"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-desc2 font-medium">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus-visible:ring-symbol-sky rounded-2xl border-gray-200"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleSave}
                className="bg-symbol-sky w-full rounded-2xl font-bold text-white"
              >
                변경 내용 저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

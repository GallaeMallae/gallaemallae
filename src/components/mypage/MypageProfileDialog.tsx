import { Button } from "@/components/ui/button";
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
import { Tables } from "@/types/supabase";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Profile = Tables<"profiles">;

interface MypageProfileDialogProps {
  profile: Profile | null | undefined;
}

export default function MypageProfileDialog({
  profile,
}: MypageProfileDialogProps) {
  const [nickname, setNickname] = useState(profile?.nickname || "");
  const [email, setEmail] = useState(profile?.email || "");

  const handleSave = () => {
    console.log(nickname, email);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-muted w-full font-bold">
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
            <div className="bg-etc-sub relative flex size-30 items-center justify-center overflow-hidden rounded-full border md:size-20">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="프로필"
                  fill
                  className="object-cover"
                />
              ) : (
                <User strokeWidth={1.2} className="text-etc h-10 w-10" />
              )}
            </div>
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
  );
}

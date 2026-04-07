"use client";

import MypageProfileEditForm from "@/components/mypage/MypageProfileEditForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Profile } from "@/types/common";
import { useState } from "react";

interface MypageProfileDialogProps {
  profile: Profile | null | undefined;
}

export default function MypageProfileDialog({
  profile,
}: MypageProfileDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-muted w-full font-bold">
          프로필 관리
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-100">
        {profile && (
          <MypageProfileEditForm
            profile={profile}
            open={open}
            onSuccess={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

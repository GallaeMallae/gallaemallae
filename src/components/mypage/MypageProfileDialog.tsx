"use client";

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
import { useUpdateProfile } from "@/hooks/queries/useUpdateProfile";
import { Profile } from "@/types/common";
import { User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface MypageProfileDialogProps {
  profile: Profile | null | undefined;
}

export default function MypageProfileDialog({
  profile,
}: MypageProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState(profile?.nickname || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayImageUrl = previewUrl || profile?.avatar_url;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // 이미지 여러 번 업로드 시 메모리 누수 방지를 위한 cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("지원하지 않는 파일 형식입니다. (JPG, PNG, WebP만 가능)");
      return;
    }

    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }

    e.target.value = "";
  };

  const handleRemovePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setAvatarFile(null);
    setPreviewUrl(null);
  };

  const handleSave = () => {
    if (!profile?.id) return;

    updateProfile(
      {
        userId: profile.id,
        nickname,
        email,
        avatarFile,
        currentAvatarUrl: profile.avatar_url,
      },
      {
        onSuccess: () => {
          toast("프로필 수정이 완료되었습니다.");
          setOpen(false);
          setAvatarFile(null);
          setPreviewUrl(null);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <div className="relative size-30 md:size-20">
              <div className="bg-etc-sub relative h-full w-full overflow-hidden rounded-full border">
                {displayImageUrl ? (
                  <Image
                    src={displayImageUrl}
                    alt="프로필"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User strokeWidth={1.2} className="text-etc h-10 w-10" />
                  </div>
                )}
              </div>
              {previewUrl && (
                <button
                  onClick={handleRemovePreview}
                  className="transition-hover hover:bg-etc-sub absolute -top-1 -right-1 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full border bg-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* 파일 업로드를 위한 투명 input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleFileChange}
            />

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
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
            disabled={isPending}
            className="bg-symbol-sky w-full rounded-2xl font-bold text-white"
          >
            {isPending ? "저장 중..." : "변경 내용 저장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

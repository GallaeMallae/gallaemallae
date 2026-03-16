"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";
import { cn } from "@/lib/utils";
import { Profile } from "@/types/common";
import { User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface MypageProfileEditFormProps {
  profile: Profile;
  onSuccess: () => void;
}

export default function MypageProfileEditForm({
  profile,
  onSuccess,
}: MypageProfileEditFormProps) {
  const [nickname, setNickname] = useState(profile.nickname || "");
  const [email, setEmail] = useState(profile.email || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState({ nickname: "", email: "" });

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // 이미지 여러 번 업로드 시 메모리 누수 방지를 위한 cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const displayImageUrl = previewUrl || profile?.avatar_url;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isChanged =
    nickname !== (profile?.nickname || "") ||
    email !== (profile?.email || "") ||
    avatarFile !== null;

  const isFormInvalid =
    !!errors.nickname || !!errors.email || !nickname.trim() || !email.trim();

  const validateNickname = (nickname: string) => {
    if (!nickname.trim()) return "닉네임을 입력해 주세요.";
    if (nickname.length < 2) return "닉네임은 최소 2글자 이상이어야 합니다.";
    if (nickname.length > 8) return "닉네임은 최대 8글자 이하여야 합니다.";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return "이메일을 입력해 주세요.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setNickname(nickname);
    setErrors((prev) => ({ ...prev, nickname: validateNickname(nickname) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

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
    if (errors.nickname || errors.email) {
      toast.error("양식이 잘못되었습니다.");
      return;
    }

    updateProfile(
      {
        userId: profile.id,
        nickname: nickname.trim(),
        email: email.trim(),
        avatarFile,
        currentAvatarUrl: profile.avatar_url,
      },
      {
        onSuccess: () => {
          toast.success("프로필 수정이 완료되었습니다.");
          onSuccess();
        },
      },
    );
  };

  return (
    <div className="grid gap-6 py-4">
      <DialogHeader>
        <DialogTitle className="text-title1 font-bold">프로필 수정</DialogTitle>
        <DialogDescription>
          수정하고자 하는 닉네임과 이메일을 입력하세요.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-4">
        <div className="flex flex-col items-center gap-4">
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
                type="button"
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
            <Label htmlFor="nickname" className="text-desc2 font-semibold">
              닉네임
            </Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              className={cn(
                "rounded-2xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                "focus-visible:border-symbol-sky focus-visible:border-2",
                errors.nickname &&
                  "border-destructive focus-visible:border-destructive border-2",
              )}
            />
            {errors.nickname && (
              <p className="text-destructive text-caption">{errors.nickname}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-desc2 font-semibold">
              이메일
            </Label>
            <Input
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={cn(
                "rounded-2xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                "focus-visible:border-symbol-sky border focus-visible:border-2",
                errors.email &&
                  "border-destructive focus-visible:border-destructive",
              )}
            />
            {errors.email && (
              <p className="text-destructive text-caption">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={handleSave}
          disabled={isPending || isFormInvalid || !isChanged}
          className="hover:bg-symbol-sky w-full rounded-2xl font-bold text-white"
        >
          {isPending ? "저장 중..." : "변경 내용 저장"}
        </Button>
      </DialogFooter>
    </div>
  );
}

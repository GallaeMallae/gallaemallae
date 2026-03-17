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
import imageCompression from "browser-image-compression";
import { validateEmail, validateNickname } from "@/utils/validation";

interface MypageProfileEditFormProps {
  profile: Profile;
  open: boolean;
  onSuccess: () => void;
}

export default function MypageProfileEditForm({
  profile,
  open,
  onSuccess,
}: MypageProfileEditFormProps) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState({ nickname: "", email: "" });

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  useEffect(() => {
    if (open) {
      setNickname(profile.nickname || "");
      setEmail(profile.email || "");
      setAvatarFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setErrors({ nickname: "", email: "" });
    }
  }, [profile, open]);

  // 이미지 여러 번 업로드 시 메모리 누수 방지를 위한 cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const displayImageUrl = previewUrl || profile?.avatar_url;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isChanged =
    nickname !== (profile.nickname || "") ||
    email !== (profile.email || "") ||
    avatarFile !== null;

  const isFormInvalid =
    !!errors.nickname || !!errors.email || !nickname.trim() || !email.trim();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("지원하지 않는 파일 형식입니다. (JPG, PNG, WebP만 가능)");
      return;
    }

    const options = {
      maxSizeMB: 2,
      useWebWorker: true,
    };
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB 제한 설정 (1MB = 1024 * 1024 bytes)

    try {
      toast.loading("이미지 최적화 중...", { id: "compressing" });

      const compressedFile = await imageCompression(file, options);

      toast.dismiss("compressing");

      if (compressedFile.size > MAX_FILE_SIZE) {
        toast.error("최적화 후에도 파일이 너무 큽니다.");
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setAvatarFile(compressedFile);
      setPreviewUrl(URL.createObjectURL(compressedFile));
    } catch (error) {
      toast.dismiss("compressing");
      toast.error("이미지 최적화 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      e.target.value = "";
    }
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
                  "border-destructive focus-visible:border-destructive border-2",
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

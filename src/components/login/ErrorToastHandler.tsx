"use client";

import { toast } from "sonner";
import { ERROR_MESSAGE_CONFIG } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ErrorToastHandlerProps {
  error: string | null;
}

export default function ErrorToastHandler({ error }: ErrorToastHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(
        ERROR_MESSAGE_CONFIG[error] ?? "로그인 중 오류가 발생했습니다.",
      );

      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");
      const nextQuery = params.toString();

      router.replace(nextQuery ? `/login?${nextQuery}` : "/login", {
        scroll: false,
      });
    }
  }, [error, searchParams, router]);

  return null;
}

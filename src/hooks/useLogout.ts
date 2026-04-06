import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/constants";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const logout = async (options?: {
    message?: string | null;
    errorMessage?: string;
    redirectTo?: string;
    toastId?: string;
  }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      if (options?.redirectTo) {
        queryClient.clear();
      } else {
        queryClient.removeQueries({ queryKey: QUERY_KEYS.USER });
        queryClient.removeQueries({ queryKey: QUERY_KEYS.PROFILE() });
      }

      if (options?.message !== null) {
        toast.success(options?.message || "로그아웃 되었습니다.", {
          id: options?.toastId,
        });
      }
    } catch (error) {
      toast.error(
        options?.errorMessage || "로그아웃 처리 중 오류가 발생했습니다.",
        { id: options?.toastId },
      );
      console.error(error);
    } finally {
      if (options?.redirectTo) {
        setTimeout(() => {
          window.location.href = options.redirectTo!;
        }, 2000);
      } else if (!options?.redirectTo) {
        router.replace("/");
        router.refresh();
      }
    }
  };

  return { logout };
};

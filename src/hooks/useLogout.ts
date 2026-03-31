import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/constants";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("로그아웃에 실패했습니다.");
      return;
    }

    queryClient.removeQueries({ queryKey: QUERY_KEYS.USER });
    queryClient.removeQueries({ queryKey: QUERY_KEYS.PROFILE() });

    router.replace("/");
    router.refresh(); // refresh 해야 바뀐 쿠키 상태를 반영할 수 있음

    toast.success("로그아웃 되었습니다.");
  };

  return { logout };
};

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithOAuthAction(
  provider: "google" | "kakao",
  next: string = "/",
) {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return redirect("/login?error=config_error");
  }

  const callbackUrl = new URL("/auth/callback", siteUrl);
  callbackUrl.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl.toString(),
    },
  });

  if (error) {
    console.error("OAuth error:", error.message);
    return redirect("/login?error=oauth_signin_failed");
  }

  if (data.url) {
    redirect(data.url);
  }

  return redirect("/login?error=unknown_error");
}

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithOAuthAction(provider: "google" | "kakao") {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return redirect("/login?error=config_error");
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: new URL("/auth/callback", siteUrl).toString(),
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

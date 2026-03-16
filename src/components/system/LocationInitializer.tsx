"use client";

import { useInitLocation } from "@/hooks/useInitLocation";

export default function LocationInitializer() {
  useInitLocation();
  return null;
}

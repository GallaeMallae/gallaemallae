import { Event } from "@/types/common";
import { Tables } from "@/types/supabase";

export const transformEvent = (dbRow: Tables<"events">): Event => {
  const formatNumber = (
    value: number | null | undefined,
    unit: string = "",
  ) => {
    if (value === null || value === undefined || isNaN(Number(value)))
      return "-";
    return `${value.toLocaleString()}${unit}`;
  };

  return {
    ...dbRow,
    categories: (dbRow.categories as string[]) || [],

    visitor_count: formatNumber(dbRow.visitor_count, "명"),

    organization: dbRow.organization?.trim() || "-",
    holding_cycle: dbRow.holding_cycle?.trim() || "-",

    description: dbRow.description || "상세 정보가 등록되지 않았습니다.",
    related_info: dbRow.related_info || "관련 정보가 없습니다.",
  };
};

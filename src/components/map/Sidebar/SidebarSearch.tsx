"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  return (
    <>
      <div className="bg-etc-sub flex h-12 items-center rounded-lg px-4">
        <Search size={22} className="text-etc" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="어떤 행사를 찾으시나요?"
          className="placeholder:text-title2 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </>
  );
}

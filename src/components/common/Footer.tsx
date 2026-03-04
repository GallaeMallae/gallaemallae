import { Separator } from "../ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted w-full">
      <div className="flex h-14 flex-col items-center justify-center gap-2 md:relative md:flex-row md:items-center md:justify-start md:px-4">
        <div className="text-caption text-etc flex h-4 items-center gap-2 md:gap-4">
          {/* Todo: 링크 연결 */}
          <Link href="/">이용약관</Link>
          <Separator orientation="vertical" />
          <Link href="/">개인정보처리방침</Link>
        </div>

        <small className="md:absolute md:left-1/2 md:-translate-x-1/2">
          © gallaemallae. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

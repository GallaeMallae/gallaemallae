import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        <Link href="/" aria-label="홈으로 이동">
          <Image
            className="h-8 w-auto"
            src="/images/logo.png"
            width={100}
            height={50}
            alt="갈래말래 로고"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <div className="text-etc text-desc2 flex h-4 items-center gap-4">
            <Link
              href={{
                pathname: "/map",
                query: { mode: "all" },
              }}
              className="hover:text-black"
            >
              지도로 행사 찾기
            </Link>
            <Separator orientation="vertical" />
            <Link
              href={{
                pathname: "/map",
                query: { mode: "near" },
              }}
              className="hover:text-black"
            >
              내 주변 행사 찾기
            </Link>
          </div>

          <Button className="hover:bg-symbol-sky" size="sm" asChild>
            <Link href="/login">로그인</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

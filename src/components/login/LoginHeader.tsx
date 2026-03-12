import Link from "next/link";
import Image from "next/image";

export default function LoginHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="flex h-14 items-center px-6">
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
      </div>
    </header>
  );
}

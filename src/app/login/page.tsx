import Link from "next/link";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  // 이미 로그인된 사용자는 메인 페이지로 리다이렉트
  if (session) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--background-primary)]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-[5rem]">
          Expense Tracker
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              href="/api/auth/signin"
              className="rounded-full bg-[var(--accent-primary)] px-10 py-3 font-semibold text-white no-underline transition hover:opacity-90"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

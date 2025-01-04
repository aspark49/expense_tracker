import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!session) {
    redirect("/login");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--background-primary)]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-[5rem]">
            Expense Tracker
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-2xl text-[var(--text-primary)]">
              {session.user?.name}님 환영합니다
            </p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

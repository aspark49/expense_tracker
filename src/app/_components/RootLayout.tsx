"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return children;
  }

  const menuItems = [
    {
      name: "홈",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      name: "데이터 입력",
      path: "/upload",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "통계",
      path: "/statistics",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen w-screen overflow-x-hidden">
      <aside
        className={`fixed left-0 top-0 h-screen bg-[var(--background-secondary)] p-4 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div
          className={`mb-8 flex ${isCollapsed ? "justify-center" : "justify-between"}`}
        >
          <h1
            className={`font-bold text-[var(--text-primary)] transition-opacity duration-300 ${
              isCollapsed ? "hidden w-0 opacity-0" : "text-xl opacity-100"
            }`}
          >
            <div className="flex h-full items-center">Expense Tracker</div>
          </h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-2 hover:bg-[var(--accent-primary)] hover:bg-opacity-10"
          >
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <nav className="flex h-[calc(100%-2rem)] flex-col justify-between">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center rounded-lg px-4 py-2 transition-colors ${
                    pathname === item.path
                      ? "bg-[var(--accent-primary)] text-white"
                      : "text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:bg-opacity-10"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <span className="inline-block">{item.icon}</span>
                  <span
                    className={`ml-3 transition-opacity duration-300 ${
                      isCollapsed ? "hidden w-0 opacity-0" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mb-8">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={`flex w-full items-center rounded-lg bg-gray-50 px-4 py-2.5 text-gray-400 transition-all hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <span className="inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span
                className={`ml-3 font-medium transition-opacity duration-300 ${
                  isCollapsed ? "hidden w-0 opacity-0" : "opacity-100"
                }`}
              >
                로그아웃
              </span>
            </button>
          </div>
        </nav>
      </aside>

      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "pl-16" : "pl-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

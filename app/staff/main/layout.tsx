"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = getCookie("access_token");
        if (!token) router.push("/staff/login/");
    }, []);

    const navItems = [
        { href: "/staff/main", label: "Главная", icon: "⊞" },
        { href: "/staff/main/images", label: "Изображения", icon: "◻" },
        { href: "/staff/main/audios", label: "Аудио", icon: "♪" },
        { href: "/staff/main/news", label: "Новости", icon: "◈" },
        { href: "/staff/main/reels", label: "Reels", icon: "▶" },
        { href: "/staff/main/youtubevids", label: "YouTubeVids", icon: "▣" },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <div className="min-h-screen tiptap font-golostext" style={{ background: "#f0f4f8" }}>
            {/* SIDEBAR */}
            <aside
                className="fixed top-0 left-0 h-full flex flex-col z-50"
                style={{
                    width: "220px",
                    background:
                        "linear-gradient(180deg, #1a3a6b 0%, #1e4a8a 50%, #1a5fa8 100%)",
                    boxShadow: "2px 0 12px rgba(26,58,107,0.18)",
                }}
            >
                {/* LOGO */}
                <div
                    className="flex items-center gap-3 px-5 py-5"
                    style={{
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    <div
                        className="flex items-center justify-center rounded-lg"
                        style={{
                            width: "36px",
                            height: "36px",
                            background: "rgba(255,255,255,0.15)",
                            fontSize: "18px",
                        }}
                    >
                        ✦
                    </div>

                    <div>
                        <div className="text-white font-semibold text-sm">
                            Admin Panel
                        </div>
                        <div
                            className="text-xs"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                            Staff Portal
                        </div>
                    </div>
                </div>

                {/* NAV */}
                <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                    <div
                        className="text-xs uppercase px-3 mb-2"
                        style={{
                            color: "rgba(255,255,255,0.35)",
                            letterSpacing: "0.08em",
                        }}
                    >
                        Навигация
                    </div>

                    {navItems.map(({ href, label, icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                            style={
                                isActive(href)
                                    ? {
                                          background:
                                              "rgba(255,255,255,0.18)",
                                          color: "#fff",
                                          boxShadow:
                                              "inset 0 0 0 1px rgba(255,255,255,0.2)",
                                      }
                                    : {
                                          color: "rgba(255,255,255,0.65)",
                                      }
                            }
                            onMouseEnter={(e) => {
                                if (!isActive(href)) {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.08)";
                                    e.currentTarget.style.color = "#fff";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(href)) {
                                    e.currentTarget.style.background =
                                        "transparent";
                                    e.currentTarget.style.color =
                                        "rgba(255,255,255,0.65)";
                                }
                            }}
                        >
                            <span style={{ fontSize: "16px", opacity: 0.9 }}>
                                {icon}
                            </span>

                            {label}

                            {isActive(href) && (
                                <span
                                    className="ml-auto rounded-full"
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        background: "#7dd3fc",
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* FOOTER */}
                <div
                    className="px-5 py-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                    <div className="flex items-center gap-2">
                        <div
                            className="rounded-full flex items-center justify-center text-xs font-semibold"
                            style={{
                                width: "30px",
                                height: "30px",
                                background: "rgba(255,255,255,0.15)",
                                color: "rgba(255,255,255,0.9)",
                            }}
                        >
                            S
                        </div>

                        <div>
                            <div
                                className="text-xs font-medium"
                                style={{
                                    color: "rgba(255,255,255,0.85)",
                                }}
                            >
                                Staff
                            </div>
                            <div
                                className="text-xs"
                                style={{
                                    color: "rgba(255,255,255,0.4)",
                                }}
                            >
                                Онлайн
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div style={{ marginLeft: "220px" }}>
                {/* TOP BAR */}
                <header
                    className="sticky top-0 z-40 flex items-center justify-between px-8 py-4"
                    style={{
                        background: "rgba(240,244,248,0.9)",
                        backdropFilter: "blur(8px)",
                        borderBottom: "1px solid #dce6f0",
                    }}
                >
                    <div className="flex items-center gap-2 text-sm">
                        <span style={{ color: "#64748b" }}>Staff</span>
                        <span style={{ color: "#94a3b8" }}>/</span>
                        <span
                            style={{
                                color: "#1e40af",
                                fontWeight: 500,
                            }}
                        >
                            {navItems.find((n) => n.href === pathname)
                                ?.label ?? "Главная"}
                        </span>
                    </div>

                    <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                            background: "#dbeafe",
                            color: "#1d4ed8",
                            border: "1px solid #bfdbfe",
                        }}
                    >
                        <span
                            style={{
                                width: "6px",
                                height: "6px",
                                background: "#3b82f6",
                                borderRadius: "999px",
                                display: "inline-block",
                            }}
                        />
                        Панель управления
                    </div>
                </header>

                {/* CONTENT */}
                <main className="min-h-screen px-8 py-6">{children}</main>
            </div>
        </div>
    );
}
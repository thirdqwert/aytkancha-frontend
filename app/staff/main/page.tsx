"use client"
import Link from "next/link";

export default function Staff() {
    const sections = [
        {
            href: "main/images/",
            label: "Изображения",
            icon: "◻",
            description: "Управление медиафайлами",
        },
        {
            href: "main/audios/",
            label: "Аудио",
            icon: "♪",
            description: "Управление аудиозаписями",
        },
        {
            href: "main/news/",
            label: "Новости",
            icon: "◈",
            description: "Управление новостями",
        },
        {
            href: "main/reels/",
            label: "Reels",
            icon: "▶",
            description: "Короткие видео",
        },
        {
            href: "main/youtubevids/",
            label: "YouTubeVids",
            icon: "▣",
            description: "Видео с YouTube",
        },
    ];

    return (
        <div className="px-8 py-6">
            {/* HEADER */}
            <div className="mb-8">
                <h1
                    className="text-2xl font-semibold"
                    style={{ color: "#1e3a5f" }}
                >
                    Главная
                </h1>
                <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                    Выберите раздел для управления
                </p>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 gap-4 max-w-[560px]">
                {sections.map(({ href, label, icon, description }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all group"
                        style={{
                            background: "#ffffff",
                            border: "1px solid #dce6f0",
                            boxShadow: "0 1px 3px rgba(30,58,107,0.06)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#3b82f6";
                            e.currentTarget.style.boxShadow =
                                "0 4px 12px rgba(59,130,246,0.12)";
                            e.currentTarget.style.transform =
                                "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#dce6f0";
                            e.currentTarget.style.boxShadow =
                                "0 1px 3px rgba(30,58,107,0.06)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        {/* ICON */}
                        <div
                            className="flex items-center justify-center rounded-lg flex-shrink-0"
                            style={{
                                width: "42px",
                                height: "42px",
                                background: "#dbeafe",
                                color: "#1d4ed8",
                                fontSize: "20px",
                            }}
                        >
                            {icon}
                        </div>

                        {/* TEXT */}
                        <div className="flex-1">
                            <div
                                className="font-medium text-sm"
                                style={{ color: "#1e3a5f" }}
                            >
                                {label}
                            </div>
                            <div
                                className="text-xs mt-0.5"
                                style={{ color: "#94a3b8" }}
                            >
                                {description}
                            </div>
                        </div>

                        {/* ARROW */}
                        <div
                            className="text-sm transition-transform group-hover:translate-x-1"
                            style={{ color: "#93c5fd" }}
                        >
                            →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
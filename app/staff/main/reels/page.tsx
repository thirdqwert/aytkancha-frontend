"use client";

import { getDateString } from "@/app/_utils/utilis";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { SubmitEvent, useEffect, useState } from "react";
import Pagination from "../../components/Paginations";
import Loader from "@/app/_components/Loader";
import { IReelsObject } from "@/app/_utils/types";

export default function Reels() {
    const [products, setProducts] = useState<IReelsObject | null>(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [page, setPage] = useState(1);
    const [deleteWindow, setDeleteWindow] = useState<number | null>(null);
    const [content, setContent] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [copied, setCopied] = useState<number | null>(null);

    const token = getCookie("access_token");

    const getProducts = async (pageCount: number) => {
        try {
            const params = new URLSearchParams();
            if (pageCount) params.append("page", String(pageCount));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reels/?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                setProducts(null);
                setError(true);
                return;
            }

            const data = await res.json();

            setProducts(data);
        } catch (e) {
            throw e;
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            setIsLoading(true);

            await fetch(`${process.env.NEXT_PUBLIC_API}/reels/${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsLoading(false);
            setDeleteWindow(null);
            getProducts(page);
        } catch (e) {
            throw e;
        }
    };

    const createProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file || !title) return;

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", file);
            formData.append("content", content);

            await fetch(`${process.env.NEXT_PUBLIC_API}/reels/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            setIsLoading(false);
            setTitle("");
            setContent("");
            setFile(null);
            setOpenModal(false);
            getProducts(1);
        } catch (e) {
            throw e;
        }
    };

    const handleCopy = async (link: string, id: number) => {
        await navigator.clipboard.writeText(link);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    useEffect(() => {
        getProducts(page);
    }, [page]);

    return (
        <div style={{ minHeight: "100vh", background: "#f0f4f8" }}>
            {/* LOADER OVERLAY */}
            {isLoading && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)" }}
                >
                    <Loader />
                </div>
            )}

            {/* MODAL */}
            {openModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ background: "rgba(15,30,60,0.45)", backdropFilter: "blur(4px)" }}
                >
                    <div
                        className="w-full overflow-hidden"
                        style={{
                            maxWidth: "460px",
                            background: "#ffffff",
                            borderRadius: "18px",
                            border: "1px solid #dce6f0",
                            boxShadow: "0 24px 64px rgba(15,30,60,0.22)",
                        }}
                    >
                        {/* Modal header */}
                        <div
                            className="flex items-center justify-between px-6 py-4"
                            style={{
                                background: "linear-gradient(135deg, #1a3a6b 0%, #1e4a8a 100%)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex items-center justify-center rounded-lg"
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        background: "rgba(255,255,255,0.15)",
                                        fontSize: "16px",
                                        color: "#fff",
                                    }}
                                >
                                    ◻
                                </div>
                                <h2 className="text-base font-semibold text-white">Добавить Reels</h2>
                            </div>
                            <button
                                onClick={() => setOpenModal(false)}
                                className="flex items-center justify-center rounded-lg transition-all"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    background: "rgba(255,255,255,0.1)",
                                    color: "rgba(255,255,255,0.8)",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.22)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal body */}
                        <form onSubmit={createProduct} className="flex flex-col gap-4 p-6">
                            <div>
                                <label className="block text-xs font-medium mb-1.5" style={{ color: "#475569" }}>
                                    Название Reels
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    placeholder="Введите название..."
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm outline-none transition-all"
                                    style={{
                                        border: "1px solid #dce6f0",
                                        borderRadius: "10px",
                                        background: "#f8fafc",
                                        color: "#1e3a5f",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#3b82f6";
                                        e.currentTarget.style.background = "#ffffff";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#dce6f0";
                                        e.currentTarget.style.background = "#f8fafc";
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1.5" style={{ color: "#475569" }}>
                                    Reels
                                </label>
                                <input
                                    type="text"
                                    value={content}
                                    placeholder="Введите ссылку..."
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm outline-none transition-all"
                                    style={{
                                        border: "1px solid #dce6f0",
                                        borderRadius: "10px",
                                        background: "#f8fafc",
                                        color: "#1e3a5f",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#3b82f6";
                                        e.currentTarget.style.background = "#ffffff";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#dce6f0";
                                        e.currentTarget.style.background = "#f8fafc";
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1.5" style={{ color: "#475569" }}>
                                    Изображения Reels
                                </label>
                                <label
                                    className="flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                                    style={{
                                        border: "2px dashed #bfdbfe",
                                        borderRadius: "12px",
                                        padding: "22px",
                                        background: "#f0f7ff",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLLabelElement).style.borderColor = "#3b82f6";
                                        (e.currentTarget as HTMLLabelElement).style.background = "#dbeafe";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLLabelElement).style.borderColor = "#bfdbfe";
                                        (e.currentTarget as HTMLLabelElement).style.background = "#f0f7ff";
                                    }}
                                >
                                    <span style={{ fontSize: "26px" }}>◻</span>
                                    <span className="text-sm font-medium" style={{ color: "#1d4ed8" }}>
                                        {file ? file.name : "Нажмите для выбора файла"}
                                    </span>
                                    <span className="text-xs" style={{ color: "#94a3b8" }}>
                                        PNG, JPG, WEBP
                                    </span>
                                    <input type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
                                </label>

                                {file && (
                                    <div
                                        className="mt-3 overflow-hidden"
                                        style={{ borderRadius: "12px", border: "1px solid #dce6f0" }}
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            className="w-full object-cover"
                                            style={{ maxHeight: "180px" }}
                                        />
                                        <div className="px-3 py-2" style={{ background: "#f8fafc" }}>
                                            <p className="text-xs truncate" style={{ color: "#64748b" }}>
                                                {file.name}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mt-1">
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
                                    style={{
                                        background: "linear-gradient(135deg, #1a3a6b 0%, #1e4a8a 100%)",
                                        border: "none",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 8px rgba(26,58,107,0.28)",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                                    }}
                                >
                                    Создать
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                    className="flex-1 py-2.5 text-sm font-medium rounded-xl transition-all"
                                    style={{
                                        background: "#f8fafc",
                                        color: "#64748b",
                                        border: "1px solid #dce6f0",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#94a3b8";
                                        (e.currentTarget as HTMLButtonElement).style.color = "#334155";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#dce6f0";
                                        (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
                                    }}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* HEADER ROW */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold" style={{ color: "#1e3a5f" }}>
                        Reels
                    </h1>
                    <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
                        {products?.results?.length
                            ? `${products.results.length} файлов на странице`
                            : "Управление медиафайлами"}
                    </p>
                </div>
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
                    style={{
                        background: "linear-gradient(135deg, #1a3a6b 0%, #1e4a8a 100%)",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 2px 10px rgba(26,58,107,0.25)",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(26,58,107,0.35)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 10px rgba(26,58,107,0.25)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }}
                >
                    <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span>
                    Добавить Reels
                </button>
            </div>

            {/* ERROR */}
            {error && (
                <div
                    className="flex items-center gap-3 p-4 rounded-xl mb-6"
                    style={{
                        background: "#fff1f2",
                        border: "1px solid #fecdd3",
                        color: "#be123c",
                    }}
                >
                    <span style={{ fontSize: "18px" }}>⚠</span>
                    <span className="text-sm font-medium">Данные не найдены</span>
                </div>
            )}

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {products?.results?.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-xl overflow-hidden transition-all"
                        style={{
                            background: "#ffffff",
                            border: "1px solid #dce6f0",
                            boxShadow: "0 1px 4px rgba(30,58,107,0.06)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(30,58,107,0.13)";
                            (e.currentTarget as HTMLDivElement).style.borderColor = "#bfdbfe";
                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(30,58,107,0.06)";
                            (e.currentTarget as HTMLDivElement).style.borderColor = "#dce6f0";
                            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                        }}
                    >
                        {/* Blue top accent */}
                        <div
                            style={{
                                height: "4px",
                                background: "linear-gradient(90deg, #1a3a6b 0%, #3b82f6 100%)",
                            }}
                        />

                        {/* Image */}
                        <div className="relative w-full" style={{ height: "160px", background: "#f0f4f8" }}>
                            <Image
                                unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                                fill
                                src={product.image}
                                alt=""
                                className="object-cover"
                            />
                            {/* Overlay badge */}
                            <div
                                className="absolute top-2 right-2 flex items-center justify-center rounded-md"
                                style={{
                                    width: "26px",
                                    height: "26px",
                                    background: "rgba(26,58,107,0.55)",
                                    backdropFilter: "blur(4px)",
                                    color: "#fff",
                                    fontSize: "12px",
                                }}
                            >
                                ◻
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-4">
                            <h3 className="font-semibold text-sm truncate" style={{ color: "#1e3a5f" }}>
                                {product.title}
                            </h3>
                            <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                                {getDateString(product.created_at)}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleCopy(product.content, product.id)}
                                    className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium rounded-lg transition-all"
                                    style={{
                                        background: copied === product.id ? "#dbeafe" : "#f0f7ff",
                                        color: copied === product.id ? "#1d4ed8" : "#3b82f6",
                                        border: `1px solid ${copied === product.id ? "#bfdbfe" : "#dbeafe"}`,
                                        cursor: "pointer",
                                    }}
                                >
                                    {copied === product.id ? "✓ Скопировано" : "⎘ Ссылка"}
                                </button>

                                <button
                                    onClick={() => setDeleteWindow(product.id)}
                                    className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium rounded-lg transition-all"
                                    style={{
                                        background: "#fff1f2",
                                        color: "#be123c",
                                        border: "1px solid #fecdd3",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "#ffe4e6";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "#fff1f2";
                                    }}
                                >
                                    ✕ Удалить
                                </button>
                            </div>

                            {/* Delete confirm */}
                            {deleteWindow === product.id && (
                                <div
                                    className="mt-3 rounded-xl p-4 flex flex-col gap-3"
                                    style={{
                                        background: "#fff1f2",
                                        border: "1px solid #fecdd3",
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span style={{ fontSize: "14px" }}>⚠</span>
                                        <p className="text-xs font-semibold" style={{ color: "#be123c" }}>
                                            Вы уверены, что хотите удалить?
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="flex-1 py-2 text-xs font-semibold text-white rounded-lg transition-all"
                                            style={{
                                                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                                                border: "none",
                                                cursor: "pointer",
                                                boxShadow: "0 2px 6px rgba(220,38,38,0.3)",
                                            }}
                                        >
                                            Да, удалить
                                        </button>
                                        <button
                                            onClick={() => setDeleteWindow(null)}
                                            className="flex-1 py-2 text-xs font-medium rounded-lg"
                                            style={{
                                                background: "#ffffff",
                                                color: "#64748b",
                                                border: "1px solid #dce6f0",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-8">
                <Pagination page={page} setPage={setPage} />
            </div>
        </div>
    );
}

"use client";

import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "../../components/Paginations";
import { INewsObject } from "@/app/_utils/types";
import Loader from "@/app/_components/Loader";
import { getDateString } from "@/app/_utils/utilis";

export default function News() {
    const [products, setProducts] = useState<INewsObject | null>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [deleteWindow, setDeleteWindow] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const token = getCookie("access_token");

    const getProducts = async (pageCount: number) => {
        try {
            const params = new URLSearchParams();
            if (pageCount) params.append("page", String(pageCount));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/?${params.toString()}`);

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

            await fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}/`, {
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

    useEffect(() => {
        getProducts(page);
    }, [page]);

    return (
        <div className="min-h-screen bg-[#f0f4f8]">
            {/* LOADER */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <Loader />
                </div>
            )}

            <div className="">
                {/* HEADER ROW */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold" style={{ color: "#1e3a5f" }}>
                            Новости
                        </h1>
                        <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
                            {products?.results?.length
                                ? `${products.results.length} новостей на странице`
                                : "Управление медиафайлами"}
                        </p>
                    </div>
                    <Link
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
                        href={"news/create/"}
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
                        Добавить новость
                    </Link>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
                        Данные не найдены
                    </div>
                )}

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.results?.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden
                            shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* TOP ACCENT */}
                            <div className="h-1 w-full bg-gradient-to-r from-[#1a3a6b] to-[#3b82f6]" />

                            {/* IMAGE */}
                            <div className="relative w-full h-44 bg-slate-100">
                                <Image
                                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                                    fill
                                    src={product.preview}
                                    alt=""
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-4">
                                <h3 className="text-slate-800 font-semibold text-sm line-clamp-2">{product.title}</h3>

                                <p className="text-xs text-slate-500 mt-1">{getDateString(product.created_at)}</p>

                                {/* ACTIONS */}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => setDeleteWindow(product.id)}
                                        className="flex-1 px-3 py-2 text-xs font-medium rounded-lg
                                        bg-red-50 text-red-600 border border-red-100
                                        hover:bg-red-100 transition"
                                    >
                                        Удалить
                                    </button>

                                    <Link
                                        href={`news/edit/${product.id}`}
                                        className="flex-1 px-3 py-2 text-xs font-medium rounded-lg
                                        text-center text-white
                                        bg-gradient-to-r from-[#1a3a6b] to-[#1e4a8a]
                                        hover:opacity-90 transition"
                                    >
                                        Изменить
                                    </Link>
                                </div>

                                {/* DELETE CONFIRM */}
                                {deleteWindow === product.id && (
                                    <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200">
                                        <p className="text-xs text-red-600 mb-2">Удалить эту новость?</p>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="flex-1 py-1.5 text-xs text-white rounded-lg bg-red-500 hover:bg-red-600"
                                            >
                                                Да
                                            </button>

                                            <button
                                                onClick={() => setDeleteWindow(null)}
                                                className="flex-1 py-1.5 text-xs border border-slate-300 rounded-lg hover:bg-slate-100"
                                            >
                                                Нет
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="mt-10">
                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
        </div>
    );
}

"use client";

import Loader from "@/app/_components/Loader";
import { ICategory } from "@/app/_utils/types";
import { getCategories, getNewsDetail } from "@/app/_utils/utilis";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import React, { SubmitEvent, useEffect, useState, useMemo } from "react";

const TipTap = dynamic(() => import("../../../../components/TipTap"), {
    ssr: false,
});

const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white";

export default function EditNews({ params }: any) {
    const { id } = React.use(params);

    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);

    const [form, setForm] = useState({
        title: "",
        shortTitle: "",
        desc: "",
        content: "",
    });

    const [file, setFile] = useState<File | null>(null);

    const [existingImages, setExistingImages] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const token = getCookie("access_token");

    const update = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const isValid = useMemo(() => {
        return form.title && form.shortTitle && form.desc && form.content && selectedCategory && selectedSubcategory;
    }, [form, selectedCategory, selectedSubcategory]);

    const editProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError(null);

            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            if (file) formData.append("main_image", file);

            if (selectedCategory) formData.append("category_choose", selectedCategory.toString());

            if (selectedSubcategory) formData.append("subcategory_choose", selectedSubcategory.toString());

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json().catch(() => null);

            setIsLoading(false);

            if (!res.ok) {
                setError(data);
                return;
            }
        } catch (err) {
            setIsLoading(false);
            setError(err);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const [news, cats] = await Promise.all([getNewsDetail(id, undefined), getCategories(undefined)]);

            setCategories(cats);

            setForm({
                title: news.title || "",
                shortTitle: news.short_title || "",
                desc: news.desc || "",
                content: news.content || "",
            });

            setSelectedCategory(news.category?.id || null);
            setSelectedSubcategory(news.subcategory?.id || null);

            setExistingImages([news.main_image, news.second_image, news.third_image].filter(Boolean));
        };

        getData();
    }, []);

    return (
        <div className="min-h-screen bg-[#f0f4f8] py-8 px-6">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur-sm">
                    <Loader />
                </div>
            )}

            <h1 className="text-2xl font-bold text-slate-800 mb-6">Редактировать новость</h1>

            <form
                onSubmit={editProduct}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6"
            >
                {/* INPUTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className={inputClass}
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                    />

                    <input
                        className={inputClass}
                        value={form.shortTitle}
                        onChange={(e) => update("shortTitle", e.target.value)}
                    />
                </div>

                <textarea
                    className={`${inputClass} h-40`}
                    value={form.desc}
                    onChange={(e) => update("desc", e.target.value)}
                />

                {/* CONTENT */}
                <TipTap setContent={(v) => update("content", v)} content={form.content} />

                {/* IMAGES (NEW + EXISTING PREVIEW) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[file].map((f, i) => {
                        const existing = existingImages[i];

                        return (
                            <div key={i} className="space-y-2">
                                <label className="block p-4 rounded-xl border border-dashed border-blue-300 bg-blue-50 cursor-pointer hover:bg-blue-100 transition text-center text-sm text-blue-700">
                                    Загрузить Изображение {i + 1}
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            if (i === 0) setFile(file);
                                        }}
                                    />
                                </label>

                                {f ? (
                                    <img
                                        src={URL.createObjectURL(f)}
                                        className="w-full h-48 object-cover rounded-xl border"
                                    />
                                ) : existing ? (
                                    <img src={existing} className="w-full h-48 object-cover rounded-xl border" />
                                ) : null}
                            </div>
                        );
                    })}
                </div>

                {/* CATEGORY */}
                <div className="flex flex-wrap gap-2">
                    {categories?.map((c) => (
                        <button
                            type="button"
                            key={c.id}
                            onClick={() => setSelectedCategory(c.id)}
                            className={`px-3 py-2 rounded-lg border text-sm transition ${
                                selectedCategory === c.id
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-600 border-slate-200"
                            }`}
                        >
                            {c.title}
                        </button>
                    ))}
                </div>

                {/* SUBCATEGORY */}
                <div className="flex flex-wrap gap-2">
                    {categories
                        ?.find((c) => c.id === selectedCategory)
                        ?.subcategories.map((s) => (
                            <button
                                type="button"
                                key={s.id}
                                onClick={() => setSelectedSubcategory(s.id)}
                                className={`px-3 py-2 rounded-lg border text-sm transition ${
                                    selectedSubcategory === s.id
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-slate-600 border-slate-200"
                                }`}
                            >
                                {s.title}
                            </button>
                        ))}
                </div>

                {/* ERROR */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">
                        {JSON.stringify(error)}
                    </div>
                )}

                {/* BUTTON */}
                <button
                    disabled={!isValid}
                    className={`py-3 rounded-xl font-semibold text-white transition ${
                        isValid
                            ? "bg-gradient-to-r from-[#1a3a6b] to-[#1e4a8a] hover:opacity-90"
                            : "bg-slate-400 cursor-not-allowed"
                    }`}
                >
                    Сохранить
                </button>
            </form>
            {form.content && (
                <div className="mt-[10px] bg-[#e9e8e8]">
                    <div className="" dangerouslySetInnerHTML={{ __html: form.content }} />
                </div>
            )}
        </div>
    );
}

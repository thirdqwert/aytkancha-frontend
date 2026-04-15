"use client";

import Loader from "@/app/_components/Loader";
import { ICategory } from "@/app/_utils/types";
import { getCategories } from "@/app/_utils/utilis";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { SubmitEvent, useEffect, useState, useMemo } from "react";

const TipTap = dynamic(() => import("../../../components/TipTap"), {
    ssr: false,
});

const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white";

export default function CreateNews() {
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const token = getCookie("access_token");

    const update = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const isValid = useMemo(() => {
        return (
            file &&
            form.title &&
            form.shortTitle &&
            form.desc &&
            form.content &&
            selectedCategory &&
            selectedSubcategory
        );
    }, [file, form, selectedCategory, selectedSubcategory]);

    const createProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;

        try {
            setIsLoading(true);
            setError(null);

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("short_title", form.shortTitle);

            formData.append("main_image", file!);

            formData.append("content", form.content);
            formData.append("desc", form.desc);

            formData.append("category_choose", selectedCategory!.toString());
            formData.append("subcategory_choose", selectedSubcategory!.toString());

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json().catch(() => null);

            setIsLoading(false);

            if (!res.ok) {
                setError(data || { message: "Unknown error" });
                return;
            }

            setFile(null);
            setSelectedCategory(null);
            setSelectedSubcategory(null);
        } catch (err) {
            setIsLoading(false);
            setError(err);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getCategories(undefined);
            setCategories(data);
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

            <h1 className="text-2xl font-bold text-slate-800 mb-6">Создать новость</h1>

            <form
                onSubmit={createProduct}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6"
            >
                {/* TITLE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className={inputClass}
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                    />
                    <input
                        className={inputClass}
                        placeholder="Short title"
                        value={form.shortTitle}
                        onChange={(e) => update("shortTitle", e.target.value)}
                    />
                </div>

                {/* DESCRIPTION */}
                <textarea
                    className={`${inputClass} h-40`}
                    placeholder="Description"
                    value={form.desc}
                    onChange={(e) => update("desc", e.target.value)}
                />

                {/* CONTENT */}
                <div>
                    <p className="text-sm font-medium mb-2 text-slate-700">Content</p>
                    <TipTap setContent={(v) => update("content", v)} content="" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[file].map((f, i) => (
                        <div key={i} className="space-y-2">
                            <label className="block p-4 rounded-xl border border-dashed border-blue-300 bg-blue-50 cursor-pointer hover:bg-blue-100 transition text-center text-sm text-blue-700">
                                Upload image {i + 1}
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        if (i === 0) setFile(file);
                                    }}
                                />
                            </label>

                            {f && (
                                <img
                                    src={URL.createObjectURL(f)}
                                    className="w-full h-48 object-cover rounded-xl border"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                    <p className="font-medium text-slate-700">Category</p>
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

                {/* SUBMIT */}
                <button
                    disabled={!isValid || isLoading}
                    className={`py-3 rounded-xl font-semibold text-white transition ${
                        isValid && !isLoading
                            ? "bg-gradient-to-r from-[#1a3a6b] to-[#1e4a8a] hover:opacity-90"
                            : "bg-slate-400 cursor-not-allowed"
                    }`}
                >
                    {isLoading ? "Создание..." : "Создать"}
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

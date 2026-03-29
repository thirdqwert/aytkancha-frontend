"use client";

import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#e9e8e8]">
            <div className="text-center flex flex-col items-center gap-5">
                <div className="relative select-none">
                    <span className="text-[140px] sm:text-[180px] font-extrabold leading-none text-[#d4d3d3] tracking-tighter">
                        404
                    </span>
                    <span
                        className="absolute inset-0 text-[140px] sm:text-[180px] font-extrabold leading-none tracking-tighter
                           text-transparent bg-clip-text bg-gradient-to-br from-zinc-700 to-zinc-900"
                    >
                        404
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-zinc-800 text-base sm:text-lg font-bold">Sahifa topilmadi</p>
                    <p className="text-zinc-500 text-sm">Bu sahifa mavjud emas yoki o&apos;chirilgan.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-900 text-[#e9e8e8]
                       font-bold text-sm text-center transition-all hover:-translate-y-0.5
                       hover:shadow-lg hover:shadow-zinc-400/30"
                    >
                        Bosh sahifa →
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl border border-zinc-300 hover:border-zinc-400
                       text-zinc-500 hover:text-zinc-700 font-bold text-sm
                       transition-all hover:-translate-y-0.5 bg-transparent"
                    >
                        Orqaga
                    </button>
                </div>
            </div>
        </div>
    );
}

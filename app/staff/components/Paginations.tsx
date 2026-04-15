interface IProps {
    page: number;
    setPage: (number: number) => void;
}

export default function Pagination({ page, setPage }: IProps) {
    return (
        <div className="flex items-center justify-center gap-2 mt-6">

            {/* PREV */}
            <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition border ${
                    page <= 1
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                }`}
            >
                Назад
            </button>

            {/* PAGE */}
            <span className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white shadow">
                {page}
            </span>

            {/* NEXT */}
            <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded-md text-sm font-medium transition border bg-white text-slate-700 border-slate-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
            >
                Вперед
            </button>

        </div>
    );
}
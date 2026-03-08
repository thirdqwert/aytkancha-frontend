"use client";
import { useParams, usePathname } from "next/navigation";
import { getCategories } from "../utils/utilis";
import { useEffect, useState } from "react";
import { ICategory } from "../utils/types";
import ExchangeRate from "./ExchangeRate";
import Link from "next/link";

const categoriesLinks = [
    { name: "Yangiliklar", slug: "", breakpoint: "" },
    { name: "Dunyoda", slug: "dunyoda", breakpoint: "" },
    { name: "O'zbekistonda", slug: "ozbekistonda", breakpoint: "" },
    { name: "Voqealar", slug: "voqealar", breakpoint: "hidden 4xl:block" },
    { name: "Sport", slug: "sport", breakpoint: "hidden 5xl:block" },
    { name: "Iqtisodiyot", slug: "iqtisodiyot", breakpoint: "hidden 6xl:block" },
    { name: "Madaniyat", slug: "madaniyat", breakpoint: "hidden 7xl:block" },
    { name: "Fan", slug: "fan", breakpoint: "" },
];

export default function Header() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [moreCategoriesIsOpen, setMoreCategoriesIsOpen] = useState(false);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [subCategoryIsOpenHeader, setSubCategoryIsOpenHeader] = useState<null | string>(null);
    const params = useParams();
    const pathname = usePathname();
    const categoryBy = params.category;
    const subcategoryBy = params.subcategory;
    const [subcategoryIsOpenSidebar, setSubcategoryIsOpenSidebar] = useState<string | null>(
        categoryBy?.toString() || null,
    );

    const subCategoriesListHTML = (slug: string) => {
        const currentCateogry = categories.find((category) => category.slug == slug);

        if (currentCateogry) {
            return (
                <div
                    className="bg-fifth absolute z-[10] top-[100px] left-0 right-0"
                    onMouseLeave={() => setSubCategoryIsOpenHeader(null)}
                >
                    <div className="container">
                        <div className="flex flex-row w-full flex-wrap flex-row flex-wrap items-start">
                            {currentCateogry.subcategories.map((subcategory) => (
                                <Link
                                    href={`/news/${currentCateogry.slug}/${subcategory.slug}`}
                                    key={subcategory.id}
                                    className={"px-[15px] py-[10px] text-[28px] font-medium text-white hover:bg-white hover:text-fifth " + (subcategoryBy == subcategory.slug ? "active_subcategory" : "")}
                                >
                                    {subcategory.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            );
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
        <div>
            <header>
                <div className="container">
                    <div className="flex flex-row justify-between items-center pt-[30px] pb-[50px]">
                        <Link href={"/"} className="text-primery flex flex-col">
                            <span className="font-PlayfairDisplay font-bold text-[90px]">Aytkancha</span>
                            <span className="font-PlayfairDisplay text-[32px]">
                                O&apos; zbekistonning Yangilik Portali
                            </span>
                        </Link>
                        <ExchangeRate />
                    </div>
                </div>
                <nav className="bg-primery relative">
                    <div className="container">
                        <ul className="flex flex-row justify-between">
                            {categoriesLinks.map((categoryLink) => (
                                <li
                                    key={categoryLink.slug}
                                    onMouseEnter={() => setSubCategoryIsOpenHeader(categoryLink.slug)}
                                >
                                    <Link
                                        href={`/news/${categoryLink.slug}`}
                                        className="block py-[30px] text-white text-[32px] font-medium"
                                    >
                                        {categoryLink.name}
                                    </Link>
                                    {subCategoryIsOpenHeader == categoryLink.slug &&
                                        subCategoriesListHTML(categoryLink.slug)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
}

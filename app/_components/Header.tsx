"use client";
import { useParams, usePathname } from "next/navigation";
import { getCategories } from "../_utils/utilis";
import { useEffect, useState } from "react";
import { ICategory } from "../_utils/types";
import arrowDown from "../../public/images/arrowDown.svg";
import ExchangeRate from "./ExchangeRate";
import Link from "next/link";
import Image from "next/image";

const categoriesLinks = [
    { name: "Yangiliklar", slug: "", breakpoint: "" },
    { name: "Dunyoda", slug: "dunyoda", breakpoint: "" },
    { name: "O'zbekistonda", slug: "ozbekistonda", breakpoint: "" },
    { name: "Voqealar", slug: "voqealar", breakpoint: "hidden 5xl:block" },
    { name: "Sport", slug: "sport", breakpoint: "hidden 6xl:block" },
    { name: "Iqtisodiyot", slug: "iqtisodiyot", breakpoint: "hidden 7xl:block" },
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
                    className="bg-[#101d31] absolute z-[10] top-[96px] left-0 right-0"
                    onMouseLeave={() => setSubCategoryIsOpenHeader(null)}
                >
                    <div className="container">
                        <div className="flex flex-row w-full flex-wrap flex-row flex-wrap items-start">
                            {currentCateogry.subcategories.map((subcategory) => (
                                <Link
                                    href={`/news/${currentCateogry.slug}/${subcategory.slug}`}
                                    key={subcategory.id}
                                    className={
                                        "px-[15px] py-[15px] text-[28px] font-medium text-white hover:bg-white hover:text-primery " +
                                        (subcategoryBy == subcategory.slug ? "active_subcategory" : "")
                                    }
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
                            <span className="font-bold text-[90px]">Aytkancha</span>
                            <span className="text-[32px]">O&apos; zbekistonning Yangilik Portali</span>
                        </Link>
                    </div>
                </div>
                <nav className="bg-primery relative">
                    <div className="container">
                        <div className="flex flex-row justify-between items-center">
                            <ul className="flex flex-row gap-[30px]">
                                {categoriesLinks.map((categoryLink) => (
                                    <li
                                        className={categoryLink.breakpoint}
                                        key={categoryLink.slug}
                                        onMouseEnter={() => {
                                            setSubCategoryIsOpenHeader(categoryLink.slug);
                                            setMoreCategoriesIsOpen(false);
                                        }}
                                    >
                                        <Link
                                            href={`/news/${categoryLink.slug}`}
                                            className="block py-[30px] text-white text-[29px] font-medium"
                                        >
                                            {categoryLink.name}
                                        </Link>
                                        {subCategoryIsOpenHeader == categoryLink.slug &&
                                            subCategoriesListHTML(categoryLink.slug)}
                                    </li>
                                ))}
                                <li
                                    className="relative cursor-pointer flex flex-row gap-[10px] items-center"
                                    onMouseEnter={() => {
                                        setSubCategoryIsOpenHeader(null);
                                        setMoreCategoriesIsOpen(true);
                                    }}
                                >
                                    <span className="block py-[30px] text-white text-[29px] font-medium">Boshqa</span>
                                    <Image src={arrowDown} alt="" />
                                    {moreCategoriesIsOpen && (
                                        <div
                                            className="absolute z-50 top-[96px] right-0 bg-primery w-[200px] flex flex-col pb-[10px] rounded-b-[10px]"
                                            onMouseLeave={() => setMoreCategoriesIsOpen(false)}
                                        >
                                            <Link
                                                href="/news/texnologiya"
                                                className="text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                            >
                                                Texnologiya
                                            </Link>
                                            <Link
                                                href="/news/madaniyat"
                                                className="text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                            >
                                                Madaniyat
                                            </Link>
                                            <Link
                                                href="/news/iqtisodiyota"
                                                className="block 7xl:hidden text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                            >
                                                Iqtisodiyot
                                            </Link>
                                            <Link
                                                href="/news/sport"
                                                className="block 6xl:hidden text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                            >
                                                Sport
                                            </Link>
                                            <Link
                                                href="/news/voqealar"
                                                className="block 5xl:hidden text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                            >
                                                Voqealar
                                            </Link>
                                            <Link
                                                href="/news/ozbekistonda"
                                                className="block xl:hidden text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                            >
                                                O&apos;zbekistonda
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            </ul>
                            <div onMouseEnter={() => setMoreCategoriesIsOpen(false)}>
                                <ExchangeRate />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

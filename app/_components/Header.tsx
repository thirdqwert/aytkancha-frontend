"use client";
import { useParams, usePathname } from "next/navigation";
import { categories } from "../_utils/utilis";
import { useState } from "react";
import arrowDown from "../../public/images/arrowDown.svg";
import blueArrowDown from "../../public/images/bluearrowdown.svg";
import arrowRight from "../../public/images/arrowright.svg";
import homeIcon from "../../public/images/homeIcon.svg";
import newsIcon from "../../public/images/newsIccon.svg";
import contactsIcon from "../../public/images/contactsIcon.svg";
import burger from "../../public/images/burger.svg";
import closeIcon from "../../public/images/close.svg";
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
                    className="bg-[#101d31] absolute z-[10] md:top-[65px] 2xl:top-[96px] left-0 right-0"
                    onMouseLeave={() => setSubCategoryIsOpenHeader(null)}
                >
                    <div className="max-w-[1890px] px-[15px] mx-auto">
                        <div className="flex flex-row w-full flex-wrap flex-row flex-wrap items-start">
                            {currentCateogry.subcategories.map((subcategory) => (
                                <Link
                                    href={`/news/${currentCateogry.slug}/${subcategory.slug}`}
                                    key={subcategory.id}
                                    className={
                                        "px-[15px] md:py-[10px] 2xl:py-[15px] md:text-[20px] 2xl:text-[29px] font-medium text-white hover:bg-white hover:text-primery " +
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

    return (
        <>
            <div>
                <header>
                    <div className="max-w-[1890px] px-[15px] mx-auto">
                        <div className="flex justify-center md:justify-start pt-[20px] md:pt-[30px] pb-[20px] 2xl:pb-[50px]">
                            <Link href={"/"} className="text-primery flex flex-col">
                                <span className="font-bold text-[41px] md:text-[70px] 2xl:text-[90px]">Aytkancha</span>
                                <span className="text-[15px] md:text-[25px] 2xl:text-[32px]">
                                    O&apos;zbekistonning Yangilik Portali
                                </span>
                            </Link>
                        </div>
                    </div>
                    <nav className="bg-primery relative">
                        <div className="max-w-[1890px] px-[15px] mx-auto">
                            <div className="flex flex-row justify-between items-center">
                                <ul className="hidden md:flex flex-row gap-[30px]">
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
                                                className="block md:py-[20px] 2xl:py-[30px] text-white md:text-[20px] 2xl:text-[29px] font-medium"
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
                                        <span className="block md:py-[20px] 2xl:py-[30px] text-white md:text-[20px] 2xl:text-[29px] font-medium">
                                            Boshqa
                                        </span>
                                        <Image src={arrowDown} alt="" />
                                        {moreCategoriesIsOpen && (
                                            <div
                                                className="absolute z-50 md:top-[65px] 2xl:top-[96px] right-0 bg-primery w-[200px] flex flex-col pb-[10px] rounded-b-[10px]"
                                                onMouseLeave={() => setMoreCategoriesIsOpen(false)}
                                            >
                                                <Link
                                                    href="/news/fan"
                                                    className="md:text-[20px] 2xl:text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                                >
                                                    Fan
                                                </Link>
                                                <Link
                                                    href="/news/madaniyat"
                                                    className="md:text-[20px] 2xl:text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                                >
                                                    Madaniyat
                                                </Link>
                                                <Link
                                                    href="/news/iqtisodiyota"
                                                    className="block 7xl:hidden md:text-[20px] 2xl:text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                                >
                                                    Iqtisodiyot
                                                </Link>
                                                <Link
                                                    href="/news/sport"
                                                    className="block 6xl:hidden md:text-[20px] 2xl:text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                                >
                                                    Sport
                                                </Link>
                                                <Link
                                                    href="/news/voqealar"
                                                    className="block 5xl:hidden md:text-[20px] 2xl:text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                                >
                                                    Voqealar
                                                </Link>
                                                <Link
                                                    href="/news/ozbekistonda"
                                                    className="block xl:hidden md:text-[20px] 2xl:text-[24px] font-medium text-white py-[10px] px-[10px] hover:bg-white hover:text-primery"
                                                >
                                                    O&apos;zbekistonda
                                                </Link>
                                            </div>
                                        )}
                                    </li>
                                </ul>
                                <div onMouseEnter={() => setMoreCategoriesIsOpen(false)} className="py-[20px] md:py-0">
                                    <ExchangeRate />
                                </div>
                                <div className="pl-[20px] py-[20px] md:hidden" onClick={() => setSidebarIsOpen(true)}>
                                    <Image src={burger} alt="" />
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
            <div
                className="fixed inset-0 w-full h-screen bg-[#1E293B] z-99 overflow-x-scroll translate-x-full"
                style={{
                    scrollbarWidth: "none",
                    transition: "all 0.1s",
                    transform: sidebarIsOpen ? "translateX(-100%)" : "",
                }}
            >
                <div className="flex flex-row justify-between p-[20px] border-b border-white">
                    <Link href={"/"} className="text-[24px] font-bold text-white" onClick={() => setSidebarIsOpen(false)} >
                        Aytkancha
                    </Link>
                    <Image
                        onClick={() => setSidebarIsOpen(false)}
                        src={closeIcon}
                        alt=""
                        className="bg-[#E9E8E8] h-[30px] w-[30px] object-scale-down rounded-[5px]"
                    />
                </div>
                <div className="pt-[20px]">
                    <h3 className="text-[15px] font-medium text-[#b5b2b2] pl-[40px] pb-[5px]">Sahifalar</h3>
                    <div className="pl-[40px] pb-[40px]">
                        <Link
                            href={"/"}
                            className="flex flex-row gap-[17px] items-center py-[10px]"
                            onClick={() => setSidebarIsOpen(false)}
                        >
                            <Image src={homeIcon} alt="" className="w-[22px] object-scale-down" />
                            <span className="text-[16px] font-medium text-white">Bosh sahifa</span>
                        </Link>
                        <Link
                            href={"/news/"}
                            className="flex flex-row gap-[17px] items-center py-[10px]"
                            onClick={() => setSidebarIsOpen(false)}
                        >
                            <Image src={newsIcon} alt="" className="w-[22px] object-scale-down" />
                            <span className="text-[16px] font-medium text-white">Yangiliklar</span>
                        </Link>
                        <Link
                            href={"/contacts/"}
                            className="flex flex-row gap-[17px] items-center py-[10px]"
                            onClick={() => setSidebarIsOpen(false)}
                        >
                            <Image src={contactsIcon} alt="" className="w-[22px] object-scale-down" />
                            <span className="text-[16px] font-medium text-white">Kontaktlar</span>
                        </Link>
                    </div>
                    <h3 className="text-[15px] font-medium text-[#b5b2b2] pl-[40px]">Kategoriyalar</h3>
                    <ul className="pt-[27px]">
                        {categories &&
                            categories.map((category) => (
                                <div key={category.id} className="py-[10px] pl-[30px] cursor-pointer pr-[14px]">
                                    <li
                                        className="flex flex-row justify-between items-center"
                                        onClick={() => setSubcategoryIsOpenSidebar(category.slug)}
                                    >
                                        <Link
                                            className="text-[18px] font-medium"
                                            href={`/news/${category.slug}/`}
                                            onClick={() => setSidebarIsOpen(false)}
                                            style={{
                                                color: category.slug == categoryBy ? "#5b89b8" : "white",
                                            }}
                                        >
                                            {category.title}
                                        </Link>
                                        <Image
                                            src={subcategoryIsOpenSidebar == category.slug ? blueArrowDown : arrowRight}
                                            alt=""
                                        />
                                    </li>
                                    {subcategoryIsOpenSidebar == category.slug && (
                                        <ul className="vertical_line_blue flex !flex-col mt-[15px]">
                                            {category.subcategories.map((subcategory) => (
                                                <Link
                                                    key={subcategory.id}
                                                    href={`/news/${category.slug}/${subcategory.slug}/`}
                                                    className="flex flex-row items-center gap-[10px] px-[10px] py-[10px]"
                                                    onClick={() => setSidebarIsOpen(false)}
                                                >
                                                    <span
                                                        className="h-[10px] min-w-[10px] rounded-full"
                                                        style={{
                                                            background:
                                                                subcategory.slug == subcategoryBy
                                                                    ? "#5b89b8"
                                                                    : "#a8a0a0",
                                                        }}
                                                    />
                                                    <span
                                                        className="text-[18px] font-medium"
                                                        style={{
                                                            color:
                                                                subcategory.slug == subcategoryBy ? "#5b89b8" : "white",
                                                        }}
                                                    >
                                                        {subcategory.title}
                                                    </span>
                                                </Link>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICategory } from "../_utils/types";
import { Navigation } from "swiper/modules";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import arrowDown from "../../public/images/Arrow.svg";
import "swiper/css";
import "swiper/css/navigation";

interface IProps {
    categories: ICategory[];
    params: {
        categoryBy?: string | undefined;
        subcategoryBy?: string | undefined;
    };
}

export default function CatSub({ categories, params }: IProps) {
    const { categoryBy, subcategoryBy } = params;
    const pathname = usePathname();
    const news = pathname.split("/")[1];
    const currentCategory = categoryBy && categories.find((category) => category.slug == categoryBy);

    return (
        <>
            <div className="bg-fifth">
                <div className="container">
                    <div className="flex flex-row w-full flex-wrap flex-row flex-wrap items-start">
                        {currentCategory &&
                            currentCategory.subcategories.map((subcategory) => (
                                <Link
                                    href={`/news/${currentCategory.slug}/${subcategory.slug}`}
                                    key={subcategory.id}
                                    className={
                                        "px-[15px] py-[10px] text-[28px] font-medium text-white hover:bg-white hover:text-fifth " +
                                        (subcategoryBy == subcategory.slug ? "active_subcategory" : "")
                                    }
                                >
                                    {subcategory.title}
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
            <div className="lg:hidden">
                <h1 className="font-bold text-[24px] pl-[7px] md:text-[18px] text-[#222] relative vertical_line_blue mb-[23px]">
                    {currentCategory && currentCategory.title}
                </h1>
                <div className="relative md:px-[50px] block lg:hidden">
                    <button className="prev hidden md:block py-[5px] px-[10px] md:px-[20px] absolute z-10 left-0 rotate-180 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Image src={arrowDown} alt="" />
                    </button>
                    <button className="next hidden md:block py-[5px] px-[10px] md:px-[20px] absolute z-10 right-0 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Image src={arrowDown} alt="" className="text-black" />
                    </button>
                    <Swiper
                        className="w-full h-full"
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            prevEl: ".prev",
                            nextEl: ".next",
                        }}
                        modules={[Navigation]}
                        breakpoints={{
                            0: { slidesPerView: 1.2, spaceBetween: 10 },
                            640: { slidesPerView: 2.2, spaceBetween: 20 },
                        }}
                    >
                        <SwiperSlide>
                            <Link href={`/news/${categoryBy}`}>
                                <h2
                                    className={
                                        "block py-[3px] px-[10px] bg-primery font-medium text-white text-[15px] md:text-[17px] rounded-[20px] " +
                                        (news == "news" && subcategoryBy == undefined && "active_subcategory")
                                    }
                                >
                                    Hammasi
                                </h2>
                            </Link>
                        </SwiperSlide>
                        {currentCategory &&
                            currentCategory.subcategories.map((subcategory) => (
                                <SwiperSlide key={subcategory.id} className="w-max">
                                    <Link
                                        href={`/news/${currentCategory.slug}/${subcategory.slug}/`}
                                        className={
                                            "block py-[3px] px-[10px] bg-primery font-medium text-white text-[15px] md:text-[17px] rounded-[20px] " +
                                            (subcategoryBy == subcategory.slug && "active_subcategory")
                                        }
                                    >
                                        {subcategory.title}
                                    </Link>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

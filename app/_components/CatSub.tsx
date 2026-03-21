"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICategory } from "../_utils/types";
import { Navigation } from "swiper/modules";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { categories } from "../_utils/utilis";

interface IProps {
    params: {
        categoryBy?: string | undefined;
        subcategoryBy?: string | undefined;
    };
}

export default function CatSub({ params }: IProps) {
    const { categoryBy, subcategoryBy } = params;
    const pathname = usePathname();
    const news = pathname.split("/")[1];
    const currentCategory = categoryBy && categories.find((category) => category.slug == categoryBy);

    return (
        <>
            <div className="bg-[#101d31] hidden md:block">
                <div className="max-w-[1890px] px-[15px] mx-auto">
                    <div className="flex flex-row w-full flex-wrap flex-row flex-wrap items-start">
                        {currentCategory &&
                            currentCategory.subcategories.map((subcategory) => (
                                <Link
                                    href={`/news/${currentCategory.slug}/${subcategory.slug}`}
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
            <div className="block md:hidden pt-[20px] px-[15px]">
                {/* <h1 className="font-bold text-[24px] pl-[7px] md:text-[18px] text-[#222] relative vertical_line_blue mb-[23px]">
                    {currentCategory && currentCategory.title}
                </h1> */}
                <div className="relative block md:hidden">
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
                            0: { slidesPerView: 1.5, spaceBetween: 10 },
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

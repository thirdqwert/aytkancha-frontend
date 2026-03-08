"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { getDateString, getVids } from "../utils/utilis";
import { IVidsObject } from "../utils/types";
import Image from "next/image";
import swipperArrow from "../../public/images/rightArrow.svg";
import play from "../../public/images/play.svg";
import "swiper/css";
import "swiper/css/navigation";

import Loader from "./Loader";

export default function VidsSwiper() {
    const [vids, setVids] = useState<IVidsObject | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getVids(undefined);
                setVids(data);
            } catch (error) {
                throw error;
            }
        };
        getData();
    }, []);

    return vids ? (
        <div className="relative">
            <button className="prev_vids hidden md:block absolute z-10 -left-[0] top-[40%] rotate-180 -translate-y-1/2 cursor-pointer">
                <Image src={swipperArrow} alt="" />
            </button>
            <button className="next_vids hidden md:block absolute z-10 -right-[0] top-[40%] -translate-y-1/2 cursor-pointer">
                <Image src={swipperArrow} alt="" />
            </button>
            <div className="px-[0] md:px-[50px]">
                <Swiper
                    loop={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    navigation={{
                        prevEl: ".prev_vids",
                        nextEl: ".next_vids",
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 1.05, spaceBetween: 15 },
                        640: { slidesPerView: 1.2, spaceBetween: 15 },
                        1024: { slidesPerView: 3, spaceBetween: 15 },
                        1536: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                >
                    {vids.results.map((vid) => (
                        <SwiperSlide key={vid.id}>
                            <a
                                href={vid.link}
                                className="flex flex-col gap-[10px] md:gap-[15px]"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="relative rounded-[20px] overflow-hidden">
                                    <Image
                                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                                        width={0}
                                        height={0}
                                        src={vid.image}
                                        alt={vid.title}
                                        className="w-full object-cover h-[250px]"
                                    />
                                    <Image
                                        src={play}
                                        alt=""
                                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
                                    />
                                </div>
                                <h3 className="font-bold text-[20px] text-secondery short_title">{vid.title}</h3>
                                <time
                                    dateTime={vid.created_at.split("T")[0]}
                                    className="font-bold text-[24px] text-secondery"
                                >
                                    {getDateString(vid.created_at)}
                                </time>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    ) : (
        <div className="flex flex-row items-center justify-center h-[360px] w-full">
            <Loader />
        </div>
    );
}

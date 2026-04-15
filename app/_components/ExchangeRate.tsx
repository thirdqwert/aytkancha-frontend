"use client";
import { useEffect, useState } from "react";
import { IExchange } from "../_utils/types";
import Image from "next/image";
import redDown from "../../public/images/redDown.svg";
import greenTop from "../../public/images/greenTop.svg";
import "swiper/css";
import { Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

export default function ExchangeRate() {
    const [uzbUsd, setUzbUsd] = useState<IExchange | null>(null);
    const [uzbRub, setUzbRub] = useState<IExchange | null>(null);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                const [usdRes, rubRes] = await Promise.all([
                    fetch("https://cbu.uz/ru/arkhiv-kursov-valyut/json/USD/"),
                    fetch("https://cbu.uz/ru/arkhiv-kursov-valyut/json/RUB/"),
                ]);
                const [usdData, rubData] = await Promise.all([usdRes.json(), rubRes.json()]);
                setUzbUsd(usdData[0]);
                setUzbRub(rubData[0]);
                setisLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <>
            {isLoading && (
                <div className="flex flex-row gap-[20px] hidden 2xl:flex">
                    <div className="flex flex-row rounded-[15px] gap-[10px] py-[7px] px-[15px] overflow-hidden bg-white">
                        <span className="text-[29px] font-bold text-primery">US</span>
                        <div className="flex flex-row items-center gap-[20px]">
                            <span className="block font-medium text-[29px] text-primery">
                                {uzbUsd ? uzbUsd.Rate.split(".")[0] : 0}
                            </span>
                            <Image
                                className="object-contain h-[24px] w-[18px]"
                                src={uzbUsd && uzbUsd.Diff[0] == "-" ? redDown : greenTop}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-row rounded-[15px] gap-[10px] py-[7px] px-[15px] overflow-hidden bg-white">
                        <span className="text-[29px] font-bold text-primery">RUB</span>
                        <div className="flex flex-row items-center gap-[20px]">
                            <span className="block font-medium text-[29px] text-primery">
                                {uzbRub ? uzbRub.Rate.split(".")[0] : 0}
                            </span>
                            <Image
                                className="object-contain h-[24px] w-[18px]"
                                src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="h-[29px] md:h-[42px] block 2xl:hidden w-[130px] md:w-[160px]">
                {isLoading && (
                    <Swiper
                        className="h-full w-full"
                        direction={"vertical"}
                        loop={true}
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                        <SwiperSlide className="w-max leading-none">
                            <div className="flex flex-row items-center rounded-[15px] gap-[5px] md:gap-[10px] h-full justify-center overflow-hidden bg-white">
                                <span className="text-[20px] md:text-[24px] font-bold text-primery">RUB</span>
                                <div className="flex flex-row items-center gap-[10px] md:gap-[20px]">
                                    <span className="block font-medium text-[20px] md:text-[24px] text-primery">
                                        {uzbRub ? uzbRub.Rate.split(".")[0] : 0}
                                    </span>
                                    <Image
                                        className="object-contain w-[10px] h-[14px] md:h-[19px] md:w-[14px]"
                                        src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="w-max leading-none">
                            <div className="flex flex-row items-center rounded-[15px] gap-[5px] md:gap-[10px] h-full justify-center overflow-hidden bg-white">
                                <span className="text-[20px] md:text-[24px] font-bold text-primery">US</span>
                                <div className="flex flex-row items-center gap-[10px] md:gap-[20px]">
                                    <span className="block font-medium text-[20px] md:text-[24px] text-primery">
                                        {uzbUsd ? uzbUsd.Rate.split(".")[0] : 0}
                                    </span>
                                    <Image
                                        className="object-contain w-[10px] h-[14px] md:h-[19px] md:w-[14px]"
                                        src={uzbUsd && uzbUsd.Diff[0] == "-" ? redDown : greenTop}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                )}
            </div>
        </>
    );
}

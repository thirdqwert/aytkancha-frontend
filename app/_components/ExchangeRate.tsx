"use client";
import { useEffect, useState } from "react";
import { IExchange } from "../_utils/types";
import Image from "next/image";
import redDown from "../../public/images/redDown.svg";
import greenTop from "../../public/images/greenTop.svg";
import "swiper/css";

export default function ExchangeRate() {
    const [uzbUsd, setUzbUsd] = useState<IExchange | null>(null);
    const [uzbRub, setUzbRub] = useState<IExchange | null>(null);

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
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <>
            {/* для маленький экранов */}
            <div className="flex flex-row gap-[20px]">
                <div
                    className="flex flex-row rounded-[15px] overflow-hidden"
                    style={{ boxShadow: "0 0 8px 5px rgba(0, 0, 0, 0.3)" }}
                >
                    <span className="bg-primery px-[15px] pt-[10px] pb-[7px] text-white text-[32px] font-medium">
                        US
                    </span>
                    <div className="bg-third flex flex-row px-[15px] pt-[10px] pb-[7px] items-center gap-[20px]">
                        <span className="block font-medium text-[32px] text-secondery">{uzbUsd ? uzbUsd.Rate : 0}</span>
                        <Image
                            className="object-contain h-[24px] w-[18px]"
                            src={uzbUsd && uzbUsd.Diff[0] == "-" ? redDown : greenTop}
                            alt=""
                        />
                    </div>
                </div>
                <div
                    className="flex flex-row rounded-[15px] overflow-hidden"
                    style={{ boxShadow: "0 0 8px 5px rgba(0, 0, 0, 0.3)" }}
                >
                    <span className="bg-primery px-[15px] pt-[10px] pb-[7px] text-white text-[32px] font-medium">
                        RU
                    </span>
                    <div className="bg-third flex flex-row px-[15px] pt-[10px] pb-[7px] items-center gap-[20px]">
                        <span className="block font-medium text-[32px] text-secondery]">
                            {uzbRub ? uzbRub.Rate : 0}
                        </span>
                        <Image
                            className="object-contain h-[24px] w-[18px]"
                            src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

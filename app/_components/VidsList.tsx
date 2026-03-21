"use client";

import { useEffect, useState } from "react";
import { getDateString, getVids } from "../_utils/utilis";
import { IVids, IVidsObject } from "../_utils/types";
import Image from "next/image";
import play from "../../public/images/play.svg";
import Loader from "./Loader";

const cardTypes: any = {
    big: {
        title: "text-[10px] md:text-[15px] lg:text-[25px]",
        categoryAndDate: "text-[10px] md:text-[15px] lg:text-[20px] 2xl:text-[25px]",
        contentPaddings: "px-[10px] md:px-[40px] lg:px-[50px] 2xl:px-[80px]",
    },
    long: {
        title: "text-[10px] lg:text-[15px] 2xl:text-[18px]",
        categoryAndDate: "text-[10px] lg:text-[15px] 2xl:text-[18px]",
        contentPaddings: "px-[10px] 2xl:px-[20px]",
    },
    small: {
        title: "text-[10px] lg:text-[15px] 2xl:text-[17px]",
        categoryAndDate: "text-[10px] lg:text-[15px] 2xl:text-[17px]",
        contentPaddings: "px-[10px] 2xl:px-[20px]",
    },
};

export default function VidsList() {
    const [vids, setVids] = useState<IVidsObject | null>(null);

    const card = (item: IVids, cardType: string) => {
        return (
            <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer">
                <article className="relative h-full w-full">
                    <Image
                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                        width={0}
                        height={0}
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                    />
                    <div
                        className="absolute inset-0 h-full w-full"
                        style={{
                            background:
                                "linear-gradient(180deg,rgba(255, 255, 255, 0) 44%, rgba(0, 0, 0, 0.44) 57%, rgba(0, 0, 0, 0.75) 78%)",
                        }}
                    />
                    <Image src={play} alt="" className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 h-[24px] w-[24px] lg:h-[38px] lg:w-[38px] 2xl:h-[43px] 2xl:w-[43px]" />
                    <div
                        className={
                            "absolute bottom-[10px] flex flex-col gap-[3px] md:gap-[15px] " + cardTypes[cardType].contentPaddings
                        }
                    >
                        <h3 className={"text-white font-bold short_title " + cardTypes[cardType].title}>
                            {item.title}
                        </h3>
                        <div className="flex flex-row gap-[15px]">
                            <time
                                dateTime={item.created_at.split("T")[0]}
                                className={"font-bold text-white " + cardTypes[cardType].categoryAndDate}
                            >
                                {getDateString(item.created_at)}
                            </time>
                        </div>
                    </div>
                </article>
            </a>
        );
    };

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
        <div>
            <div className="flex flex-col 2xl:flex-row gap-[20px] 2xl:gap-[30px]">
                {vids.results[0] && (
                    <div className="2xl:max-w-[1070px] w-full md:h-[345px] lg:h-[497px] 2xl:h-[620px]">{card(vids.results[0], "big")}</div>
                )}
                <div className="flex flex-col md:flex-row 2xl:flex-col gap-[20px] 2xl:max-w-[630px] w-full">
                    {vids.results[2] && <div className="md:h-[175px] lg:h-[260px] 2xl:h-[300px] w-full">{card(vids.results[2], "long")}</div>}
                    {vids.results[1] && <div className="md:h-[175px] lg:h-[260px] 2xl:h-[300px] w-full">{card(vids.results[1], "long")}</div>}
                </div>
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-[repeat(auto-fill,minmax(410px,1fr))] md:auto-rows-[175px] lg:auto-rows-[260px] 2xl:auto-rows-[250px] gap-[20px] 2xl:gap-[30px] pt-[20px] 2xl:pt-[30px]">
                {vids.results.slice(3, 7).map((item) => card(item, "small"))}
            </div>
        </div>
    ) : (
        <div className="flex flex-row items-center justify-center h-[900px] w-full">
            <Loader />
        </div>
    );
}

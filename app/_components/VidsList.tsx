"use client";

import { useEffect, useState } from "react";
import { getDateString, getVids } from "../_utils/utilis";
import { IVids, IVidsObject } from "../_utils/types";
import Image from "next/image";
import play from "../../public/images/play.svg";
import Loader from "./Loader";

const cardTypes: any = {
    big: {
        title: "text-[25px]",
        categoryAndDate: "text-[25px]",
        contentPaddings: "px-[80px]",
    },
    long: {
        title: "text-[18px]",
        categoryAndDate: "text-[18px]",
        contentPaddings: "px-[20px]",
    },
    small: {
        title: "text-[17px]",
        categoryAndDate: "text-[17px]",
        contentPaddings: "px-[20px]",
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
                    <Image src={play} alt="" className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 h-[43px] w-[43px]" />
                    <div
                        className={
                            "absolute bottom-[10px] flex flex-col gap-[15px] " + cardTypes[cardType].contentPaddings
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
            <div className="flex flex-row gap-[30px]">
                {vids.results[0] && (
                    <div className="max-w-[1070px] w-full h-[620px]">{card(vids.results[0], "big")}</div>
                )}
                <div className="flex flex-col gap-[20px] max-w-[630px] w-full">
                    {vids.results[1] && <div className="h-[300px]">{card(vids.results[1], "long")}</div>}
                    {vids.results[2] && <div className="h-[300px]">{card(vids.results[2], "long")}</div>}
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(410px,1fr))] auto-rows-[250px] gap-[30px] pt-[30px]">
                {vids.results.slice(3, 7).map((item) => card(item, "small"))}
            </div>
        </div>
    ) : (
        <div className="flex flex-row items-center justify-center h-[900px] w-full">
            <Loader />
        </div>
    );
}

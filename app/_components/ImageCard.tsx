import Link from "next/link";
import { INews } from "../_utils/types";
import Image from "next/image";
import { getDateString } from "../_utils/utilis";

interface IProps {
    item: INews;
    cardType: string;
}

const cardTypes: any = {
    big: {
        title: "text-[10px] md:text-[17px] lg:text-[24px] 2xl:text-[36px]",
        categoryAndDate: "text-[10px] md:text-[17px] lg:text-[20px] 2xl:text-[25px]",
        contentPaddings: "px-[10px] md:px-[30px] lg:px-[50px] 2xl:px-[30px]",
    },
    long: {
        title: "text-[10px] md:text-[10px] lg:text-[15px] 2xl:text-[20px]",
        categoryAndDate: "text-[10px] md:text-[10px] lg:text-[15px] 2xl:text-[18px]",
        contentPaddings: "px-[10px] lg:px-[30px] 2xl:px-[10px]",
    },
    small: {
        title: "md:text-[10px] lg:text-[15px] 2xl:text-[17px]",
        categoryAndDate: "md:text-[10px] lg:text-[15px] 2xl:text-[16px]",
        contentPaddings: "md:px-[10px] 2xl:px-[15px]",
    },
};

export default function ImageCard({ item, cardType }: IProps) {
    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="relative h-full w-full">
                <Image
                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                    width={0}
                    height={0}
                    className="min-h-[170px] w-full h-full object-cover"
                    src={item.preview}
                    alt={item.short_title}
                />
                <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                        background:
                            "linear-gradient(180deg,rgba(255, 255, 255, 0) 44%, rgba(0, 0, 0, 0.44) 57%, rgba(0, 0, 0, 0.75) 78%)",
                    }}
                />
                <div
                    className={"absolute bottom-[10px] flex flex-col gap-[5px] md:gap-[15px] " + cardTypes[cardType].contentPaddings}
                >
                    <h3 className={"text-white font-bold short_title " + cardTypes[cardType].title}>{item.title}</h3>
                    <div className="flex flex-row gap-[15px]">
                        <h2 className={"font-bold text-white " + cardTypes[cardType].categoryAndDate}>
                            {item.category}
                        </h2>
                        <time
                            dateTime={item.created_at.split("T")[0]}
                            className={"font-bold text-white " + cardTypes[cardType].categoryAndDate}
                        >
                            {getDateString(item.created_at)}
                        </time>
                    </div>
                </div>
            </article>
        </Link>
    );
}

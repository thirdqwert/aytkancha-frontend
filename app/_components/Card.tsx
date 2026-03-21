import { INews } from "../_utils/types";
import { getDateString } from "../_utils/utilis";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    item: INews;
}

export default function Card({ item }: IProps) {
    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="w-full flex flex-col gap-[10px]">
                <Image
                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                    width={0}
                    height={0}
                    className="w-full h-[185px] md:h-[175px] lg:h-[300px] object-cover"
                    src={item.preview}
                    alt={item.short_title}
                />
                <div className="flex flex-col pt-0 2xl:pt-[10px] gap-[10px] lg:gap-[15px]">
                    <h3 className="font-bold text-third md:text-[13px] lg:text-[18px] short_title">{item.title}</h3>
                    <p className="text-fourth md:text-[12px] lg:text-[17px] font-medium long_desc">{item.desc}</p>
                    <div>
                        <div className="flex flex-row justify-between mt-auto">
                            <h2 className="md:text-[13px] lg:text-[19px] 2xl:text-[20px] font-bold text-secondery">{item.category}</h2>
                            <time
                                dateTime={item.created_at.split("T")[0]}
                                className="md:text-[13px] lg:text-[19px] 2xl:text-[20px] font-bold text-third"
                            >
                                {getDateString(item.created_at)}
                            </time>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

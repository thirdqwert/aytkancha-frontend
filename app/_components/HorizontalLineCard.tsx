import Image from "next/image";
import Link from "next/link";
import { getDateString } from "../_utils/utilis";
import { INews } from "../_utils/types";

interface IProps {
    item: INews;
}
export default function HorizontalLineCard({ item }: IProps) {
    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="w-full h-full flex flex-col md:flex-row gap-[10px] md:gap-[15px]">
                <Image
                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                    width={0}
                    height={0}
                    src={item.preview}
                    alt={item.short_title}
                    className="w-full min-h-[185px] md:h-[140px] md:w-[220px] object-cover"
                />
                <div className="flex flex-col gap-[15px] w-full">
                    <h3 className="text-[13px] lg:text-[25px] text-third font-bold short_title">{item.title}</h3>
                    <p className="text-[12px] lg:text-[18px] 2xl:text-[20px] !block 7xl:!hidden font-medium text-fourth long_desc leading-[167%]">
                        {item.desc}
                    </p>
                    <div className="flex flex-row justify-between mt-auto">
                        <h2 className="text-[13px] lg:text-[20px] font-bold text-secondery">{item.category}</h2>
                        <time dateTime={item.created_at.split("T")[0]} className="text-[13px] lg:text-[20px] font-bold text-third">
                            {getDateString(item.created_at)}
                        </time>
                    </div>
                </div>
            </article>
        </Link>
    );
}

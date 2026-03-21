import { INews } from "../_utils/types";
import { getDateString } from "../_utils/utilis";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    item: INews;
}
export default function HorizontalCard({ item }: IProps) {
    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="w-full h-full flex flex-col md:flex-row gap-[30px]">
                <Image
                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                    width={0}
                    height={0}
                    src={item.preview}
                    alt={item.short_title}
                    className="2xl:h-[170px] h-[180px] w-full 2xl:w-[300px] object-cover "
                />
                <div className="flex flex-col gap-[15px] w-full]">
                    <h3 className="md:text-[14px] lg:text-[18px] text-third font-bold short_title">{item.title}</h3>
                    <p className="md:text-[12px] lg:text-[18px] font-medium text-fourth long_desc">{item.desc}</p>
                    <div className="flex flex-row justify-between mt-auto">
                        <h2 className="md:text-[14px] lg:text-[16px] font-bold text-secondery">{item.category}</h2>
                        <time dateTime={item.created_at.split("T")[0]} className="md:text-[14px] lg:text-[16px] font-bold text-third">
                            {getDateString(item.created_at)}
                        </time>
                    </div>
                </div>
            </article>
        </Link>
    );
}

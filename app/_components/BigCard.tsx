import Image from "next/image";
import { INews } from "../_utils/types";
import Link from "next/link";
import { getDateString } from "../_utils/utilis";

interface IProps {
    item: INews;
}
export default function BigCard({ item }: IProps) {
    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="w-full h-full flex flex-col gap-[15px]">
                <Image
                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev" ? true : false}
                    width={0}
                    height={0}
                    src={item.preview}
                    alt={item.short_title}
                    className="w-full h-[430px] object-cover"
                />
                <h3 className="text-third font-bold text-[25px] short_title">{item.title}</h3>
                <p className="text-fourth font-medium text-[23px] long_desc">{item.desc}</p>
                <div className="flex flex-row justify-between">
                    <h2 className="text-[20px] font-bold text-secondery">{item.category}</h2>
                    <time dateTime={item.created_at.split("T")[0]} className="text-[20px] font-bold text-third">
                        {getDateString(item.created_at)}
                    </time>
                </div>
            </article>
        </Link>
    );
}

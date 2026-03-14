import { INews } from "../_utils/types";
import { getDateString } from "../_utils/utilis";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    item: INews;
    isDesc?: boolean;
}
export default function HorizontalCard({ item, isDesc = true }: IProps) {
    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="w-full h-full flex flex-row gap-[20px]">
                <Image
                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                    width={0}
                    height={0}
                    src={item.preview}
                    alt={item.short_title}
                    className="h-[170px] w-[300px] object-cover "
                />
                <div className="flex flex-col justify-between gap-[15px]">
                    <h3 className="text-[18px] text-third font-bold short_title">{item.title}</h3>
                    {isDesc && <p className="text-[18px] font-medium text-fourth long_desc">{item.desc}</p>}
                    <div className="flex flex-row justify-between">
                        <h2 className="text-[16px] font-bold text-secondery">{item.category}</h2>
                        <time dateTime={item.created_at.split("T")[0]} className="text-[16px] font-bold text-third">
                            {getDateString(item.created_at)}
                        </time>
                    </div>
                </div>
            </article>
        </Link>
    );
}

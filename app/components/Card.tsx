import { INews } from "../utils/types";
import { getDateString } from "../utils/utilis";
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
                    className="w-full object-cover rounded-[10px]"
                    src={item.preview}
                    alt={item.short_title}
                />
                <div className="flex flex-col pt-[10px] gap-[15px]">
                    <h3 className="font-bold text-secondery text-[20px] short_title">{item.title}</h3>
                    <p className="text-fourth text-[17px] font-medium long_desc">{item.desc}</p>
                    <div>
                        <div className="flex flex-row justify-between">
                            <h2 className="text-[25px] font-bold text-primery">{item.category}</h2>
                            <time
                                dateTime={item.created_at.split("T")[0]}
                                className="text-[25px] font-bold text-secondery"
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

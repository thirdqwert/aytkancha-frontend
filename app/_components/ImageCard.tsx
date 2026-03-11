import Link from "next/link";
import { INews } from "../_utils/types";
import Image from "next/image";
import { getDateString } from "../_utils/utilis";

interface IProps {
    item: INews;
}
export default function ImageCard({ item }: IProps) {
    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="relative h-[527px]">
                <Image
                    unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                    width={0}
                    height={0}
                    className="w-full h-full object-cover rounded-[10px]"
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
                <div className="absolute bottom-[10px] px-[40px] flex flex-col gap-[10px]">
                    <h3 className="text-white font-bold text-[24px] ">{item.title}</h3>
                    <p className="text-[20px] font-medium text-white">{item.desc}</p>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-[25px] font-bold text-primery">{item.category}</h2>
                        <time dateTime={item.created_at.split("T")[0]} className="text-[25px] font-bold text-white">
                            {getDateString(item.created_at)}
                        </time>
                    </div>
                </div>
            </article>
        </Link>
    );
}

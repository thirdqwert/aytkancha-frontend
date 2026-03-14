import Image from "next/image";
import Arrow from "../../../public/images/Arrow.svg";
import Link from "next/link";

interface IProps {
    link: string;
    title: string;
}

export default function HeadingLine({ link, title }: IProps) {
    return (
        <Link href={`/news/${link}`} className="flex flex-row items-center justify-between border-b border-b-primery">
            <h2 className="font-medium text-[30px] bg-primery text-white py-[7px] px-[25px] rounded-tl-[15px] rounded-tr-[15px]">
                {title}
            </h2>
        </Link>
    );
}

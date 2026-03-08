import Image from "next/image";
import Arrow from "../../../public/images/Arrow.svg";
import Link from "next/link";

interface IProps {
    link: string;
    title: string;
}

export default function HeadingLine({ link, title }: IProps) {
    return (
        <Link href={link} className="flex flex-row items-center justify-between border-b border-b-primery">
            <h2 className="font-medium text-[30px] bg-primery text-white py-[12px] px-[20px] rounded-tl-[15px] rounded-tr-[15px]">
                {title}
            </h2>
            <div className="flex flex-row items-center gap-[20px] border border-primery px-[10px] py-[6px] rounded-[5px]">
                <p className="font-medium text-[30px] text-primery">Hammasi</p>
                <Image height={15} width={9} src={Arrow} alt=">" />
            </div>
        </Link>
    );
}

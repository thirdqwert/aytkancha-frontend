import Image from "next/image";
import instagramm from "../../public/images/instagramm.svg";
import telegram from "../../public/images/telegram.svg";
import youtube from "../../public/images/youtube.svg";
import facebook from "../../public/images/facebook.svg";
import Link from "next/link";

export default async function Footer() {
    return (
        <footer>
            <nav className="bg-primery pt-[70px] pb-[35px]">
                <div className="container">
                    <div className="flex flex-row justify-between">
                        <ul className="flex flex-col gap-[20px]">
                            <li>
                                <Link href={"/news/"} className="font-bold text-[32px] text-white">
                                    Yangiliklar
                                </Link>
                            </li>
                            <li>
                                <Link href={"/news/dunyoda/"} className="font-medium text-[25px] text-white">
                                    Dunyoda
                                </Link>
                            </li>
                            <li>
                                <Link href={"/news/ozbekistonda/"} className="font-medium text-[25px] text-white">
                                    O&apos;zbekistonda
                                </Link>
                            </li>
                            <li>
                                <Link href={"/contacts/"} className="font-medium text-[25px] text-white">
                                    Kontaktlar
                                </Link>
                            </li>
                        </ul>
                        <Link href={"/"} className="text-white flex flex-col">
                            <span className=" font-bold text-[90px]">Aytkancha</span>
                            <div className="w-[140px] mx-auto h-[1px] bg-white my-[10px]" />
                            <span className=" text-[32px]">O&apos; zbekistonning Yangilik Portali</span>
                        </Link>
                        <ul className="flex flex-col gap-[20px]">
                            <li>
                                <Link
                                    href={"/news/"}
                                    className="font-bold text-[32px] text-white flex flex-row items-center gap-[20px]"
                                >
                                    Ijtimoiy tarmoqlar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/news/dunyoda/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[20px]"
                                >
                                    <Image src={telegram} alt="" />
                                    <span>Dunyoda</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/news/ozbekistonda/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[20px]"
                                >
                                    <Image src={instagramm} alt="" />
                                    <span>Instagram</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/contacts/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[20px]"
                                >
                                    <Image src={facebook} alt="" />
                                    <span>Facebook</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/contacts/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[20px]"
                                >
                                    <Image src={youtube} alt="" />
                                    <span>YouTube</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="bg-[#213658] py-[16px]">
                <div className="container">
                    <div className="text-white text-[20px] font-bold ">
                        © 2026 Aytkancha.uz — Barcha huquqlar himoyalangan
                    </div>
                </div>
            </div>
        </footer>
    );
}

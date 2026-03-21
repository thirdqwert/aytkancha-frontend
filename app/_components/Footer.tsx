import Image from "next/image";
import instagramm from "../../public/images/instagramm.svg";
import telegram from "../../public/images/telegram.svg";
import youtube from "../../public/images/youtube.svg";
import facebook from "../../public/images/facebook.svg";
import Link from "next/link";

export default async function Footer() {
    return (
        <footer>
            <nav className="bg-primery py-[30px] md:py-[40px] 2xl:pt-[70px] 2xl:pb-[35px]">
                <div className="container">
                    <div className="flex flex-col 2xl:flex-row justify-between gap-[50px] md:gap-[60px]">
                        <div className="flex flex-col gap-[10px] md:gap-[20px]">
                            <Link
                                href={"/news/"}
                                className="font-bold text-[16px] md:text-[30px] lg:text-[32px] text-white"
                            >
                                Yangiliklar
                            </Link>
                            <ul className="flex flex-row 2xl:flex-col gap-[20px]">
                                <li>
                                    <Link
                                        href={"/news/dunyoda/"}
                                        className="font-medium text-[14px] md:text-[25px] text-white"
                                    >
                                        Dunyoda
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/news/ozbekistonda/"}
                                        className="font-medium text-[14px] md:text-[25px] text-white"
                                    >
                                        O&apos;zbekistonda
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/contacts/"}
                                        className="font-medium text-[14px] md:text-[25px] text-white"
                                    >
                                        Kontaktlar
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Link href={"/"} className="text-white flex flex-col">
                            <span className="text-center font-bold text-[40px] md:text-[80px] lg:text-[90px]">
                                Aytkancha
                            </span>
                            <div className="w-[140px] mx-auto h-[1px] bg-white my-[10px]" />
                            <span className="text-center text-[14px] md:text-[28px] lg:text-[32px]">
                                O&apos;zbekistonning Yangilik Portali
                            </span>
                        </Link>
                        <div className="flex flex-col gap-[10px] md:gap-[20px]">
                            <Link
                                href={"/news/"}
                                className="font-bold text-[15px] md:text-[30px] lg:text-[32px] text-white flex flex-row items-center gap-[20px]"
                            >
                                Ijtimoiy tarmoqlar
                            </Link>
                            <ul className="flex flex-row 2xl:flex-col flex-wrap gap-[20px]">
                                <li>
                                    <a
                                        href={""}
                                        className="font-medium text-[14px] md:text-[25px] text-white flex flex-row items-center gap-[20px]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image src={telegram} alt="" />
                                        <span>Telegram</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={""}
                                        className="font-medium text-[14px] md:text-[25px] text-white flex flex-row items-center gap-[20px]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image src={instagramm} alt="" />
                                        <span>Instagram</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={""}
                                        className="font-medium text-[14px] md:text-[25px] text-white flex flex-row items-center gap-[20px]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image src={facebook} alt="" />
                                        <span>Facebook</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={""}
                                        className="font-medium text-[14px] md:text-[25px] text-white flex flex-row items-center gap-[20px]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image src={youtube} alt="" />
                                        <span>YouTube</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="bg-[#213658] py-[10px] 2xl:py-[16px]">
                <div className="container">
                    <div className="text-[#c8b7b7] text-[10px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] font-bold ">
                        © 2026 Aytkancha.uz — Barcha huquqlar himoyalangan
                    </div>
                </div>
            </div>
        </footer>
    );
}

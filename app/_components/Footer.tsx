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
                            <span className="font-PlayfairDisplay font-bold text-[90px]">Aytkancha</span>
                            <div className="w-[140px] mx-auto h-[1px] bg-white my-[10px]" />
                            <span className="font-PlayfairDisplay text-[32px]">
                                O&apos; zbekistonning Yangilik Portali
                            </span>
                        </Link>
                        <ul className="flex flex-col gap-[20px]">
                            <li>
                                <Link
                                    href={"/news/"}
                                    className="font-bold text-[32px] text-white flex flex-row items-center gap-[40px]"
                                >
                                    Ijtimoiy tarmoqlar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/news/dunyoda/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[40px]"
                                >
                                    <span>Dunyoda</span>
                                    <Image src={telegram} alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/news/ozbekistonda/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[40px]"
                                >
                                    <span>Instagram</span>
                                    <Image src={instagramm} alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/contacts/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[40px]"
                                >
                                    <span>Facebook</span>
                                    <Image src={facebook} alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/contacts/"}
                                    className="font-medium text-[25px] text-white flex flex-row items-center gap-[40px]"
                                >
                                    <span>YouTube</span>
                                    <Image src={youtube} alt="" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="bg-fifth py-[16px]">
                <div className="container">
                    <div className="text-third text-[20px] font-bold font-Inter">© 2026 Aytkancha.uz — Barcha huquqlar himoyalangan</div>
                </div>
            </div>
        </footer>
    );
}

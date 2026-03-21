import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Image from "next/image";
import telegramIcon from "../../public/images/telegramBlack.svg";
import instagramBlack from "../../public/images/instagramBlack.svg";
import facebookBlack from "../../public/images/facebookBlack.svg";
import youtubeBlack from "../../public/images/youtubeBlack.svg";

export default async function Contacts() {
    return (
        <>
            <Header />
            <main className="py-[50px] min-h-[calc(100vh-328px)]">
                <div className="container">
                    <div className="flex flex-col items-center 2xl:items-start 2xl:flex-row justify-center gap-[40px] md:gap-[70px] 2xl:gap-[90px]">
                        <div
                            className="max-w-[600px] bg-[#e9e8e8] w-full"
                            style={{ boxShadow: "0 0 8px 5px rgba(0, 0, 0, 0.3)" }}
                        >
                            <h2 className="font-medium text-[20px] md:text-[32px] text-white bg-primery py-[15px] px-[30px] bg-primery">
                                Aloqa
                            </h2>
                            <div className="px-[15px] md:px-[30px] pt-[30px] pb-[40px]">
                                <div className="flex flex-col gap-[5px] pb-[20px]">
                                    <span className="block text-[17px] md:text-[24px] font-medium text-[#818a93]">
                                        Elektron pochta
                                    </span>
                                    <span className="block text-primery text-[19px] font-medium">
                                        Aytkancha@gmail.com
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <span className="block text-[17px] md:text-[24px] font-medium text-[#818a93]">Telefon raqami</span>
                                    <span className="block text-primery text-[19px] font-medium">(32)333-33-44</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="max-w-[600px] bg-[#e9e8e8] w-full hidden md:block"
                            style={{ boxShadow: "0 0 8px 5px rgba(0, 0, 0, 0.3)" }}
                        >
                            <h2 className="font-medium text-[32px] text-white bg-primery py-[15px] px-[30px] bg-primery">
                                Ijtimoiy tarmoqlar
                            </h2>
                            <div className="px-[30px] py-[20px] flex flex-col gap-[15px]">
                                <div className="flex flex-row gap-[30px]">
                                    <span className="block text-[24px] font-medium text-primery">Telegram:</span>
                                    <Link href={""} className="block text-[#295480] text-[26px] font-medium">
                                        t.me/Aytkancha
                                    </Link>
                                </div>
                                <div className="flex flex-row gap-[30px]">
                                    <span className="block text-[24px] font-medium text-primery">Instagram:</span>
                                    <Link href={""} className="block text-[#295480] text-[26px] font-medium">
                                        instagram.com/Aytkancha
                                    </Link>
                                </div>

                                <div className="flex flex-row gap-[30px]">
                                    <span className="block text-[24px] font-medium text-primery">Facebook:</span>
                                    <Link href={""} className="block text-[#295480] text-[26px] font-medium">
                                        Facebook.com/Aytkancha
                                    </Link>
                                </div>
                                <div className="flex flex-row gap-[30px]">
                                    <span className="block text-[24px] font-medium text-primery">YouTube:</span>
                                    <Link href={""} className="block text-[#295480] text-[26px] font-medium">
                                        YouTube.com/Aytkancha
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div
                            className="max-w-[600px] bg-[#e9e8e8] w-full block md:hidden"
                            style={{ boxShadow: "0 0 8px 5px rgba(0, 0, 0, 0.3)" }}
                        >
                            <h2 className="font-medium text-[20px] md:text-[32px] text-white bg-primery py-[15px] px-[30px] bg-primery">
                                Ijtimoiy tarmoqlar
                            </h2>
                            <div className="px-[15px] md:px-[30px] py-[20px] flex flex-col gap-[15px]">
                                <div className="flex flex-row gap-[20px]">
                                    <Image src={telegramIcon} alt="" />
                                    <Link href={""} className="block text-[#295480] text-[19px] font-medium">
                                        Telegram
                                    </Link>
                                </div>
                                <div className="flex flex-row gap-[20px]">
                                    <Image src={instagramBlack} alt="" />
                                    <Link href={""} className="block text-[#295480] text-[19px] font-medium">
                                        Instagram
                                    </Link>
                                </div>

                                <div className="flex flex-row gap-[20px]">
                                    <Image src={facebookBlack} alt="" />
                                    <Link href={""} className="block text-[#295480] text-[19px] font-medium">
                                        Facebook
                                    </Link>
                                </div>
                                <div className="flex flex-row gap-[20px]">
                                    <Image src={youtubeBlack} alt="" />
                                    <Link href={""} className="block text-[#295480] text-[19px] font-medium">
                                        YouTube
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

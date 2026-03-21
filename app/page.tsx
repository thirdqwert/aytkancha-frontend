import { Metadata } from "next";
import { INews } from "./_utils/types";
import { getDateString, getNewsAdmin } from "./_utils/utilis";
import HeadingLine from "./_components/ui/HeadingLine";
import ReelsSwiper from "./_components/ReelsSwiper";
import BigCard from "./_components/BigCard";
import HorizontalCard from "./_components/HorizontalCard";
import ImageCard from "./_components/ImageCard";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Link from "next/link";
import Image from "next/image";
import VidsList from "./_components/VidsList";
import Card from "./_components/Card";
import HorizontalLineCard from "./_components/HorizontalLineCard";

export const revalidate = 60;

export default async function Home() {
    const data: INews[] = await getNewsAdmin();

    const hot_news = data && data.slice(0, 11);
    const technology_news = data && data.filter((item) => item.category == "Texnologiya").slice(0, 4);
    const sport_news = data && data.filter((item) => item.category == "Sport").slice(0, 5);
    const culture_news = data && data.filter((item) => item.category == "Madaniyat").slice(0, 10);
    const country_news = data && data.filter((item) => item.category == "O'zbekistonda").slice(0, 4);
    const popular_news = data && data.sort((a, b) => b.views - a.views).slice(0, 5);

    const sport_card = (item: INews, i: number) => {
        return (
            <Link href={`/news/detail/${item.id}/`} key={item.id} className={i < 3 ? "block" : "hidden md:block"}>
                <article className="w-full flex flex-col gap-[7px] md:gap-[10px] 2xl:gap-[5px]">
                    <Image
                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                        width={0}
                        height={0}
                        className="w-full h-[175px] lg:h-[175px] lg:h-[230px] 2xl:h-[220px] object-cover"
                        src={item.preview}
                        alt={item.short_title}
                    />
                    <div className="flex flex-col md:gap-[15px] lg:gap-[10px]">
                        <h3 className="font-bold text-third text-[13] lg:text-[18px] short_title">{item.title}</h3>

                        <div className="flex flex-row justify-between pt-[10px] md:p-0">
                            <h2 className="text-[14px] lg:text-[16px] font-bold text-secondery">{item.category}</h2>
                            <time
                                dateTime={item.created_at.split("T")[0]}
                                className="text-[14px] lg:text-[16px] font-bold text-third"
                            >
                                {getDateString(item.created_at)}
                            </time>
                        </div>
                    </div>
                </article>
            </Link>
        );
    };

    const culture_card = (item: INews, i: number) => {
        return (
            <Link href={`/news/detail/${item.id}/`} key={item.id} className={i < 2 ? "block" : "hidden md:block"}>
                <article className="w-full h-full flex flex-col md:flex-row gap-[10px] md:gap-[20px]">
                    <Image
                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                        width={0}
                        height={0}
                        src={item.preview}
                        alt={item.short_title}
                        className="w-full h-[185px] md:h-[150px] lg:h-[160px] 2xl:h-[147px] w-[240px] lg:w-[290px] 2xl:w-[190px] object-cover"
                    />
                    <div className="flex flex-col gap-[10px] md:gap-[19px]">
                        <h3 className="text-[13px] md:text-[14px] lg:text-[25px] 2xl:text-[25px] text-third font-bold short_title">
                            {item.title}
                        </h3>
                        <p className="text-[12px] lg:text-[20px] font-medium text-fourth short_title leading-[167%]">
                            {item.desc}
                        </p>
                        <div className="flex flex-row justify-between mt-auto">
                            <h2 className="text-[13px] md:text-[14px] lg:text-[20px] font-bold text-secondery">
                                {item.category}
                            </h2>
                            <time
                                dateTime={item.created_at.split("T")[0]}
                                className="text-[13px] md:text-[14px] lg:text-[20px] font-bold text-third"
                            >
                                {getDateString(item.created_at)}
                            </time>
                        </div>
                    </div>
                </article>
            </Link>
        );
    };

    const country_ImageCard = (item: INews) => {
        return (
            <Link href={`/news/detail/${item.id}/`} key={item.id} className="w-full h-full">
                <article className="relative h-full w-full">
                    <Image
                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                        width={0}
                        height={0}
                        className="w-full min-h-[170px] md:h-[180px] lg:h-[276px] 2xl:h-[342px] object-cover"
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
                    <div className="absolute bottom-[10px] flex flex-col gap-[3px] md:gap-[15px] px-[10px] lg:px-[15px]">
                        <h3 className="text-white font-bold short_title text-[10px] lg:text-[15px] 2xl:text-[17px]">
                            {item.title}
                        </h3>
                        <div className="flex flex-row gap-[15px]">
                            <h2 className="font-bold text-white text-[10px] lg:text-[15px] 2xl:text-[16px]">
                                {item.category}
                            </h2>
                            <time
                                dateTime={item.created_at.split("T")[0]}
                                className="font-bold text-white text-[10px] lg:text-[15px] 2xl:text-[16px]"
                            >
                                {getDateString(item.created_at)}
                            </time>
                        </div>
                    </div>
                </article>
            </Link>
        );
    };

    const country_HorizontalCard = (item: INews) => {
        return (
            <Link href={`/news/detail/${item.id}/`} key={item.id}>
                <article className="w-full h-full flex flex-col md:flex-row gap-[10px] md:gap-[30px]">
                    <Image
                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                        width={0}
                        height={0}
                        src={item.preview}
                        alt={item.short_title}
                        className="min-h-[185px] md:h-[190px] lg:h-[230px] 2xl:h-[280px] w-full object-cover "
                    />
                    <div className="flex flex-col gap-[15px] w-full">
                        <h3 className="text-[13px] lg:text-[20px] 2xl:text-[25px] text-third font-bold short_title">
                            {item.title}
                        </h3>
                        <p className="text-[12px] md:text-[12px] lg:text-[18px] 2xl:text-[20px] font-medium text-fourth long_desc leading-[167%]">
                            {item.desc}
                        </p>
                        <div className="flex flex-row justify-between mt-auto">
                            <h2 className="text-[13px] lg:text-[20px] font-bold text-secondery">{item.category}</h2>
                            <time
                                dateTime={item.created_at.split("T")[0]}
                                className="text-[13px] lg:text-[20px] font-bold text-third"
                            >
                                {getDateString(item.created_at)}
                            </time>
                        </div>
                    </div>
                </article>
            </Link>
        );
    };

    return (
        <>
            <Header />
            <main className="pt-[30px] pb-[90px] 2xl:pb-[110px] min-h-screen">
                <section>
                    <div className="container">
                        <div className="flex flex-col 2xl:flex-row gap-[20px] 2xl:gap-[30px]">
                            {hot_news[0] && (
                                <div className="2xl:max-w-[980px] w-full min-h-[170px] md:h-[340px] lg:h-[426px] 2xl:h-[600px]">
                                    <ImageCard item={hot_news[0]} cardType="big" />
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row 2xl:flex-col gap-[20px] 2xl:max-w-[740px] w-full">
                                {hot_news[1] && (
                                    <div className="min-h-[170px] md:h-[180px] 2xl:h-[290px] w-full">
                                        <ImageCard item={hot_news[1]} cardType="long" />
                                    </div>
                                )}

                                {hot_news[2] && (
                                    <div className="min-h-[170px] md:h-[180px] 2xl:h-[290px] w-full">
                                        <ImageCard item={hot_news[2]} cardType="long" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link
                            href={"/news/"}
                            className="block md:hidden text-[12px] text-white font-medium bg-[#1e293b] leading-normal rounded-[20px] py-[7px] px-[12px] w-max mx-auto mt-[20px]"
                        >
                            Ko&apos;proq ko&apos;rsatish
                        </Link>
                        <div className="hidden md:grid md:grid-cols-2 2xl:grid-cols-[repeat(auto-fill,minmax(410px,1fr))] gap-[20px] 2xl:gap-[30px] md:auto-rows-[180px] lg:auto-rows-[253px] 2xl:auto-rows-[263px] pt-[30px]">
                            {hot_news[3] && (
                                <div className="col-span-2 row-span-2">
                                    <ImageCard item={hot_news[3]} cardType="big" />
                                </div>
                            )}

                            {hot_news[4] && (
                                <div className="col-span-1 row-span-1">
                                    <ImageCard item={hot_news[4]} cardType="small" />
                                </div>
                            )}

                            {hot_news[5] && (
                                <div className="col-span-1 row-span-1">
                                    <ImageCard item={hot_news[5]} cardType="small" />
                                </div>
                            )}

                            {hot_news[6] && (
                                <div className="col-span-1 row-span-1">
                                    <ImageCard item={hot_news[6]} cardType="small" />
                                </div>
                            )}

                            {hot_news[7] && (
                                <div className="col-span-1 row-span-1">
                                    <ImageCard item={hot_news[7]} cardType="small" />
                                </div>
                            )}

                            {hot_news[8] && (
                                <div className="col-span-1 row-span-1">
                                    <ImageCard item={hot_news[8]} cardType="small" />
                                </div>
                            )}

                            {hot_news[9] && (
                                <div className="col-span-1 row-span-1">
                                    <ImageCard item={hot_news[9]} cardType="small" />
                                </div>
                            )}

                            {hot_news[10] && (
                                <div className="col-span-2 md:row-span-[2] lg:row-span-1">
                                    <Link href={`/news/detail/${hot_news[10].id}/`}>
                                        <article className="relative h-full w-full">
                                            <Image
                                                unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                                                width={0}
                                                height={0}
                                                className="w-full h-full object-cover"
                                                src={hot_news[10].preview}
                                                alt={hot_news[10].short_title}
                                            />
                                            <div
                                                className="absolute inset-0 h-full w-full"
                                                style={{
                                                    background:
                                                        "linear-gradient(180deg,rgba(255, 255, 255, 0) 44%, rgba(0, 0, 0, 0.44) 57%, rgba(0, 0, 0, 0.75) 78%)",
                                                }}
                                            />
                                            <div className="absolute bottom-[10px] flex flex-col gap-[15px] md:px-[10px] lg:px-[30px] 2xl:px-[10px]">
                                                <h3 className="text-white font-bold short_title md:text-[17px] lg:text-[15px] 2xl:text-[20px]">
                                                    {hot_news[10].title}
                                                </h3>
                                                <div className="flex flex-row gap-[15px]">
                                                    <h2 className="font-bold text-white md:text-[10px] lg:text-[15px] 2xl:text-[18px]">
                                                        {hot_news[10].category}
                                                    </h2>
                                                    <time
                                                        dateTime={hot_news[10].created_at.split("T")[0]}
                                                        className="font-bold text-white md:text-[10px] lg:text-[15px] 2xl:text-[18px]"
                                                    >
                                                        {getDateString(hot_news[10].created_at)}
                                                    </time>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="pt-[60px] lg:pt-[80px] 2xl:pt-[45px]">
                    <div className="container">
                        <div className="flex flex-col 2xl:flex-row gap-[30px]">
                            <div className="hidden md:block w-full">
                                <HeadingLine title="Texnologiya" link="texnologiya" />
                                {technology_news[0] && (
                                    <div className="pt-[30px]">
                                        <BigCard item={technology_news[0]} />
                                    </div>
                                )}
                                <div className="pt-[30px] flex flex-col md:gap-[30px] 2xl:gap-[60px]">
                                    {technology_news.slice(1, 4).map((item) => (
                                        <HorizontalCard item={item} key={item.id} />
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:pt-[70px] 2xl:pt-0">
                                <HeadingLine title="Sport" link="sport" />
                                {sport_news[0] && (
                                    <div className="pt-[20px] md:pt-[30px]">
                                        <BigCard item={sport_news[0]} />
                                    </div>
                                )}
                                <div className="pt-[30px] grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                                    {sport_news.slice(1, 5).map((item, i) => sport_card(item, i))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-[60px] md:pt-[70px] 2xl:pt-[50px]">
                    <div className="container">
                        <HeadingLine title="Video" link="" />
                        <div className="pt-[20px] md:pt-[30px] lg:pt-[40px]">
                            <VidsList />
                        </div>
                    </div>
                </section>
                <section className="pt-[60px] md:pt-[50px]">
                    <div className="container">
                        <HeadingLine title="Madaniyat" link="madaniyat" />
                        <div className="pt-[20px] md:pt-[30px] 2xl:pt-[40px] flex flex-col 2xl:flex-row gap-[20px] md:gap-[30px]">
                            {culture_news[0] && (
                                <div className="w-full">
                                    <Link href={`/news/detail/${culture_news[0].id}/`}>
                                        <article className="w-full h-full flex flex-col gap-[10px] md:gap-[20px]">
                                            <Image
                                                unoptimized={process.env.NEXT_PUBLIC_DEV === "dev" ? true : false}
                                                width={0}
                                                height={0}
                                                src={culture_news[0].preview}
                                                alt={culture_news[0].short_title}
                                                className="w-full md:h-[330px] lg:h-[440px] 2xl:h-[527px] object-cover"
                                            />
                                            <h3 className="text-third font-bold text-[13px] md:text-[20px] lg:text-[25px] 2xl:text-[30px] short_title">
                                                {culture_news[0].title}
                                            </h3>
                                            <p className="text-fourth font-medium text-[12px] md:text-[18px] lg:text-[23px] 2xl:text-[28px] long_desc">
                                                {culture_news[0].desc}
                                            </p>
                                            <div className="flex flex-row justify-between pt-[15px] md:pt-[23px]">
                                                <h2 className="text-[13px] md:text-[20px] 2xl:text-[30px] font-bold text-secondery">
                                                    {culture_news[0].category}
                                                </h2>
                                                <time
                                                    dateTime={culture_news[0].created_at.split("T")[0]}
                                                    className="text-[13px] md:text-[20px] 2xl:text-[30px] font-bold text-third"
                                                >
                                                    {getDateString(culture_news[0].created_at)}
                                                </time>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                            )}
                            <div className="w-full flex flex-col gap-[20px] md:gap-[30px]">
                                {culture_news.slice(1, 6).map((item, i) => culture_card(item, i))}
                            </div>
                        </div>
                        <div className="pt-[30px] hidden md:block">
                            <div className="grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(410px,1fr))] grid-rows-[auto] gap-[30px]">
                                {culture_news.slice(6, 11) &&
                                    culture_news.slice(6, 11).map((item) => <Card key={item.id} item={item} />)}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-[60px] md:pt-[70px] 2xl:pt-[55px]">
                    <div className="container">
                        <HeadingLine title="Reels" link="" />
                        <div className="pt-[30px]">
                            <ReelsSwiper />
                        </div>
                    </div>
                </section>
                <section className="pt-[70px] overflow-hidden">
                    <div className="container">
                        <div className="flex flex-col 7xl:flex-row gap-[30px]">
                            <div className="7xl:max-w-[1069px] w-full">
                                {/* <Link
                                    href={`/news/ozbekistonda`}
                                    className="flex flex-row items-center justify-between border-b border-b-primery"
                                >
                                    <h2 className="font-medium text-[30px] bg-primery text-white py-[20px] px-[25px] rounded-tl-[15px] rounded-tr-[15px]">
                                        O&apos;zbekistonda
                                    </h2>
                                </Link> */}
                                <HeadingLine title="O'zbekistonda" link="ozbekistonda" />
                                <div className="flex flex-col md:flex-row gap-[30px] pt-[20px] md:pt-[30px]">
                                    {country_news.slice(0, 2).map((item) => country_ImageCard(item))}
                                </div>
                                <div className="flex flex-col gap-[20px] pt-[30px]">
                                    {country_news.slice(2, 5).map((item) => country_HorizontalCard(item))}
                                </div>
                            </div>
                            <div className="7xl:max-w-[630px] w-full">
                                <h2 className="bg-[#1e293b] p-[15px] md:p-[20px] relative">
                                    <span className="md:text-[20px] lg:text-[26px] font-bold text-white z-3 relative">Ommabop yangiliklar</span>
                                    <div className="block 7xl:hidden absolute h-full inset-0 bg-[#1e293b] w-[2000px] left-[-100px]"/>
                                </h2>
                                <div className="pt-[30px] flex flex-col gap-[30px] 2xl:gap-[60px]">
                                    {popular_news.map((item) => (
                                        <HorizontalLineCard item={item} key={item.id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

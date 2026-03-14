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
import CardList from "./_components/CardList";

export const revalidate = 60;

export default async function Home() {
    const data: INews[] = await getNewsAdmin();

    const hot_news = data && data.slice(0, 11);
    const news = data && data.slice(0, 8);
    const technology_news = data && data.filter((item) => item.category == "Texnologiya").slice(0, 4);
    const sport_news = data && data.filter((item) => item.category == "Sport").slice(0, 5);
    const culture_news = data && data.filter((item) => item.category == "Madaniyat").slice(0, 10);

    const sport_card = (item: INews) => {
        return (
            <Link href={`/news/detail/${item.id}/`} key={item.id}>
                <article className="w-full flex flex-col gap-[5px]">
                    <Image
                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                        width={0}
                        height={0}
                        className="w-full h-[220px] object-cover"
                        src={item.preview}
                        alt={item.short_title}
                    />
                    <div className="flex flex-col gap-[10px]">
                        <h3 className="font-bold text-third text-[18px] short_title">{item.title}</h3>
                        <div>
                            <div className="flex flex-row justify-between">
                                <h2 className="text-[16px] font-bold text-secondery">{item.category}</h2>
                                <time
                                    dateTime={item.created_at.split("T")[0]}
                                    className="text-[16px] font-bold text-third"
                                >
                                    {getDateString(item.created_at)}
                                </time>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    };
    const culture_card = (item: INews) => {
        return (
            <Link href={`/news/detail/${item.id}/`} key={item.id}>
                <article className="w-full h-full flex flex-row gap-[20px]">
                    <Image
                        unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                        width={0}
                        height={0}
                        src={item.preview}
                        alt={item.short_title}
                        className="h-[147px] w-[190px] object-cover "
                    />
                    <div className="flex flex-col justify-between gap-[19px]">
                        <h3 className="text-[25px] text-third font-bold short_title">{item.title}</h3>
                        <p className="text-[20px] font-medium text-fourth short_title">{item.desc}</p>
                        <div className="flex flex-row justify-between">
                            <h2 className="text-[20px] font-bold text-secondery">{item.category}</h2>
                            <time dateTime={item.created_at.split("T")[0]} className="text-[20px] font-bold text-third">
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
            <main className="pt-[30px] pb-[110px] min-h-screen">
                <section>
                    <div className="container">
                        <div className="flex flex-row gap-[30px]">
                            {hot_news[0] && (
                                <div className="max-w-[980px] w-full h-[600px]">
                                    <ImageCard item={hot_news[0]} cardType="big" />
                                </div>
                            )}

                            <div className="flex flex-col gap-[20px] max-w-[740px] w-full">
                                {hot_news[1] && (
                                    <div className="h-[290px]">
                                        <ImageCard item={hot_news[1]} cardType="long" />
                                    </div>
                                )}

                                {hot_news[2] && (
                                    <div className="h-[290px]">
                                        <ImageCard item={hot_news[2]} cardType="long" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(410px,1fr))] gap-[30px] auto-rows-[263px] pt-[30px]">
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
                                <div className="col-span-2 row-span-1">
                                    <ImageCard item={hot_news[10]} cardType="long" />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="pt-[45px]">
                    <div className="container">
                        <div className="flex flex-row gap-[30px]">
                            <div className="w-full">
                                <HeadingLine title="Texnologiya" link="texnologiya" />
                                {technology_news[0] && (
                                    <div className="pt-[30px]">
                                        <BigCard item={technology_news[0]} />
                                    </div>
                                )}
                                <div className="pt-[30px] flex flex-col gap-[60px]">
                                    {technology_news.slice(1, 4).map((item) => (
                                        <HorizontalCard item={item} key={item.id} />
                                    ))}
                                </div>
                            </div>
                            <div className="w-full">
                                <HeadingLine title="Sport" link="sport" />
                                {sport_news[0] && (
                                    <div className="pt-[30px]">
                                        <BigCard item={sport_news[0]} />
                                    </div>
                                )}
                                <div className="pt-[30px] grid grid-cols-[repeat(auto-fill,minmax(410px,1fr))] gap-[30px]">
                                    {sport_news.slice(1, 5).map((item) => sport_card(item))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-[50px]">
                    <div className="container">
                        <HeadingLine title="Madaniyat" link="madaniyat" />
                        <div className="pt-[40px]">
                            <VidsList />
                        </div>
                    </div>
                </section>
                <section className="pt-[50px]">
                    <div className="container">
                        <HeadingLine title="Video" link="" />
                        <div className="pt-[40px] flex flex-row gap-[30px]">
                            {culture_news[0] && (
                                <div className="w-full">
                                    <Link href={`/news/detail/${culture_news[0].id}/`}>
                                        <article className="w-full h-full flex flex-col gap-[20px]">
                                            <Image
                                                unoptimized={process.env.NEXT_PUBLIC_DEV === "dev" ? true : false}
                                                width={0}
                                                height={0}
                                                src={culture_news[0].preview}
                                                alt={culture_news[0].short_title}
                                                className="w-full h-[527px] object-cover"
                                            />
                                            <h3 className="text-third font-bold text-[30px] short_title">
                                                {culture_news[0].title}
                                            </h3>
                                            <p className="text-fourth font-medium text-[28px] long_desc">
                                                {culture_news[0].desc}
                                            </p>
                                            <div className="flex flex-row justify-between pt-[23px]">
                                                <h2 className="text-[30px] font-bold text-secondery">
                                                    {culture_news[0].category}
                                                </h2>
                                                <time
                                                    dateTime={culture_news[0].created_at.split("T")[0]}
                                                    className="text-[30px] font-bold text-third"
                                                >
                                                    {getDateString(culture_news[0].created_at)}
                                                </time>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                            )}
                            <div className="w-full flex flex-col gap-[30px]">
                                {culture_news.slice(1, 6).map((item) => culture_card(item))}
                            </div>
                        </div>
                        <div className="pt-[30px]">
                            <CardList list={culture_news.slice(6, 11)} />
                        </div>
                    </div>
                </section>
                <section className="pt-[50px]">
                    <div className="container">
                        <HeadingLine title="Reels" link="" />
                        <div className="pt-[30px]">
                            <ReelsSwiper />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

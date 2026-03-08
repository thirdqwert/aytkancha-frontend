import { Metadata } from "next";
import { INews } from "./utils/types";
import { getDateString, getNewsAdmin } from "./utils/utilis";
import Link from "next/link";
import CardList from "./components/CardList";
import HeadingLine from "./components/ui/HeadingLine";
import Card from "./components/Card";
import Image from "next/image";
import SwiperList from "./components/SwiperList";
import ReelsSwiper from "./components/ReelsSwiper";
import VidsSwiper from "./components/VidsSwiper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BigCard from "./components/BigCard";
import HorizontalCard from "./components/HorizontalCard";
import ImageCard from "./components/ImageCard";

export const revalidate = 180;

export default async function Home() {
    const data: INews[] = await getNewsAdmin(process.env.TOKEN);

    const hot_news = data && data.slice(0, 6);
    const news = data && data.slice(0, 8);
    const culture_news = data && data.filter((item) => item.category == "Культура").slice(0, 8);
    const sport_news = data && data.filter((item) => item.category == "Спорт").slice(0, 8);
    const popular_news = data && data.sort((a, b) => b.views - a.views).slice(0, 3);

    return (
        <>
            <Header />
            <main className="py-[80px]">
                <section>
                    <div className="container">
                        <div className="flex flex-row pb-[20px] gap-[80px] border-b-[9px] border-b-primery rounded-[10px]">
                            <div className="max-w-[987px] w-full">{hot_news[0] && <BigCard item={hot_news[0]} />}</div>
                            <div className="flex flex-col gap-[30px] max-w-[630px] w-full">
                                {hot_news.slice(1, 6).map((news) => (
                                    <div key={news.id}>
                                        <HorizontalCard item={news} isDesc={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-[115px]">
                    <div className="container">
                        <HeadingLine title="yangiliklar" link="yangiliklar" />
                        <div className="pt-[30px]">{news && <CardList list={news} />}</div>
                    </div>
                </section>
                <section className="pt-[115px]">
                    <div className="container">
                        <HeadingLine title="sport" link="sport" />
                        <div className="flex flex-col 8xl:flex-row gap-[50px] 8xl:gap-[30px] pt-[30px]">
                            <div className="flex flex-row 8xl:flex-col 8xl:w-1/2 gap-[20px]">
                                {sport_news.slice(0, 2).map((news) => (
                                    <BigCard item={news} key={news.id} />
                                ))}
                            </div>
                            <div className="8xl:w-1/2">
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(410px,1fr))] grid-rows-[auto] gap-y-[76px] gap-x-[30px]">
                                    {data.slice(2, 8).map((item) => (
                                        <Card item={item} key={item.id}/>
                                    ))}
                                </div>
                                {/* <CardList list={sport_news.slice(2, 8)} /> */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-[80px]">
                    <div className="container">
                        <HeadingLine title="Madaniyat" link="madaniyat" />
                        <div className="pt-[30px] flex flex-col gap-[30px]">
                            <div className="flex flex-row gap-[30px]">
                                {culture_news.slice(0, 2).map((news) => (
                                    <ImageCard item={news} key={news.id} />
                                ))}
                            </div>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(610px,1fr))] grid-rows-[auto] gap-[40px] xl:gap-[30px]">
                                {data.slice(2, 8).map((news) => (
                                    <HorizontalCard key={news.id} item={news} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-[115px]">
                    <div className="container">
                        <HeadingLine title="yangiliklar" link="yangiliklar" />
                        <div className="pt-[30px]">{news && <CardList list={news} />}</div>
                    </div>
                </section>
            </main>
            {/* <Footer /> */}
        </>
    );
}

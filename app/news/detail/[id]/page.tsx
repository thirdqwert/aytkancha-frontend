import { getDateString, getNews, getNewsDetail } from "@/app/_utils/utilis";
import Image from "next/image";
import Link from "next/link";
import DetailContent from "../_components/DetailContent";
import { Metadata } from "next";
import { INews } from "@/app/_utils/types";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import HorizontalLineCard from "@/app/_components/HorizontalLineCard";

interface IProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { id } = await params;
    const news: INews = await getNewsDetail(id, { next: { revalidate: 60 } });

    if ("statusText" in news) {
        return {
            title: "Yangilik topilmadi",
        };
    }

    return {
        title: news.short_title,

        description: news.desc,

        openGraph: {
            title: news.title,
            description: news.desc,
            url: `/news/detail/${id}`,
            siteName: "Aytkancha",
            images: [
                {
                    url: news.preview,
                    width: 1200,
                    height: 630,
                    alt: news.short_title,
                },
            ],
            locale: "uz_UZ",
            type: "article",
            publishedTime: news.created_at,
            section: news.category,
        },

        twitter: {
            card: "summary_large_image",
            title: news.title,
            description: news.desc,
            images: [news.preview],
        },

        alternates: {
            canonical: `/news/detail/${id}`,
        },
    };
}

export const revalidate = 60;

export default async function NewsDetail({ params }: IProps) {
    const { id } = await params;

    const [newsObject, news] = await Promise.all([
        getNews(1, "", "", { next: { revalidate: 60 } }, undefined),
        getNewsDetail(id, { next: { revalidate: 60 } }),
    ]);
    const popular_news_list: INews[] = newsObject.results.slice(0, 5);
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: news.title,
        description: news.desc,
        image: news.main_image,
        datePublished: news.created_at,
        dateModified: news.created_at,
        author: {
            "@type": "Organization",
            name: "Renews",
            url: process.env.NEXT_PUBLIC_SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: "Renews",
            url: process.env.NEXT_PUBLIC_SITE_URL,
            logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://renews.uz/news/detail/${id}`,
        },
    };

    if ("statusText" in news)
        return (
            <>
                <div>Данные не найдены</div>
            </>
        );

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <Header />
            <main className="py-[30px] overflow-hidden">
                <div className="container">
                    <div className="flex flex-col 7xl:flex-row gap-[30px]">
                        <article className="pb-[70px] md:pb-[100px] xl:pb-[200px] w-full 7xl:max-w-[1070px]">
                            <Image
                                unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                                width={0}
                                height={0}
                                src={news.main_image}
                                alt={news.short_title}
                                className="w-full min-h-[200px] max-h-[300px] md:max-h-none md:h-[300px] lg:h-[500px] 2xl:h-[560px] h-full rounded-[10px] object-cover mb-[15px] lg:mb-[20px]"
                            />
                            <div className="flex flex-row gap-[20px] items-end">
                                <Link href={`/news/${news.categery_slug}`}>
                                    <span className="text-[13px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] text-secondery font-bold">
                                        {news.category}
                                    </span>
                                </Link>
                                <time
                                    dateTime={news.created_at.split("T")[0]}
                                    className="text-[13px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] text-third font-bold"
                                >
                                    {getDateString(news.created_at)}
                                </time>
                            </div>
                            <h1 className="text-[15px] md:text-[20px] lg:text-[25px] 2xl:text-[32px] text-third font-bold mt-[15px] mb-[20px] 2xl:mb-[30px]">
                                {news.title}
                            </h1>
                            <p className="text-[15px] md:text-[20px] 2xl:text-[30px] text-fourth font-medium leading-[200%]">
                                {news.desc}
                            </p>
                            <br />
                            <DetailContent content={news.content} />
                        </article>
                        <div className="7xl:max-w-[630px] w-full">
                            <h2 className="bg-[#1e293b] p-[15px] md:p-[20px] relative">
                                <span className="md:text-[20px] lg:text-[26px] font-bold text-white z-3 relative">
                                    yangiliklar
                                </span>
                                <div className="block 7xl:hidden absolute h-full inset-0 bg-[#1e293b] w-[2000px] left-[-100px]" />
                            </h2>
                            <div className="pt-[30px] flex flex-col gap-[30px] 2xl:gap-[60px]">
                                {popular_news_list &&
                                    popular_news_list.map((item) => <HorizontalLineCard item={item} key={item.id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

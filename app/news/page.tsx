import { getNews } from "../_utils/utilis";
import { INewsObject } from "../_utils/types";
import CardList from "../_components/CardList";
import InfiniteScroll from "../_components/InfiniteScroll";
import { Metadata } from "next";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

export const metadata: Metadata = {
    title: "Все новости Узбекистана",

    description:
        "Читайте все последние новости Узбекистана: политика, спорт, культура и экономика. Обновляется каждый день.",

    openGraph: {
        title: "Все новости — Renews",
        description: "Читайте все последние новости Узбекистана.",
        url: "/news",
        siteName: "Renews",
        images: [
            {
                url: "/images/og-main.jpg",
                width: 1200,
                height: 630,
                alt: "Все новости — Renews",
            },
        ],
        locale: "ru_RU",
        type: "website",
    },

    alternates: {
        canonical: "/news",
    },
};

export const revalidate = 60;

export default async function News() {
    const news: INewsObject = await getNews(1, "", "", { next: { revalidate: 60 } }, undefined);

    if (news.results.length == 0)
        return (
            <>
                <Header />
                <main className="py-[110px] min-h-screen">
                </main>
                <Footer />
            </>
        );

    return (
        <>
            <Header />
            <main className="py-[15px] min-h-screen">
                <div className="container">
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll params={{}} />
                </div>
            </main>
            <Footer />
        </>
    );
}

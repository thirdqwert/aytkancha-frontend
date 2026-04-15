import { getNews } from "@/app/_utils/utilis";
import { INewsObject } from "@/app/_utils/types";
import CardList from "@/app/_components/CardList";
import InfiniteScroll from "@/app/_components/InfiniteScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "O'zbekistonning barcha yangiliklari",

    description:
        "O'zbekistonning so'nggi yangiliklarini o'qing: siyosat, sport, madaniyat va iqtisodiyot. Har kuni yangilanib turadi.",

    openGraph: {
        title: "Barcha yangiliklar — Aytkancha",
        description: "O'zbekistonning so'nggi yangiliklarini o'qing.",
        url: "/news",
        siteName: "Aytkancha",
        images: [
            {
                url: "/images/og-main.jpg",
                width: 1200,
                height: 630,
                alt: "Barcha yangiliklar — Aytkancha",
            },
        ],
        locale: "uz_UZ",
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
                <main className="py-[110px] min-h-screen"></main>
            </>
        );

    return (
        <>
            <main className="py-[15px] min-h-screen">
                <div className="container">
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll params={{}} />
                </div>
            </main>
        </>
    );
}

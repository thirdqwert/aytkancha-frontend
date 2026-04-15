import { categories, getNews } from "@/app/_utils/utilis";
import CardList from "@/app/_components/CardList";
import CatSub from "@/app/_components/CatSub";
import InfiniteScroll from "@/app/_components/InfiniteScroll";
import { Metadata } from "next";

interface IProps {
    params: {
        category: string;
    };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { category } = await params;
    const currentCategory = categories.find((item) => item.slug == category);
    const categoryName = currentCategory?.title;
    return {
        title: `${categoryName} — O'zbekiston yangiliklari`,
        description: `"${categoryName}" bo'limining so'nggi yangiliklarini Aytkancha'da o'qing. O'zbekiston va dunyo dolzarb voqealari.`,

        openGraph: {
            title: `${categoryName} — Aytkancha`,
            description: `"${categoryName}" bo'limining so'nggi yangiliklari.`,
            url: `/news/${currentCategory?.slug}`,
            siteName: "Aytkancha",
            images: [{ url: "/images/og-main.jpg" }],
            locale: "uz_UZ",
            type: "website",
        },

        alternates: {
            canonical: `/news/${currentCategory?.slug}`,
        },
    };
}

export const revalidate = 60;

export default async function NewsCategory({ params }: IProps) {
    const { category } = await params;
    const news = await getNews(1, category, "", { next: { revalidate: 60 } }, undefined);

    if (news.results.length == 0)
        return (
            <>
                <CatSub params={{ categoryBy: category }} />
                <main className="py-[35px] min-h-screen">
                    <div className="container"></div>
                </main>
            </>
        );

    return (
        <>
            <CatSub params={{ categoryBy: category }} />
            <main className="py-[35px] min-h-screen">
                <div className="container">
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll params={{ category: category }} />
                </div>
            </main>
        </>
    );
}

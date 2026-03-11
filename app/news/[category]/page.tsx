import { getCategories, getNews } from "@/app/_utils/utilis";
import CardList from "@/app/_components/CardList";
import CatSub from "@/app/_components/CatSub";
import InfiniteScroll from "@/app/_components/InfiniteScroll";
import { Metadata } from "next";
import { ICategory } from "@/app/_utils/types";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

interface IProps {
    params: {
        category: string;
    };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { category } = await params;
    const categories: ICategory[] = await getCategories({ next: { revalidate: 180 } });
    const currentCategory = categories.find((item) => item.slug == category);
    const categoryName = currentCategory?.title;
    return {
        title: `${categoryName} — Новости Узбекистана`,
        description: `Читайте последние новости раздела "${categoryName}" на Renews. Актуальные события Узбекистана и мира.`,

        openGraph: {
            title: `${categoryName} — Renews`,
            description: `Последние новости раздела "${categoryName}".`,
            url: `/news/${currentCategory?.slug}`,
            siteName: "Renews",
            images: [{ url: "/images/og-main.jpg" }],
            locale: "ru_RU",
            type: "website",
        },

        alternates: {
            canonical: `/news/${currentCategory?.slug}`,
        },
    };
}

export const revalidate = 180;

export default async function NewsCategory({ params }: IProps) {
    const { category } = await params;
    const [news, categories] = await Promise.all([
        getNews(1, category, "", { next: { revalidate: 180 } }, undefined),
        getCategories({ next: { revalidate: 180 } }),
    ]);

    if (news.results.length == 0)
        return (
            <>
                <Header />
                <CatSub categories={categories} params={{ categoryBy: category }} />
                <main className="py-[110px] min-h-screen">
                    <div className="container">
                        <div>Данные не найдены</div>
                    </div>
                </main>
                <Footer />
            </>
        );

    return (
        <>
            <Header />
            <CatSub categories={categories} params={{ categoryBy: category }} />
            <main className="py-[110px] min-h-screen">
                <div className="container">
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll params={{ category: category }} />
                </div>
            </main>
            <Footer />
        </>
    );
}

import { categories, getNews } from "@/app/_utils/utilis";
import CardList from "@/app/_components/CardList";
import CatSub from "@/app/_components/CatSub";
import InfiniteScroll from "@/app/_components/InfiniteScroll";
import { Metadata } from "next";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

interface IProps {
    params: {
        category: string;
        subcategory: string;
    };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { category, subcategory } = await params;

    const currentCategory = categories.find((item) => item.slug == category);
    const currentSubcategory =
        currentCategory && currentCategory.subcategories.find((item) => item.slug == subcategory);
    const subcategoryName = currentSubcategory?.title;
    return {
        title: `${subcategoryName} — O'zbekiston yangiliklari`,
        description: `"${subcategoryName}" bo'limining so'nggi yangiliklarini Aytkancha'da o'qing. O'zbekiston va dunyo dolzarb voqealari.`,

        openGraph: {
            title: `${subcategoryName} — Aytkancha`,
            description: `"${subcategoryName}" bo'limining so'nggi yangiliklari.`,
            url: `/news/${currentSubcategory?.slug}`,
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

export default async function NewsSubcategory({ params }: IProps) {
    const { category, subcategory } = await params;
    const news = await getNews(1, category, subcategory, { next: { revalidate: 60 } }, undefined);

    if (news.results.length == 0)
        return (
            <>
                <Header />
                <CatSub params={{ categoryBy: category, subcategoryBy: subcategory }} />
                <main className="py-[35px] min-h-screen">
                    <div className="container"></div>
                </main>
                <Footer />
            </>
        );
    return (
        <>
            <Header />
            <CatSub params={{ categoryBy: category, subcategoryBy: subcategory }} />
            <main className="py-[35px] min-h-screen">
                <div className="container">
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll
                        params={{
                            category: category,
                            subcategory: subcategory,
                        }}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}

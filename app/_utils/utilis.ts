import { ErrorRes, ICategory, INews, INewsObject, IReelsObject, IToken, IVidsObject } from "./types";
// // добавть обработчкие ошибок
//   if (!res.ok) {
//     throw new Error("Failed to fetch news")
//   }
export const getAdmin = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: process.env.ADMIN_LOGIN,
                password: process.env.ADMIN_PASSWORD,
            }),
        });
        const data: IToken = await res.json();
        return data.access;
    } catch (error) {
        throw error;
    }
};

export const getCategories = async (fetchParams: any | undefined): Promise<ICategory[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/`, fetchParams);
        const categories = await res.json();
        return categories;
    } catch (error) {
        throw error;
    }
};

export const getNews = async (
    pageCount: number | undefined = 1,
    categoryBy: string | undefined,
    subcategoryBy: string | undefined,
    fetchParams: any | undefined,
    searchBy: string | undefined,
): Promise<INewsObject | any> => {
    try {
        const params = new URLSearchParams();
        if (categoryBy) params.append("categoryBy", categoryBy);
        if (categoryBy) params.append("categoryBy", categoryBy);
        if (subcategoryBy) params.append("subcategoryBy", subcategoryBy);
        if (searchBy) params.append("searchBy", searchBy);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/news/?page=${pageCount}&${params.toString()}`,
            fetchParams,
        );

        if (!res.ok) {
            return res;
        }

        const news = await res.json();

        return news;
    } catch (error) {
        throw error;
    }
};

export const getNewsDetail = async (id: string, fetchParams: any | undefined): Promise<INews | any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}/`, fetchParams);

        if (!res.ok) {
            return res;
        }
        const news = await res.json();

        return news;
    } catch (error) {
        throw error;
    }
};

// export const getArticles = async (pageCount: number = 1) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles?page=${pageCount}`)
//     const articles = await res.json()
//     return articles
// }

export const getNewsAdmin = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TOKEN}`,
            },
        });

        if (!res.ok) {
            return res;
        }

        const news = await res.json();

        return news;
    } catch (error) {
        throw error;
    }
};

// export const getArticlesAdmin = async (access: string) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles/`,
//         {
//             method: "get",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${access}`
//             }
//         }
//     )
//     const articles = await res.json()
//     return articles
// }

export const getDateString = (created_at: string) => {
    const months: any = {
        "01": "yanvar",
        "02": "fevral",
        "03": "mart",
        "04": "aprel",
        "05": "may",
        "06": "iyun",
        "07": "iyul",
        "08": "avgust",
        "09": "sentabr",
        "10": "oktabr",
        "11": "noyabr",
        "12": "dekabr",
    };
    const YMD = created_at.split("T")[0];
    const time = created_at.split("T")[1];
    const date = `${YMD.split("-")[2]} ${months[YMD.split("-")[1]]} ${time.split(":").slice(0, 2).join(":")}`;
    return date;
};

export const getReels = async (fetchParams: any | undefined): Promise<IReelsObject> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reels/`, fetchParams);
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getVids = async (fetchParams: any | undefined): Promise<IVidsObject> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/youtubevids/`, fetchParams);
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const categories = [
    {
        id: 24,
        title: "Dunyoda",
        slug: "dunyoda",
        subcategories: [
            {
                id: 34,
                title: "Geosiyosat",
                category: 24,
                slug: "geosiyosat",
            },
            {
                id: 35,
                title: "Mojarolar va urushlar",
                category: 24,
                slug: "mojarolar-va-urushlar",
            },
        ],
    },
    {
        id: 25,
        title: "O'zbekistonda",
        slug: "ozbekistonda",
        subcategories: [
            {
                id: 36,
                title: "Iqtisodiyot va moliya",
                category: 25,
                slug: "iqtisodiyot-va-moliya",
            },
            {
                id: 37,
                title: "Jamiyat",
                category: 25,
                slug: "jamiyat",
            },
        ],
    },
    {
        id: 26,
        title: "Voqealar",
        slug: "voqealar",
        subcategories: [
            {
                id: 38,
                title: "Jinoyat yilnomalari",
                category: 26,
                slug: "jinoyat-yilnomalari",
            },
            {
                id: 39,
                title: "Yong'inlar va baxtsiz hodisalar",
                category: 26,
                slug: "yonginlar-va-baxtsiz-hodisalar",
            },
        ],
    },
    {
        id: 27,
        title: "Sport",
        slug: "sport",
        subcategories: [
            {
                id: 40,
                title: "Futbol",
                category: 27,
                slug: "futbol",
            },
            {
                id: 41,
                title: "Olimpiya sport turlari",
                category: 27,
                slug: "olimpiya-sport-turlari",
            },
        ],
    },
    {
        id: 28,
        title: "Iqtisodiyot",
        slug: "iqtisodiyot",
        subcategories: [
            {
                id: 42,
                title: "Biznes",
                category: 28,
                slug: "biznes",
            },
            {
                id: 43,
                title: "Kichik biznes",
                category: 28,
                slug: "kichik-biznes",
            },
        ],
    },
    {
        id: 29,
        title: "Madaniyat",
        slug: "madaniyat",
        subcategories: [
            {
                id: 44,
                title: "Sayohatlar",
                category: 29,
                slug: "sayohatlar",
            },
            {
                id: 45,
                title: "Sharhlar",
                category: 29,
                slug: "sharhlar",
            },
        ],
    },
    {
        id: 30,
        title: "Texnologiya",
        slug: "texnologiya",
        subcategories: [
            {
                id: 46,
                title: "Texnologiyalar",
                category: 30,
                slug: "texnologiyalar",
            },
            {
                id: 47,
                title: "IT va Internet",
                category: 30,
                slug: "it-va-internet",
            },
        ],
    },
];

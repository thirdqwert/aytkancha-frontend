import { getNews } from "../_utils/utilis";
import { INewsObject } from "../_utils/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function GET() {
    try {
        const news: INewsObject = await getNews(1, undefined, undefined, undefined, undefined);

        const urls = news.results
            .map(
                (item) => `
                <url>
                    <loc>${BASE_URL}/news/detail/${item.id}</loc>
                    <lastmod>${new Date(item.created_at).toISOString()}</lastmod>
                    <image:image>
                        <image:loc>${item.preview}</image:loc>
                        <image:title>${item.short_title}</image:title>
                    </image:image>
                    <news:news>
                        <news:publication>
                            <news:name>${item.short_title}</news:name>
                            <news:language>uz</news:language>
                        </news:publication>
                        <news:publication_date>${new Date(item.created_at).toISOString()}</news:publication_date>
                        <news:title>${item.short_title}</news:title>
                    </news:news>                    
                    <changefreq>monthly</changefreq>
                    <priority>0.8</priority>
                </url>
            `,
            )
            .join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${urls}
</urlset>`;

        return new Response(xml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error("News sitemap: ошибка", error);
        return new Response("<urlset></urlset>", {
            headers: { "Content-Type": "application/xml" },
        });
    }
}

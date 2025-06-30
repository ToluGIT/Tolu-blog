import type { NavigationLink, Site } from './types.ts'

export const SITE: Site = {
    author: 'Amina Lawal',
    url: 'https://aminalawal.com',
    title: 'Amina Lawal',
    description: 'Amina\'s personal blog, I enjoy the process of building something using any technology stack',
    shortDescription: '',
}

export const NavigationLinks: NavigationLink[] = [
    { name: 'Posts', url: '/posts' },
    { name: 'Categories', url: '/categories' },
    { name: 'Timeline', url: '/timeline' },
    { name: 'Projects', url: '/projects' },
    { name: 'Portfolio', url: 'https://portfolio.aminalawal.com' },
    // { name: 'Friends', url: '/friends' },
]

export const FooterLinks = [
    {
        section: 'Blog',
        links: [
            { name: 'Posts', url: '/posts' },
            { name: 'Timeline', url: '/timeline' },
            { name: 'Categories', url: '/categories' },
            { name: 'Projects', url: '/projects' },
            { name: 'Portfolio', url: 'https://portfolio.aminalawal.com' },
        ],
    },
    {
        section: 'Other',
        links: [
            { name: 'RSS', url: '/rss.xml' },
            { name: 'Site Map', url: '/sitemap-index.xml' },
            { name: 'Twitter', url: 'https://x.com/amiynarh' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/aminalawalofficial' },
        ],
    },
]

export const Settings = {
    GoogleAnalytics: {
        enable: true,
        id: 'G-3FZ9XRHGG9',
    },

    // See https://github.com/umami-software/umami
    UmamiAnalytics: {
        enable: false,
        dataWebsiteID: 'bf63658a-9418-4f39-a6a1-5a0cedb6e429',
    },

    Comment: {
        // Please note that the environment value here is `string` type on Cloudflare Pages
        // If you want to disable the comment system, please delete the `COMMENT_ENABLE` environment variable not just set it to `false`.
        enable: !!import.meta.env.COMMENT_ENABLE,

        // please visit https://giscus.app/ to learn how to configure it.
        // You can also check out this article: https://liruifengv.com/posts/add-comments-to-astro/.
        // enable: true,
        giscus: {
            repo: 'Amiynarh/aminalawal-blog',
            repoId: 'R_kgDOOY0NQQ',
            category: 'Announcements',
            categoryId: 'DIC_kwDOOY0NQc4CpDRk',
            darkTheme: 'noborder_gray',
            lightTheme: 'light',
        },
    },

    Assets: {
        // S3 upload disabled - assets will be served directly from your hosting provider
        uploadAssetsToS3: false,
        // Optional: Keep this configuration commented out in case you want to enable S3 later
        /*
        config: {
            paths: ['assets'],
            endpoint: import.meta.env.S3_ENDPOINT as string,
            bucket: import.meta.env.S3_BUCKET as string,
            accessKey: import.meta.env.S3_ACCESS_KEY as string,
            secretAccessKey: import.meta.env.S3_SECRET_ACCESS_KEY as string,
            root: 'gblog',
        },
        */
    },
}

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'inLanguage': 'en-US',
        '@id': SITE.url,
        'url': SITE.url,
        'name': SITE.title,
        'description': SITE.description,
        'isPartOf': {
            '@type': 'WebSite',
            'url': SITE.url,
            'name': SITE.title,
            'description': SITE.description,
        },
    },
}

import type { NavigationLink, Site } from './types.ts'

export const SITE: Site = {
    author: 'Tolu Banji',
    url: 'https://tolubanji.com',
    title: 'Tolu Banji',
    description: 'A security engineer\'s thoughts on DevSecOps, automation, and building things that don\'t break', 
    shortDescription: '',
}

export const NavigationLinks: NavigationLink[] = [
    { name: 'Posts', url: '/posts' },
    { name: 'Domains', url: '/categories' },
    { name: 'Timeline', url: '/timeline' },
    { name: 'Projects', url: '/projects' },
    { name: 'Portfolio', url: 'https://portfolio.tolubanji.com' },
    // { name: 'Friends', url: '/friends' },
]

export const FooterLinks = [
    {
        section: 'Blog',
        links: [
            { name: 'Posts', url: '/posts' },
            { name: 'Timeline', url: '/timeline' },
            { name: 'Domains', url: '/categories' },
            { name: 'Projects', url: '/projects' },
            { name: 'Portfolio', url: 'https://portfolio.tolubanji.com' },
        ],
    },
    {
        section: 'Other',
        links: [
            { name: 'RSS', url: '/rss.xml' },
            { name: 'Site Map', url: '/sitemap-index.xml' },
            { name: 'Twitter', url: 'https://x.com/toluid_' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tolubanji' },
        ],
    },
]

export const Settings = {
    GoogleAnalytics: {
        enable: true,
        id: 'G-1B0G2Q344G',
    },

    // See https://github.com/umami-software/umami
    UmamiAnalytics: {
        enable: false,
        dataWebsiteID: 'bf63658a-9418-4f39-a6a1-5a0cedb6e429',
    },

    Comment: {
        // Please note that the environment value here is `string` type on Cloudflare Pages
        // If you want to disable the comment system, please delete the `COMMENT_ENABLE` environment variable not just set it to `false`.
        enable: true,

        // please visit https://giscus.app/ to learn how to configure it.
        // You can also check out this article: https://liruifengv.com/posts/add-comments-to-astro/.
        // enable: true,
        giscus: {
            repo: 'ToluGIT/Tolu-blog',
            repoId: 'R_kgDOPFwc6Q',
            category: 'Announcements',
            categoryId: 'DIC_kwDOPFwc6c4CsYk8',
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

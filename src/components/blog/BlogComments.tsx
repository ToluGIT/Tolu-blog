import * as React from 'react'
import Giscus, { type Repo } from '@giscus/react'
import { Settings } from '@/config.ts'

const id = 'inject-comments'
const commentSetting = Settings.Comment.giscus

function getCurrentTheme(): string {
    if (typeof window === 'undefined') {
        return 'light' // Default theme during SSR
    }

    if (window.localStorage.getItem('hs_theme')) {
        return window.localStorage.getItem('hs_theme') ?? 'default'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
}

function convertThemeToGiscusTheme(theme: string | null): string {
    if (!theme) {
        return commentSetting.lightTheme
    }

    return theme === 'dark' ? commentSetting.darkTheme : commentSetting.lightTheme
}

function BlogComments() {
    const [mounted, setMounted] = React.useState(false)
    const [theme, setTheme] = React.useState(convertThemeToGiscusTheme(getCurrentTheme()))

    const handleThemeChange = (event: any) => {
        setTheme(convertThemeToGiscusTheme(event?.detail))
    }

    React.useEffect(() => {
        const theme = convertThemeToGiscusTheme(getCurrentTheme())
        setTheme(theme)

        window.addEventListener('on-hs-appearance-change', handleThemeChange)

        return () => {
            window.removeEventListener('on-hs-appearance-change', handleThemeChange)
        }
    }, [])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div id={id} className="w-full">
            {mounted
                ? (
                        <Giscus
                            id={id}
                            repo={commentSetting.repo as Repo}
                            repoId={commentSetting.repoId}
                            category={commentSetting.category}
                            categoryId={commentSetting.categoryId}
                            mapping="title"
                            reactionsEnabled="1"
                            emitMetadata="0"
                            inputPosition="top"
                            lang="en"
                            loading="lazy"
                            theme={theme}
                        />
                    )
                : null}
        </div>
    )
}

export default BlogComments

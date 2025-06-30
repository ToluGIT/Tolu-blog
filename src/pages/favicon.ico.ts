import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { APIRoute } from 'astro'

const faviconPath = path.resolve('src/images/favicon_icon2.svg')

export const GET: APIRoute = async () => {
    const ico = await readFile(faviconPath)
    return new Response(ico, {
        headers: { 'Content-Type': 'image/svg+xml' },
    })
}

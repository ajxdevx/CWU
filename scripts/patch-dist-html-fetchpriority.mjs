/**
 * After `vite build`, the entry `<script type="module">` is injected without fetchpriority.
 * Patch dist/index.html so the main bundle is lower priority than hero video preloads.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'dist', 'index.html')

if (!fs.existsSync(out)) {
  process.exit(0)
}

let html = fs.readFileSync(out, 'utf8')
// Favicon also uses fetchpriority=low — only skip if the entry bundle is already patched.
if (
  /<script[^>]*\bsrc=["']\/assets\/index-[^"']+["'][^>]*\bfetchpriority=["']low["']/.test(html)
) {
  process.exit(0)
}

const d = html.indexOf('src="/assets/index-')
const s = html.indexOf("src='/assets/index-")
const idx = d >= 0 ? d : s
if (idx < 0) {
  process.exit(0)
}

const gt = html.indexOf('>', idx)
if (gt < 0) {
  process.exit(0)
}

html = `${html.slice(0, gt)} fetchpriority="low"${html.slice(gt)}`
fs.writeFileSync(out, html, 'utf8')

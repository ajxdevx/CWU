import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const svgPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'coin.svg')
const pngPath = path.join(__dirname, '..', 'public', 'assets', 'images', 'coin-texture.png')

const svg = fs.readFileSync(svgPath, 'utf8')
const re = /xlink:href="(data:image\/png;base64,[^"]+)"/
const m = svg.match(re)
if (!m) {
  console.error('No embedded PNG found')
  process.exit(1)
}
const b64 = m[1].replace(/^data:image\/png;base64,/, '')
const buf = Buffer.from(b64, 'base64')
fs.writeFileSync(pngPath, buf)

const newSvg = svg.replace(re, 'xlink:href="/assets/images/coin-texture.png"')
fs.writeFileSync(svgPath, newSvg)

console.log('Wrote', pngPath, buf.length, 'bytes')
console.log('SVG size', newSvg.length, 'chars')

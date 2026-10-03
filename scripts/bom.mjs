// Writes outputs/bom.csv from the built circuit: every part with its LCSC
// number, grouped, with LCSC stock and qty-1 price looked up now through the
// JLC parts index tscircuit uses (jlcsearch.tscircuit.com).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"

const cj = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const rows = new Map()
for (const c of cj.filter((e) => e.type === "source_component")) {
  const lcsc = c.supplier_part_numbers?.jlcpcb?.[0]
  if (!lcsc) throw new Error(`${c.name} has no LCSC number`)
  const row = rows.get(lcsc) ?? { refs: [], lcsc, mpn: c.manufacturer_part_number ?? "" }
  row.refs.push(c.name)
  if (c.resistance) row.resistance = c.resistance
  rows.set(lcsc, row)
}

const api = "https://jlcsearch.tscircuit.com"
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function search(queries, num) {
  // Search by LCSC number first, then MPN. limit=4: on 2026-10-03 the same
  // query with limit=10 returned unrelated parts. Retry before giving up.
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const q of queries) {
      const r = await fetch(`${api}/api/search?q=${encodeURIComponent(q)}&limit=4`)
      const hit = ((await r.json()).components ?? []).find((c) => String(c.lcsc) === num)
      if (hit) return hit
    }
    await sleep(1500 * (attempt + 1))
  }
}

async function lookup(row) {
  const num = row.lcsc.slice(1)
  let hit = await search([row.lcsc, row.mpn], num)
  if (!hit && row.resistance) {
    // The MPN search misses some basic resistors; the resistor list finds them.
    const r2 = await fetch(`${api}/resistors/list.json?resistance=${row.resistance}`)
    const res = ((await r2.json()).resistors ?? []).find((c) => String(c.lcsc) === num)
    if (res) hit = { stock: res.stock, price: String(res.price1), is_basic: res.is_basic }
  }
  if (!hit) return { stock: "", price: "", basic: "" }
  const price = String(hit.price).split(",")[0].split(":").pop()
  return { stock: hit.stock, price: Number(price).toFixed(4), basic: hit.is_basic ? "basic" : "extended" }
}

const date = new Date().toISOString().slice(0, 10)
const lines = [`References,Quantity,Manufacturer Part Number,LCSC,LCSC stock ${date},Unit price USD (qty 1),JLC type,URL`]
let total = 0
for (const row of [...rows.values()].sort((a, b) => a.refs[0].localeCompare(b.refs[0], "en", { numeric: true }))) {
  const info = await lookup(row)
  if (!info.stock) console.error(`warning: no live stock for ${row.lcsc} (${row.mpn})`)
  total += row.refs.length * Number(info.price || 0)
  lines.push([row.refs.join(" "), row.refs.length, row.mpn, row.lcsc, info.stock, info.price, info.basic,
    `https://www.lcsc.com/product-detail/${row.lcsc}.html`].join(","))
}
mkdirSync("outputs", { recursive: true })
writeFileSync("outputs/bom.csv", lines.join("\n") + "\n")
console.log(lines.join("\n"))
console.log(`\n${rows.size} lines, parts total about $${total.toFixed(2)} per board at qty 1`)

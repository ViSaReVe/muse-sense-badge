// Negative controls: inject known faults into a copy of the built circuit and
// confirm the checks used in drc.mjs report them. Exits 1 if one stays silent.
import { readFileSync } from "node:fs"
import * as checks from "@tscircuit/checks"

const base = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const clone = () => structuredClone(base)
const errorsFrom = async (name, cj) =>
  ((await checks[name](cj)) ?? []).filter((e) => /error/.test(e.type)).length
const trace = base.find((e) => e.type === "pcb_trace")
const firstWire = (cj) =>
  cj.find((e) => e.pcb_trace_id === trace.pcb_trace_id).route.find((r) => r.route_type === "wire")

const cases = [
  ["via on the farthest pad", "checkViaPadClearance", (cj) => {
    const v = cj.find((e) => e.type === "pcb_via")
    const pad = cj.filter((e) => e.type === "pcb_smtpad")
      .sort((a, b) => Math.hypot(b.x - v.x, b.y - v.y) - Math.hypot(a.x - v.x, a.y - v.y))[0]
    Object.assign(v, { x: pad.x, y: pad.y })
    return cj
  }],
  ["trace removed", "checkEachPcbPortConnectedToPcbTraces", (cj) =>
    cj.filter((e) => !(e.type === "pcb_trace" && e.pcb_trace_id === trace.pcb_trace_id))],
  ["trace point off the board", "checkPcbTracesOutOfBoard", (cj) => {
    Object.assign(firstWire(cj), { x: 30, y: 0 })
    return cj
  }],
]

let silent = 0
for (const [label, name, mutate] of cases) {
  const n = await errorsFrom(name, mutate(clone()))
  console.log(`${label}: ${name} -> ${n} error(s)${n ? "" : "  SILENT"}`)
  if (!n) silent++
}
process.exit(silent ? 1 : 0)

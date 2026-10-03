// Runs tscircuit's DRC on the built circuit and writes outputs/drc.txt.
// Exits 1 if any check reports an error.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import * as checks from "@tscircuit/checks"

const circuitJson = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))

// Each copper and connectivity check by name, so the report shows what ran.
const named = [
  "checkEachPcbPortConnectedToPcbTraces",
  "checkSourceTracesHavePcbTraces",
  "checkTracesAreContiguous",
  "checkSameNameNetsAreConnected",
  "checkPinMustBeConnected",
  "checkEachPcbTraceNonOverlapping",
  "checkPcbTraceSelfShorts",
  "checkPadPadClearance",
  "checkPadTraceClearance",
  "checkViaPadClearance",
  "checkViaTraceClearance",
  "checkViasInPads",
  "checkDifferentNetViaSpacing",
  "checkSameNetViaSpacing",
  "checkHoleTraceClearance",
  "checkCopperToBoardEdgeClearance",
  "checkPcbTracesOutOfBoard",
  "checkViasOffBoard",
  "checkPcbComponentsOutOfBoard",
  "checkPcbComponentOverlap",
  "checkPcbCopperOverKeepout",
  "checkPcbCourtyardOverKeepout",
  "checkDanglingTraces",
  "checkConnectorAccessibleOrientation",
  "checkTwoTerminalSwitchContactsOnDifferentNets",
]

const lines = []
let errors = 0
const isError = (e) => /error/.test(e.type ?? e.error_type ?? "")

for (const name of named) {
  const fn = checks[name]
  if (typeof fn !== "function") {
    lines.push(`${name}: NOT AVAILABLE in this @tscircuit/checks version`)
    continue
  }
  const result = (await fn(circuitJson)) ?? []
  const n = result.filter(isError).length
  errors += n
  lines.push(`${name}: ${n} error(s)${result.length > n ? `, ${result.length - n} warning(s)` : ""}`)
  for (const e of result) lines.push(`    ${e.type}: ${e.message}`)
}

// Local check: @tscircuit/checks' copper-over-keepout check covers pads,
// plated holes and vias but not traces, so scan trace points here. The
// keepout spans the full board width, so a trace entering it must have a
// point inside it.
{
  let hits = 0
  for (const ko of circuitJson.filter((e) => e.type === "pcb_keepout" && e.shape === "rect")) {
    const [x0, x1] = [ko.center.x - ko.width / 2, ko.center.x + ko.width / 2]
    const [y0, y1] = [ko.center.y - ko.height / 2, ko.center.y + ko.height / 2]
    for (const t of circuitJson.filter((e) => e.type === "pcb_trace")) {
      for (const r of t.route) {
        if (r.x >= x0 && r.x <= x1 && r.y >= y0 && r.y <= y1) hits++
      }
    }
  }
  errors += hits
  lines.push(`local: trace points inside keepouts: ${hits} error(s)`)
}

const all = (await checks.runAllChecks(circuitJson)) ?? []
const allErrors = all.filter(isError)
lines.push("", `runAllChecks: ${allErrors.length} error(s), ${all.length - allErrors.length} warning(s)`)
for (const e of all) lines.push(`    ${e.type}: ${e.message}`)

const counts = {}
for (const e of circuitJson) counts[e.type] = (counts[e.type] ?? 0) + 1
const vias = circuitJson.filter((e) => e.type === "pcb_via")
const viaSizes = [...new Set(vias.map((v) => `${v.hole_diameter}/${v.outer_diameter} mm`))]
const header = [
  "Muse Sense E1 DRC report",
  `tscircuit ${JSON.parse(readFileSync("node_modules/tscircuit/package.json", "utf8")).version}, @tscircuit/checks ${JSON.parse(readFileSync("node_modules/@tscircuit/checks/package.json", "utf8")).version}`,
  `pcb_trace: ${counts.pcb_trace ?? 0}, pcb_via: ${vias.length} (drill/pad ${viaSizes.join(", ") || "n/a"})`,
  `Total errors: ${errors + allErrors.length}`,
  "",
]
mkdirSync("outputs", { recursive: true })
writeFileSync("outputs/drc.txt", [...header, ...lines, ""].join("\n"))
console.log([...header, ...lines].join("\n"))
process.exit(errors + allErrors.length > 0 ? 1 : 0)

#!/usr/bin/env bash
# Regenerates everything in outputs/ from the circuit source. Stops on the
# first failing step, including any DRC error.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p outputs

npx tsci build index.circuit.tsx --pcb-png --schematic-png --svgs --glbs --3d
node scripts/drc.mjs
node scripts/drc-selftest.mjs
node scripts/bom.mjs

npx tsci export index.circuit.tsx -f schematic-pdf -o outputs/schematic.pdf
npx tsci export index.circuit.tsx -f gerbers -o outputs/gerbers.zip
npx tsci export index.circuit.tsx -f pcb-png --layer bottom -o outputs/pcb-bottom.png
cp dist/index/pcb.png outputs/pcb-top.png
cp dist/index/3d.png outputs/3d-preview.png
cp dist/index/schematic.png outputs/schematic.png

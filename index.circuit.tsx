import { Buttons } from "./lib/buttons"
import { Led } from "./lib/led"
import { Mcu } from "./lib/mcu"
import { Power } from "./lib/power"
import { Qwiic } from "./lib/qwiic"
import { Usb } from "./lib/usb"

// Muse Sense badge, experiment 1: ESP32-S3-WROOM-1-N8R8 carrier, 40 x 50 mm,
// 2 layers. Origin at the board centre, +y toward the antenna edge.
const HOLE_X = 16.5

export default () => (
  <board
    width="40mm"
    height="50mm"
    layers={2}
    fabricatorPreset="jlcpcb_standard"
    pcbStyle={{ viaHoleDiameter: "0.3mm", viaPadDiameter: "0.6mm" }}
  >
    <Mcu />
    <Usb />
    <Power />
    <Buttons />
    <Led />
    <Qwiic />

    {/* Ground on both layers. The antenna keepout above excludes pours. */}
    <copperpour connectsTo="net.GND" layer="top" />
    <copperpour connectsTo="net.GND" layer="bottom" />

    {/* No copper under the module antenna on either layer. The module itself
        is excluded so its antenna can sit over the keepout. */}
    <keepout
      shape="rect"
      pcbX={0}
      pcbY={21.9}
      width={40}
      height={6.2}
      layers={["top", "bottom"]}
      excludeRefs={[".U1"]}
    />

    {/* M2 mounting holes. */}
    <hole name="H1" diameter="2.2mm" pcbX={-HOLE_X} pcbY={13} />
    <hole name="H2" diameter="2.2mm" pcbX={HOLE_X} pcbY={13} />
    <hole name="H3" diameter="2.2mm" pcbX={-HOLE_X} pcbY={-21.5} />
    <hole name="H4" diameter="2.2mm" pcbX={HOLE_X} pcbY={-21.5} />

    <silkscreentext text="MUSE SENSE E1" pcbX={3} pcbY={-4.5} fontSize="1mm" />
    <silkscreentext text="LED GPIO38" pcbX={14.5} pcbY={-4.4} fontSize="0.7mm" />
    <silkscreentext text="BOOT" pcbX={11} pcbY={-13.4} fontSize="0.7mm" />
    <silkscreentext text="RST" pcbX={-14.5} pcbY={2.4} fontSize="0.7mm" />
    <silkscreentext text="QWIIC" pcbX={-17} pcbY={-10.6} fontSize="0.7mm" />
  </board>
)

import { ESP32_S3_WROOM_1_N8R8 as Esp32 } from "../imports/ESP32_S3_WROOM_1_N8R8"
import { PART, part } from "./parts"

// The module's top edge is footprint y = +16.53 and its antenna runs from
// y = +10.5 to the top. Placing the top edge on the board edge (y = +25) puts
// the antenna over the keepout in index.circuit.tsx.
export const MCU_Y = 25 - 16.53

export const Mcu = () => (
  <>
    <Esp32
      name="U1"
      schX={0}
      schY={-1}
      pcbX={0}
      pcbY={MCU_Y}
      connections={{
        GND1: "net.GND",
        GND2: "net.GND",
        GND3: "net.GND",
        "3V3": "net.V3V3",
        EN: "net.CHIP_PU",
        IO0: "net.BOOT",
        IO19: "net.USB_DN_MCU",
        IO20: "net.USB_DP_MCU",
        IO38: "net.LED_DATA_3V3",
        IO8: "net.I2C_SDA",
        IO9: "net.I2C_SCL",
      }}
    />

    {/* Bulk and high-frequency decoupling at the module's 3V3 pin. */}
    <capacitor
      name="C1"
      schX={-3.4}
      schY={2.6}
      capacitance="22uF"
      footprint="0805"
      {...part(PART.C22u)}

      pcbX={-14.6}
      pcbY={16.6}
      pcbRotation={90}
    />
    <capacitor
      name="C2"
      schX={-2.4}
      schY={2.6}
      capacitance="100nF"
      footprint="0603"
      {...part(PART.C100n)}

      pcbX={-12.0}
      pcbY={16.6}
      pcbRotation={90}
    />
    <trace from=".C1 > .pin1" to="net.V3V3" />
    <trace from=".C1 > .pin2" to="net.GND" />
    <trace from=".C2 > .pin1" to="net.V3V3" />
    <trace from=".C2 > .pin2" to="net.GND" />

    {/* CHIP_PU power-on delay, R = 10k and C = 1uF per Espressif's ESP32-S3
        schematic checklist. */}
    <resistor
      name="R1"
      schX={-4.6}
      schY={0.6}
      resistance="10k"
      footprint="0603"
      {...part(PART.R10k)}

      pcbX={-10.75}
      pcbY={12.0}
      pcbRotation={90}
    />
    <capacitor
      name="C3"
      schX={-4.6}
      schY={-0.8}
      capacitance="1uF"
      footprint="0603"
      {...part(PART.C1u)}

      pcbX={-12.8}
      pcbY={12.0}
      pcbRotation={90}
    />
    <trace from=".R1 > .pin1" to="net.V3V3" />
    <trace from=".R1 > .pin2" to="net.CHIP_PU" />
    <trace from=".C3 > .pin1" to="net.CHIP_PU" />
    <trace from=".C3 > .pin2" to="net.GND" />
  </>
)

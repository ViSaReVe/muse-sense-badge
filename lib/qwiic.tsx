import { SM04B_SRSS_TB_LF__SN_ as JstSh4 } from "../imports/SM04B_SRSS_TB_LF__SN_"
import { PART, part } from "./parts"

// Qwiic / STEMMA QT: 1 GND, 2 3.3V, 3 SDA, 4 SCL. Pins 5 and 6 are the
// mechanical tabs. Rotated -90 so the opening faces the left board edge.
export const Qwiic = () => (
  <>
    <JstSh4
      name="J2"
      schX={-8.4}
      schY={-5.6}
      pcbX={-17}
      pcbY={-6}
      pcbRotation={-90}
      noConnect={["pin5", "pin6"]}
      connections={{
        pin1: "net.GND",
        pin2: "net.V3V3",
        pin3: "net.I2C_SDA",
        pin4: "net.I2C_SCL",
      }}
    />
    <resistor
      name="R3"
      schX={-11.4}
      schY={-3.6}
      resistance="4.7k"
      footprint="0603"
      {...part(PART.R4k7)}

      pcbX={-11.5}
      pcbY={-4.5}
    />
    <resistor
      name="R4"
      schX={-8.6}
      schY={-3.6}
      resistance="4.7k"
      footprint="0603"
      {...part(PART.R4k7)}

      pcbX={-11.5}
      pcbY={-6.5}
    />
    <trace from=".R3 > .pin1" to="net.V3V3" />
    <trace from=".R3 > .pin2" to="net.I2C_SDA" />
    <trace from=".R4 > .pin1" to="net.V3V3" />
    <trace from=".R4 > .pin2" to="net.I2C_SCL" />
  </>
)

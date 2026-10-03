import { AP2112K_3_3TRG1 as Ldo } from "../imports/AP2112K_3_3TRG1"
import { PART, part } from "./parts"

// 5 V to 3.3 V, 600 mA, which meets Espressif's 500 mA minimum. The LDO drops
// 1.7 V; see the README for the heat budget.
export const Power = () => (
  <>
    <Ldo
      name="U3"
      schX={0}
      schY={7.4}
      pcbX={-10.5}
      pcbY={-18}
      connections={{
        VIN: "net.VBUS",
        EN: "net.VBUS",
        GND: "net.GND",
        VOUT: "net.V3V3",
      }}
    />
    <capacitor
      name="C4"
      schX={-2}
      schY={6.2}
      capacitance="10uF"
      footprint="0805"
      {...part(PART.C10u)}
      pcbX={-14.5}
      pcbY={-18}
      pcbRotation={90}
    />
    <capacitor
      name="C5"
      schX={2}
      schY={6.2}
      capacitance="10uF"
      footprint="0805"
      {...part(PART.C10u)}
      pcbX={-10.5}
      pcbY={-13.5}
    />
    <trace from=".C4 > .pin1" to="net.VBUS" />
    <trace from=".C4 > .pin2" to="net.GND" />
    <trace from=".C5 > .pin1" to="net.V3V3" />
    <trace from=".C5 > .pin2" to="net.GND" />
  </>
)

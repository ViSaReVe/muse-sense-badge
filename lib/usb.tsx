import { TYPE_C_31_M_12 as UsbC } from "../imports/TYPE_C_31_M_12"
import { USBLC6_2SC6 as UsbEsd } from "../imports/USBLC6_2SC6"
import { PART, part } from "./parts"

export const Usb = () => (
  <>
    {/* Receptacle opening faces footprint -y; its front sits on the bottom
        board edge (y = -25). */}
    <UsbC
      name="J1"
      schX={-11}
      schY={5.5}
      pcbX={0}
      pcbY={-19.4}
      noConnect={["SBU1", "SBU2"]}
      connections={{
        VBUS1: "net.VBUS",
        VBUS2: "net.VBUS",
        GND1: "net.GND",
        GND2: "net.GND",
        EH1: "net.GND",
        EH2: "net.GND",
        EH3: "net.GND",
        EH4: "net.GND",
        DP1: "net.USB_DP",
        DP2: "net.USB_DP",
        DN1: "net.USB_DN",
        DN2: "net.USB_DN",
        CC1: "net.USB_CC1",
        CC2: "net.USB_CC2",
      }}
    />

    {/* 5.1k on each CC pin so a USB-C source turns VBUS on. */}
    <resistor
      name="R5"
      schX={-13.4}
      schY={2.8}
      resistance="5.1k"
      footprint="0603"
      {...part(PART.R5k1)}
      pcbX={-3}
      pcbY={-14}
      pcbRotation={90}
    />
    <resistor
      name="R6"
      schX={-10.6}
      schY={2.8}
      resistance="5.1k"
      footprint="0603"
      {...part(PART.R5k1)}
      pcbX={3}
      pcbY={-14}
      pcbRotation={90}
    />
    <trace from=".R5 > .pin1" to="net.USB_CC1" />
    <trace from=".R5 > .pin2" to="net.GND" />
    <trace from=".R6 > .pin1" to="net.USB_CC2" />
    <trace from=".R6 > .pin2" to="net.GND" />

    <UsbEsd
      name="U2"
      schX={-7}
      schY={6.2}
      pcbX={0}
      pcbY={-10.5}
      connections={{
        IO1_A: "net.USB_DP",
        IO1_B: "net.USB_DP",
        IO2_A: "net.USB_DN",
        IO2_B: "net.USB_DN",
        GND: "net.GND",
        VBUS: "net.VBUS",
      }}
    />

    {/* 100nF on the USBLC6 VBUS pin, which the part's attributes call for. */}
    <capacitor
      name="C8"
      schX={-7}
      schY={4.4}
      capacitance="100nF"
      footprint="0603"
      {...part(PART.C100n)}
      pcbX={3.4}
      pcbY={-10.5}
      pcbRotation={90}
    />
    <trace from=".C8 > .pin1" to="net.VBUS" />
    <trace from=".C8 > .pin2" to="net.GND" />

    {/* Series resistors Espressif's checklist says to reserve on D+/D-. */}
    <resistor
      name="R7"
      schX={-4.4}
      schY={6.6}
      resistance="22"
      footprint="0603"
      {...part(PART.R22)}
      pcbX={-5.5}
      pcbY={-3.5}
    />
    <resistor
      name="R8"
      schX={-4.4}
      schY={5.6}
      resistance="22"
      footprint="0603"
      {...part(PART.R22)}
      pcbX={-5.5}
      pcbY={-5.5}
      pcbRotation={180}
    />
    <trace from=".R7 > .pin1" to="net.USB_DP" />
    <trace from=".R7 > .pin2" to="net.USB_DP_MCU" />
    <trace from=".R8 > .pin1" to="net.USB_DN" />
    <trace from=".R8 > .pin2" to="net.USB_DN_MCU" />
  </>
)

import { TS_1187A_B_A_B as Button } from "../imports/TS_1187A_B_A_B"

// Each 4-pin tact switch shorts two pin pairs when pressed. Pins 1 and 4 are
// diagonal, so they sit in different pairs whichever way the pairs run.
export const Buttons = () => (
  <>
    {/* BOOT: GPIO0 low at reset enters the ROM download mode. GPIO0 has an
        internal pull-up. */}
    <Button
      name="SW1"
      schX={4.6}
      schY={-4.2}
      pcbX={11}
      pcbY={-17}
      connections={{ A: "net.BOOT", D: "net.GND" }}
    />
    {/* The imported symbol only draws pins 1 and 2, so pin 4 to GND has no
        wire on the schematic. */}
    <schematictext text="SW1 pin 4 (D) to GND" schX={4.6} schY={-4.9} fontSize={0.18} />
    {/* RESET: pulls CHIP_PU low. */}
    <Button
      name="SW2"
      schX={-6.4}
      schY={-2.2}
      pcbX={-14.5}
      pcbY={6}
      connections={{ A: "net.CHIP_PU", D: "net.GND" }}
    />
    <schematictext text="SW2 pin 4 (D) to GND" schX={-6.4} schY={-2.9} fontSize={0.18} />
  </>
)

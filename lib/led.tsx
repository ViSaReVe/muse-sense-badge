import { SN74AHCT1G125DBVR as Buffer } from "../imports/SN74AHCT1G125DBVR"
import { WS2812B_B_T as Ws2812b } from "../imports/WS2812B_B_T"
import { PART, part } from "./parts"

// Status LED on GPIO38, the same pin as the ESP32-S3-DevKitC-1 v1.1, so the
// SDK's espressif-s3-devkitc-1 overlay drives it unchanged
// (CONFIG_HOMEHUB_LED_STRIP_GPIO=38).
//
// The WS2812B runs from 5 V and needs VIH = 0.7 x VDD = 3.5 V, above the S3's
// 3.3 V output. The AHCT buffer runs from 5 V with a 2 V TTL input threshold.
export const Led = () => (
  <>
    <Buffer
      name="U4"
      schX={6.4}
      schY={2.2}
      pcbX={14}
      pcbY={9}
      connections={{
        A: "net.LED_DATA_3V3",
        Y: "net.LED_DATA_5V",
        N_OE: "net.GND",
        GND: "net.GND",
        VCC: "net.VBUS",
      }}
    />
    <capacitor
      name="C6"
      schX={6.4}
      schY={4.2}
      capacitance="100nF"
      footprint="0603"
      {...part(PART.C100n)}

      pcbX={13.0}
      pcbY={12.3}
    />
    <trace from=".C6 > .pin1" to="net.VBUS" />
    <trace from=".C6 > .pin2" to="net.GND" />

    <Ws2812b
      name="D1"
      schX={8.8}
      schY={2.2}
      pcbX={14.5}
      pcbY={1.5}
      connections={{
        DIN: "net.LED_DATA_5V",
        VDD: "net.VBUS",
        VSS: "net.GND",
      }}
    />
    <capacitor
      name="C7"
      schX={8.8}
      schY={4.2}
      capacitance="100nF"
      footprint="0603"
      {...part(PART.C100n)}

      pcbX={14.5}
      pcbY={-2.6}
    />
    <trace from=".C7 > .pin1" to="net.VBUS" />
    <trace from=".C7 > .pin2" to="net.GND" />
  </>
)

import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["VDD"],
  pin2: ["DOUT"],
  pin3: ["VSS"],
  pin4: ["DIN"]
} as const

const pinAttributes = {
  pin1: {requiresPower: true},
  pin3: {requiresGround: true}
} as const

export const WS2812B_B_T = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2761795"
  ]
}}
      manufacturerPartNumber="WS2812B-B/T"
      footprint={<footprint>
        <smtpad portHints={["pin3"]} pcbX="2.449957mm" pcbY="-1.649984mm" width="1.499997mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="2.449957mm" pcbY="1.649984mm" width="1.499997mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-2.449957mm" pcbY="1.649984mm" width="1.499997mm" height="0.999998mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-2.449957mm" pcbY="-1.649984mm" width="1.499997mm" height="0.999998mm" shape="rect" />
<silkscreenpath route={[{"x":1.3999971999999872,"y":-1.7999963999999977},{"x":1.3999971999999872,"y":-2.500020400000011},{"x":1.3999971999999872,"y":-2.500020400000011},{"x":0.6999732000000023,"y":-2.500020400000011},{"x":1.3999971999999872,"y":-1.7997423999999995}]} />
<silkscreenpath route={[{"x":-2.5000458000000094,"y":2.500045799999995},{"x":2.4999442000000016,"y":2.500045799999995}]} />
<silkscreenpath route={[{"x":-2.5000458000000094,"y":-0.7695692000000065},{"x":-2.5000458000000094,"y":0.7696707999999859}]} />
<silkscreenpath route={[{"x":-2.5000458000000094,"y":2.3803101999999967},{"x":-2.5000458000000094,"y":2.500045799999995}]} />
<silkscreenpath route={[{"x":-2.5000458000000094,"y":-2.4999442000000016},{"x":-2.5000458000000094,"y":-2.380208600000003}]} />
<silkscreenpath route={[{"x":2.4999442000000016,"y":-2.4999442000000016},{"x":-2.5000458000000094,"y":-2.4999442000000016}]} />
<silkscreenpath route={[{"x":2.4999442000000016,"y":-2.380208600000003},{"x":2.4999442000000016,"y":-2.4999442000000016}]} />
<silkscreenpath route={[{"x":2.4999442000000016,"y":2.500045799999995},{"x":2.4999442000000016,"y":2.3803101999999967}]} />
<silkscreenpath route={[{"x":2.4999442000000016,"y":0.7696707999999859},{"x":2.4999442000000016,"y":-0.7695692000000065}]} />
<silkscreencircle pcbX="0.000635mm" pcbY="0mm" radius="1.500124mm" />
<silkscreencircle pcbX="-2.999867mm" pcbY="2.499868mm" radius="0.100076mm" />
<silkscreentext text="{NAME}" pcbX="0.000381mm" pcbY="3.588514mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":2.499994999999984,"y":-1.2999974000000094},{"x":2.499994999999984,"y":-2.4999950000000126},{"x":1.199997599999989,"y":-2.4999950000000126},{"x":2.499994999999984,"y":-1.2999974000000094}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-2.5249886000000146,"y":1.7249901999999793},{"x":-1.4749780000000072,"y":1.7249901999999793},{"x":-1.4749780000000072,"y":1.5249905999999953},{"x":-2.5249886000000146,"y":1.5249905999999953},{"x":-2.5249886000000146,"y":1.7249901999999793}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":1.9999959999999959,"y":-1.4999970000000076},{"x":0.9499853999999743,"y":-1.4999970000000076},{"x":0.9499853999999743,"y":-1.2999974000000094},{"x":1.9999959999999959,"y":-1.2999974000000094},{"x":1.9999959999999959,"y":-1.4999970000000076}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-2.099995800000002,"y":1.099997799999997},{"x":-2.099995800000002,"y":2.1500084000000044},{"x":-1.8999962000000181,"y":2.1500084000000044},{"x":-1.8999962000000181,"y":1.099997799999997},{"x":-2.099995800000002,"y":1.099997799999997}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-3.4499555000000015,"y":2.749994999999984},{"x":3.4499555000000015,"y":2.749994999999984},{"x":3.4499555000000015,"y":-2.7499950000000126},{"x":-3.4499555000000015,"y":-2.7499950000000126},{"x":-3.4499555000000015,"y":2.749994999999984}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2761795.obj?uuid=71d618f5941d47d18cd783a77f297ffe",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2761795.step?uuid=71d618f5941d47d18cd783a77f297ffe",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.1 },
      }}
      {...props}
    />
  )
}
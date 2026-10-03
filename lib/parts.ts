// Passives: LCSC number and manufacturer part number. All are JLCPCB basic
// parts, checked in stock on 2026-10-03.
export const PART = {
  R10k: { lcsc: "C25804", mpn: "0603WAF1002T5E" },
  R5k1: { lcsc: "C23186", mpn: "0603WAF5101T5E" },
  R4k7: { lcsc: "C23162", mpn: "0603WAF4701T5E" },
  R22: { lcsc: "C23345", mpn: "0603WAF220JT5E" },
  C100n: { lcsc: "C14663", mpn: "CC0603KRX7R9BB104" },
  C1u: { lcsc: "C15849", mpn: "CL10A105KB8NNNC" },
  C10u: { lcsc: "C15850", mpn: "CL21A106KAYNNNE" },
  C22u: { lcsc: "C45783", mpn: "CL21A226MAQNNNE" },
} as const

export const part = (p: { lcsc: string; mpn: string }) => ({
  supplierPartNumbers: { jlcpcb: [p.lcsc] },
  manufacturerPartNumber: p.mpn,
})

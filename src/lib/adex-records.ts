import type { Row } from "./adex-data";

export type Step = { label: string; detail: string; done: boolean };
export type Pair = { label: string; value: string };

export type StoneRecord = {
  id: string;
  barcode: string;
  carat: string;
  classification: string;
  origin: string;
  seller: string;
  status: string;
  location: string;
  lot: string;
  editable: boolean;
  registration: Pair[];
  lifecycle: Step[];
  valuation: {
    reference: string;
    status: string;
    items: Pair[];
    history: Step[];
  } | null;
  auction: Row[];
  shipment: {
    id: string;
    items: Pair[];
    steps: Step[];
  } | null;
  payment: {
    items: Pair[];
    breakdown: Row[];
  } | null;
  certificates: Row[];
  history: Row[];
};

export type LotRecord = {
  id: string;
  name: string;
  classification: string;
  stoneCount: number;
  totalCarat: string;
  estimatedValue: string;
  status: string;
  seller: string;
  editable: boolean;
  registration: Pair[];
  composition: Row[];
  lifecycle: Step[];
  valuation: StoneRecord["valuation"];
  auction: Row[];
  shipment: StoneRecord["shipment"];
  payment: StoneRecord["payment"];
  certificates: Row[];
  history: Row[];
};

const certRows = (item: string): Row[] => [
  {
    Certificate: "KP-4471902",
    Type: "Kimberley Process",
    Item: item,
    Issued: "12 Aug 2026",
    Status: "Valid",
  },
  { Certificate: "FT-1180244", Type: "Fair Trade", Item: item, Issued: "12 Aug 2026", Status: "Valid" },
  { Certificate: "GR-2280114", Type: "Grading", Item: item, Issued: "13 Aug 2026", Status: "Valid" },
];

export const stoneRecords: StoneRecord[] = [
  {
    id: "ADX-S-04412",
    barcode: "8842-1194",
    carat: "12.48",
    classification: "Gem quality",
    origin: "Mbuji-Mayi, DRC",
    seller: "Kasai Mining SARL",
    status: "Listed",
    location: "Antwerp Vault",
    lot: "—",
    editable: false,
    registration: [
      { label: "Barcode", value: "8842-1194" },
      { label: "Weight / carat", value: "12.48 ct" },
      { label: "Classification", value: "Gem quality, octahedron" },
      { label: "Collection location", value: "Mbuji-Mayi collection point" },
      { label: "Source reference", value: "KMS-COL-2026-0841" },
      { label: "Registered by", value: "Joseph Kabamba · 04 Aug 2026" },
    ],
    lifecycle: [
      { label: "Submitted", detail: "04 Aug 2026 · registration received", done: true },
      { label: "ADEX Stone ID issued", detail: "ADX-S-04412 · 04 Aug 2026", done: true },
      { label: "Received", detail: "06 Aug 2026 · Kinshasa Hub", done: true },
      { label: "Scanned", detail: "09 Aug 2026 · 3D + spectral complete", done: true },
      { label: "Valued", detail: "12 Aug 2026 · $184,500", done: true },
      { label: "Listed", detail: "AUC-2026-08-A", done: true },
    ],
    valuation: {
      reference: "VAL-8841",
      status: "Approved",
      items: [
        { label: "Valuation provider", value: "GemPrice Analytics (third party)" },
        { label: "Estimated value", value: "$184,500" },
        { label: "Reference price", value: "$14,780 / ct" },
        { label: "Applicable range", value: "$160,000 – $210,000" },
        { label: "Valuation date", value: "12 Aug 2026" },
        { label: "Status", value: "Approved" },
      ],
      history: [
        { label: "Submitted", detail: "08 Aug 2026", done: true },
        { label: "Scan reviewed", detail: "10 Aug 2026", done: true },
        { label: "Provider response", detail: "11 Aug 2026", done: true },
        { label: "Approved", detail: "12 Aug 2026 · $184,500", done: true },
      ],
    },
    auction: [
      {
        Auction: "AUC-2026-08-A",
        Item: "ADX-S-04412",
        "Start Price": "$160,000",
        "Current Bid": "$184,500",
        Bids: 14,
        Ends: "21 Aug 2026",
        Status: "Active",
      },
    ],
    shipment: {
      id: "SHP-51204",
      items: [
        { label: "Shipment ID", value: "SHP-51204" },
        { label: "Provider", value: "Brinks Global" },
        { label: "Tracking", value: "BR-99120445" },
        { label: "Pickup", value: "Kinshasa Hub · 18 Aug 2026" },
        { label: "Destination", value: "Antwerp Vault" },
        { label: "Expected delivery", value: "24 Aug 2026" },
      ],
      steps: [
        { label: "Requested", detail: "16 Aug 2026", done: true },
        { label: "Picked up", detail: "18 Aug 2026", done: true },
        { label: "In transit", detail: "With carrier", done: true },
        { label: "Customs", detail: "Antwerp clearance", done: false },
        { label: "Delivered", detail: "Expected 24 Aug 2026", done: false },
      ],
    },
    payment: {
      items: [
        { label: "Payment ID", value: "PAY-30918" },
        { label: "Order", value: "ORD-11204" },
        { label: "Amount", value: "$184,500" },
        { label: "Expected settlement", value: "26 Aug 2026" },
        { label: "Status", value: "Pending" },
      ],
      breakdown: [
        { Component: "Government-regulated base payment", Amount: "$62,400", Share: "34%" },
        { Component: "Final market-price share", Amount: "$110,300", Share: "60%" },
        { Component: "Bonus / adjustment", Amount: "$9,850", Share: "5%" },
        { Component: "Other contractual distribution", Amount: "$1,950", Share: "1%" },
      ],
    },
    certificates: certRows("ADX-S-04412"),
    history: [
      { When: "04 Aug 2026 09:12", Actor: "J. Kabamba", Action: "Stone registered", Detail: "Barcode 8842-1194" },
      { When: "04 Aug 2026 09:14", Actor: "system", Action: "Stone ID issued", Detail: "ADX-S-04412" },
      { When: "05 Aug 2026 11:40", Actor: "J. Kabamba", Action: "Registration edited", Detail: "Carat 12.40 → 12.48" },
      { When: "09 Aug 2026 15:02", Actor: "ADEX Ops", Action: "Scan completed", Detail: "3D + spectral" },
      { When: "12 Aug 2026 10:20", Actor: "GemPrice", Action: "Valuation approved", Detail: "$184,500" },
    ],
  },
  {
    id: "ADX-S-04409",
    barcode: "8842-1188",
    carat: "8.02",
    classification: "Gem quality",
    origin: "Kono, Sierra Leone",
    seller: "Kono Cooperative",
    status: "Under Valuation",
    location: "Kinshasa Hub",
    lot: "ADX-L-0308",
    editable: true,
    registration: [
      { label: "Barcode", value: "8842-1188" },
      { label: "Weight / carat", value: "8.02 ct" },
      { label: "Classification", value: "Gem quality, macle" },
      { label: "Collection location", value: "Kono collection point" },
      { label: "Source reference", value: "KCO-COL-2026-0198" },
      { label: "Registered by", value: "Fatou Sesay · 06 Aug 2026" },
    ],
    lifecycle: [
      { label: "Submitted", detail: "06 Aug 2026", done: true },
      { label: "ADEX Stone ID issued", detail: "ADX-S-04409", done: true },
      { label: "Received", detail: "08 Aug 2026 · Kinshasa Hub", done: true },
      { label: "Scanned", detail: "Queued", done: false },
      { label: "Valued", detail: "Awaiting scan output", done: false },
      { label: "Listed", detail: "Not scheduled", done: false },
    ],
    valuation: {
      reference: "VAL-8836",
      status: "Under Review",
      items: [
        { label: "Valuation provider", value: "GemPrice Analytics (third party)" },
        { label: "Estimated value", value: "Pending" },
        { label: "Reference price", value: "$9,420 / ct (indicative)" },
        { label: "Requested", value: "10 Aug 2026" },
        { label: "Status", value: "Under Review" },
      ],
      history: [
        { label: "Submitted", detail: "10 Aug 2026", done: true },
        { label: "Scan queued", detail: "11 Aug 2026", done: true },
        { label: "Provider response", detail: "Awaiting", done: false },
        { label: "Approved", detail: "—", done: false },
      ],
    },
    auction: [],
    shipment: null,
    payment: null,
    certificates: [
      {
        Certificate: "—",
        Type: "Kimberley Process",
        Item: "ADX-S-04409",
        Issued: "—",
        Status: "Pending",
      },
    ],
    history: [
      { When: "06 Aug 2026 08:20", Actor: "F. Sesay", Action: "Stone registered", Detail: "Barcode 8842-1188" },
      { When: "08 Aug 2026 12:05", Actor: "ADEX Ops", Action: "Received", Detail: "Kinshasa Hub, cage 4" },
      { When: "10 Aug 2026 09:00", Actor: "F. Sesay", Action: "Valuation requested", Detail: "VAL-8836" },
    ],
  },
  {
    id: "ADX-S-04397",
    barcode: "8842-1170",
    carat: "5.61",
    classification: "Near gem",
    origin: "Mbuji-Mayi, DRC",
    seller: "Kasai Mining SARL",
    status: "Sold",
    location: "Delivered",
    lot: "—",
    editable: false,
    registration: [
      { label: "Barcode", value: "8842-1170" },
      { label: "Weight / carat", value: "5.61 ct" },
      { label: "Classification", value: "Near gem" },
      { label: "Collection location", value: "Mbuji-Mayi collection point" },
      { label: "Source reference", value: "KMS-COL-2026-0788" },
      { label: "Registered by", value: "Joseph Kabamba · 18 Jul 2026" },
    ],
    lifecycle: [
      { label: "Submitted", detail: "18 Jul 2026", done: true },
      { label: "ADEX Stone ID issued", detail: "ADX-S-04397", done: true },
      { label: "Received", detail: "21 Jul 2026", done: true },
      { label: "Scanned", detail: "23 Jul 2026", done: true },
      { label: "Valued", detail: "26 Jul 2026 · $41,900", done: true },
      { label: "Sold & delivered", detail: "15 Aug 2026 · Vermeulen Gems", done: true },
    ],
    valuation: {
      reference: "VAL-8790",
      status: "Approved",
      items: [
        { label: "Valuation provider", value: "GemPrice Analytics (third party)" },
        { label: "Estimated value", value: "$41,900" },
        { label: "Reference price", value: "$7,470 / ct" },
        { label: "Valuation date", value: "26 Jul 2026" },
        { label: "Status", value: "Approved" },
      ],
      history: [
        { label: "Submitted", detail: "23 Jul 2026", done: true },
        { label: "Provider response", detail: "25 Jul 2026", done: true },
        { label: "Approved", detail: "26 Jul 2026", done: true },
      ],
    },
    auction: [
      {
        Auction: "AUC-2026-07-B",
        Item: "ADX-S-04397",
        "Start Price": "$38,000",
        "Current Bid": "$41,900",
        Bids: 11,
        Ends: "02 Aug 2026",
        Status: "Sold",
      },
    ],
    shipment: {
      id: "SHP-51140",
      items: [
        { label: "Shipment ID", value: "SHP-51140" },
        { label: "Provider", value: "Brinks Global" },
        { label: "Tracking", value: "BR-99118820" },
        { label: "Destination", value: "Antwerp — Vermeulen Gems" },
        { label: "Delivered", value: "15 Aug 2026" },
      ],
      steps: [
        { label: "Requested", detail: "05 Aug 2026", done: true },
        { label: "Picked up", detail: "07 Aug 2026", done: true },
        { label: "Customs", detail: "Cleared 12 Aug 2026", done: true },
        { label: "Delivered", detail: "15 Aug 2026 · signed", done: true },
      ],
    },
    payment: {
      items: [
        { label: "Payment ID", value: "PAY-30877" },
        { label: "Order", value: "ORD-11150" },
        { label: "Amount", value: "$41,900" },
        { label: "Settled", value: "09 Aug 2026" },
        { label: "Status", value: "Completed" },
      ],
      breakdown: [
        { Component: "Government-regulated base payment", Amount: "$14,200", Share: "34%" },
        { Component: "Final market-price share", Amount: "$25,140", Share: "60%" },
        { Component: "Bonus / adjustment", Amount: "$2,560", Share: "6%" },
      ],
    },
    certificates: certRows("ADX-S-04397"),
    history: [
      { When: "18 Jul 2026 07:55", Actor: "J. Kabamba", Action: "Stone registered", Detail: "Barcode 8842-1170" },
      { When: "26 Jul 2026 14:10", Actor: "GemPrice", Action: "Valuation approved", Detail: "$41,900" },
      { When: "15 Aug 2026 16:32", Actor: "Brinks", Action: "Delivered", Detail: "Signed at Antwerp" },
    ],
  },
  {
    id: "ADX-S-04388",
    barcode: "8842-1163",
    carat: "3.24",
    classification: "Near gem",
    origin: "Tshikapa, DRC",
    seller: "Kasai Mining SARL",
    status: "Received",
    location: "Kinshasa Hub",
    lot: "—",
    editable: true,
    registration: [
      { label: "Barcode", value: "8842-1163" },
      { label: "Weight / carat", value: "3.24 ct" },
      { label: "Classification", value: "Near gem" },
      { label: "Collection location", value: "Tshikapa collection point" },
      { label: "Source reference", value: "KMS-COL-2026-0902" },
      { label: "Registered by", value: "Joseph Kabamba · 14 Aug 2026" },
    ],
    lifecycle: [
      { label: "Submitted", detail: "14 Aug 2026", done: true },
      { label: "ADEX Stone ID issued", detail: "ADX-S-04388", done: true },
      { label: "Received", detail: "16 Aug 2026 · Kinshasa Hub", done: true },
      { label: "Scanned", detail: "Pending", done: false },
      { label: "Valued", detail: "Draft", done: false },
      { label: "Listed", detail: "Not scheduled", done: false },
    ],
    valuation: null,
    auction: [],
    shipment: null,
    payment: null,
    certificates: [],
    history: [
      { When: "14 Aug 2026 10:02", Actor: "J. Kabamba", Action: "Stone registered", Detail: "Barcode 8842-1163" },
      { When: "16 Aug 2026 09:48", Actor: "ADEX Ops", Action: "Received", Detail: "Kinshasa Hub" },
    ],
  },
  {
    id: "ADX-S-04371",
    barcode: "8842-1140",
    carat: "19.77",
    classification: "Gem quality",
    origin: "Mbuji-Mayi, DRC",
    seller: "Kasai Mining SARL",
    status: "Unsold",
    location: "Antwerp Vault",
    lot: "—",
    editable: false,
    registration: [
      { label: "Barcode", value: "8842-1140" },
      { label: "Weight / carat", value: "19.77 ct" },
      { label: "Classification", value: "Gem quality" },
      { label: "Collection location", value: "Mbuji-Mayi collection point" },
      { label: "Source reference", value: "KMS-COL-2026-0655" },
      { label: "Registered by", value: "Joseph Kabamba · 02 Jul 2026" },
    ],
    lifecycle: [
      { label: "Submitted", detail: "02 Jul 2026", done: true },
      { label: "Received", detail: "06 Jul 2026", done: true },
      { label: "Scanned", detail: "09 Jul 2026", done: true },
      { label: "Valued", detail: "12 Jul 2026 · $240,000", done: true },
      { label: "Auction closed unsold", detail: "28 Jul 2026", done: true },
      { label: "Relisting", detail: "Price under revision", done: false },
    ],
    valuation: {
      reference: "VAL-8702",
      status: "Approved",
      items: [
        { label: "Valuation provider", value: "GemPrice Analytics (third party)" },
        { label: "Estimated value", value: "$240,000" },
        { label: "Reference price", value: "$12,140 / ct" },
        { label: "Valuation date", value: "12 Jul 2026" },
        { label: "Status", value: "Approved" },
      ],
      history: [
        { label: "Submitted", detail: "09 Jul 2026", done: true },
        { label: "Provider response", detail: "11 Jul 2026", done: true },
        { label: "Approved", detail: "12 Jul 2026", done: true },
        { label: "Revaluation requested", detail: "After unsold auction", done: false },
      ],
    },
    auction: [
      {
        Auction: "AUC-2026-07-C",
        Item: "ADX-S-04371",
        "Start Price": "$240,000",
        "Current Bid": "—",
        Bids: 0,
        Ends: "28 Jul 2026",
        Status: "Unsold",
      },
    ],
    shipment: null,
    payment: null,
    certificates: certRows("ADX-S-04371"),
    history: [
      { When: "02 Jul 2026 08:30", Actor: "J. Kabamba", Action: "Stone registered", Detail: "Barcode 8842-1140" },
      { When: "28 Jul 2026 17:00", Actor: "system", Action: "Auction closed", Detail: "Unsold" },
    ],
  },
];

export const lotRecords: LotRecord[] = [
  {
    id: "ADX-L-0312",
    name: "Mixed parcel — Kasai August",
    classification: "Gem / near gem mixed",
    stoneCount: 42,
    totalCarat: "63.10",
    estimatedValue: "$210,000",
    status: "Listed",
    seller: "Kasai Mining SARL",
    editable: false,
    registration: [
      { label: "Lot name", value: "Mixed parcel — Kasai August" },
      { label: "Classification", value: "Gem / near gem mixed" },
      { label: "Number of stones", value: "42" },
      { label: "Total carat", value: "63.10 ct" },
      { label: "Average carat", value: "1.50 ct" },
      { label: "Created", value: "05 Aug 2026 · Joseph Kabamba" },
    ],
    composition: [
      { "Stone ID": "ADX-S-04340", Carat: "1.82", Classification: "Gem", Status: "Included" },
      { "Stone ID": "ADX-S-04341", Carat: "2.10", Classification: "Gem", Status: "Included" },
      { "Stone ID": "ADX-S-04342", Carat: "1.44", Classification: "Near gem", Status: "Included" },
      { "Stone ID": "ADX-S-04343", Carat: "1.05", Classification: "Near gem", Status: "Included" },
    ],
    lifecycle: [
      { label: "Lot created", detail: "05 Aug 2026 · 42 stones", done: true },
      { label: "Submitted for valuation", detail: "06 Aug 2026", done: true },
      { label: "Valued", detail: "09 Aug 2026 · $210,000", done: true },
      { label: "Listed", detail: "AUC-2026-08-A", done: true },
      { label: "Sold", detail: "Auction in progress", done: false },
    ],
    valuation: {
      reference: "VAL-8838",
      status: "Approved",
      items: [
        { label: "Valuation provider", value: "GemPrice Analytics (third party)" },
        { label: "Estimated value", value: "$210,000" },
        { label: "Reference price", value: "$3,328 / ct" },
        { label: "Valuation date", value: "09 Aug 2026" },
        { label: "Status", value: "Approved" },
      ],
      history: [
        { label: "Submitted", detail: "06 Aug 2026", done: true },
        { label: "Provider response", detail: "08 Aug 2026", done: true },
        { label: "Approved", detail: "09 Aug 2026", done: true },
      ],
    },
    auction: [
      {
        Auction: "AUC-2026-08-A",
        Item: "ADX-L-0312",
        "Start Price": "$195,000",
        "Current Bid": "$210,000",
        Bids: 9,
        Ends: "21 Aug 2026",
        Status: "Active",
      },
    ],
    shipment: null,
    payment: {
      items: [
        { label: "Payment ID", value: "PAY-30918" },
        { label: "Order", value: "ORD-11188" },
        { label: "Amount", value: "$210,000" },
        { label: "Status", value: "Pending" },
      ],
      breakdown: [
        { Component: "Government-regulated base payment", Amount: "$71,400", Share: "34%" },
        { Component: "Final market-price share", Amount: "$126,000", Share: "60%" },
        { Component: "Bonus / adjustment", Amount: "$12,600", Share: "6%" },
      ],
    },
    certificates: certRows("ADX-L-0312"),
    history: [
      { When: "05 Aug 2026 09:00", Actor: "J. Kabamba", Action: "Lot created", Detail: "42 stones" },
      { When: "06 Aug 2026 10:15", Actor: "J. Kabamba", Action: "Lot edited", Detail: "2 stones removed" },
      { When: "09 Aug 2026 12:44", Actor: "GemPrice", Action: "Valuation approved", Detail: "$210,000" },
    ],
  },
  {
    id: "ADX-L-0308",
    name: "Kono cooperative parcel",
    classification: "Near gem",
    stoneCount: 18,
    totalCarat: "24.80",
    estimatedValue: "$74,500",
    status: "Under Valuation",
    seller: "Kono Cooperative",
    editable: true,
    registration: [
      { label: "Lot name", value: "Kono cooperative parcel" },
      { label: "Classification", value: "Near gem" },
      { label: "Number of stones", value: "18" },
      { label: "Total carat", value: "24.80 ct" },
      { label: "Average carat", value: "1.38 ct" },
      { label: "Created", value: "07 Aug 2026 · Fatou Sesay" },
    ],
    composition: [
      { "Stone ID": "ADX-S-04409", Carat: "8.02", Classification: "Gem", Status: "Included" },
      { "Stone ID": "ADX-S-04410", Carat: "1.22", Classification: "Near gem", Status: "Included" },
      { "Stone ID": "ADX-S-04411", Carat: "1.06", Classification: "Near gem", Status: "Included" },
    ],
    lifecycle: [
      { label: "Lot created", detail: "07 Aug 2026 · 18 stones", done: true },
      { label: "Submitted for valuation", detail: "10 Aug 2026", done: true },
      { label: "Valued", detail: "Awaiting provider", done: false },
      { label: "Listed", detail: "Not scheduled", done: false },
    ],
    valuation: {
      reference: "VAL-8836",
      status: "Under Review",
      items: [
        { label: "Valuation provider", value: "GemPrice Analytics (third party)" },
        { label: "Estimated value", value: "$74,500 (indicative)" },
        { label: "Reference price", value: "$3,004 / ct" },
        { label: "Requested", value: "10 Aug 2026" },
        { label: "Status", value: "Under Review" },
      ],
      history: [
        { label: "Submitted", detail: "10 Aug 2026", done: true },
        { label: "Provider response", detail: "Awaiting", done: false },
      ],
    },
    auction: [],
    shipment: null,
    payment: null,
    certificates: [],
    history: [
      { When: "07 Aug 2026 11:20", Actor: "F. Sesay", Action: "Lot created", Detail: "18 stones" },
      { When: "10 Aug 2026 08:05", Actor: "F. Sesay", Action: "Valuation requested", Detail: "VAL-8836" },
    ],
  },
  {
    id: "ADX-L-0299",
    name: "Industrial basket — July",
    classification: "Industrial",
    stoneCount: 66,
    totalCarat: "112.35",
    estimatedValue: "$318,900",
    status: "Sold",
    seller: "Kasai Mining SARL",
    editable: false,
    registration: [
      { label: "Lot name", value: "Industrial basket — July" },
      { label: "Classification", value: "Industrial" },
      { label: "Number of stones", value: "66" },
      { label: "Total carat", value: "112.35 ct" },
      { label: "Average carat", value: "1.70 ct" },
      { label: "Created", value: "02 Jul 2026 · Joseph Kabamba" },
    ],
    composition: [
      { "Stone ID": "ADX-S-04301", Carat: "2.44", Classification: "Industrial", Status: "Included" },
      { "Stone ID": "ADX-S-04302", Carat: "1.98", Classification: "Industrial", Status: "Included" },
    ],
    lifecycle: [
      { label: "Lot created", detail: "02 Jul 2026", done: true },
      { label: "Valued", detail: "10 Jul 2026 · $318,900", done: true },
      { label: "Sold", detail: "AUC-2026-07-A", done: true },
      { label: "Paid", detail: "01 Aug 2026", done: true },
    ],
    valuation: {
      reference: "VAL-8688",
      status: "Approved",
      items: [
        { label: "Valuation provider", value: "GemPrice Analytics (third party)" },
        { label: "Estimated value", value: "$318,900" },
        { label: "Reference price", value: "$2,838 / ct" },
        { label: "Valuation date", value: "10 Jul 2026" },
        { label: "Status", value: "Approved" },
      ],
      history: [
        { label: "Submitted", detail: "05 Jul 2026", done: true },
        { label: "Approved", detail: "10 Jul 2026", done: true },
      ],
    },
    auction: [
      {
        Auction: "AUC-2026-07-A",
        Item: "ADX-L-0299",
        "Start Price": "$300,000",
        "Current Bid": "$318,900",
        Bids: 21,
        Ends: "24 Jul 2026",
        Status: "Sold",
      },
    ],
    shipment: {
      id: "SHP-51101",
      items: [
        { label: "Shipment ID", value: "SHP-51101" },
        { label: "Provider", value: "Malca-Amit" },
        { label: "Tracking", value: "MA-77338814" },
        { label: "Destination", value: "Dubai DMCC" },
        { label: "Delivered", value: "05 Aug 2026" },
      ],
      steps: [
        { label: "Requested", detail: "26 Jul 2026", done: true },
        { label: "Picked up", detail: "28 Jul 2026", done: true },
        { label: "Delivered", detail: "05 Aug 2026", done: true },
      ],
    },
    payment: {
      items: [
        { label: "Payment ID", value: "PAY-30840" },
        { label: "Order", value: "ORD-11088" },
        { label: "Amount", value: "$318,900" },
        { label: "Settled", value: "01 Aug 2026" },
        { label: "Status", value: "Completed" },
      ],
      breakdown: [
        { Component: "Government-regulated base payment", Amount: "$108,400", Share: "34%" },
        { Component: "Final market-price share", Amount: "$191,340", Share: "60%" },
        { Component: "Bonus / adjustment", Amount: "$19,160", Share: "6%" },
      ],
    },
    certificates: certRows("ADX-L-0299"),
    history: [
      { When: "02 Jul 2026 08:00", Actor: "J. Kabamba", Action: "Lot created", Detail: "66 stones" },
      { When: "24 Jul 2026 17:00", Actor: "system", Action: "Auction closed", Detail: "Sold $318,900" },
    ],
  },
];

export function findStone(id: string) {
  return stoneRecords.find((s) => s.id === id);
}

export function findLot(id: string) {
  return lotRecords.find((l) => l.id === id);
}

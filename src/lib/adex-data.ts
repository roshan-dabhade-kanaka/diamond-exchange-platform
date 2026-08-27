export type Row = Record<string, string | number>;

export const categories = [
  { id: "C162405", name: "Rough diamonds", count: 128 },
  { id: "C161847", name: "Baskets of diamonds", count: 24 },
  { id: "C161848", name: "Parcels of diamonds", count: 41 },
  { id: "C162406", name: "Cutting and polishing options", count: 16 },
];

export type Listing = {
  id: string;
  title: string;
  carat: string;
  category: string;
  currentBid: string;
  estimate: string;
  endsIn: string;
  origin: string;
  status: string;
};

export const listings: Listing[] = [

  {
    id: "ADX-S-04412",
    title: "Rough diamond, gem quality",
    carat: "12.48 ct",
    category: "Rough diamonds",
    currentBid: "$184,500",
    estimate: "$160,000 – $210,000",
    endsIn: "2d 14h",
    origin: "Mbuji-Mayi, DRC",
    status: "Active",
  },
  {
    id: "ADX-S-04409",
    title: "Rough diamond, octahedron",
    carat: "8.02 ct",
    category: "Rough diamonds",
    currentBid: "$96,200",
    estimate: "$88,000 – $120,000",
    endsIn: "1d 03h",
    origin: "Kono, Sierra Leone",
    status: "Ending",
  },
  {
    id: "ADX-L-0312",
    title: "Parcel — 42 stones, mixed",
    carat: "63.10 ct",
    category: "Parcels of diamonds",
    currentBid: "$210,000",
    estimate: "$195,000 – $240,000",
    endsIn: "4d 09h",
    origin: "Tshikapa, DRC",
    status: "Active",
  },
  {
    id: "ADX-L-0299",
    title: "Basket — industrial grade",
    carat: "310.75 ct",
    category: "Baskets of diamonds",
    currentBid: "$74,800",
    estimate: "$70,000 – $95,000",
    endsIn: "6d 21h",
    origin: "Kenema, Sierra Leone",
    status: "Scheduled",
  },
  {
    id: "ADX-L-0308",
    title: "Cutting & polishing allocation",
    carat: "— ",
    category: "Cutting and polishing options",
    currentBid: "$18,400",
    estimate: "$15,000 – $25,000",
    endsIn: "3d 02h",
    origin: "Antwerp partner",
    status: "Active",
  },
  {
    id: "ADX-S-04397",
    title: "Rough diamond, macle",
    carat: "5.61 ct",
    category: "Rough diamonds",
    currentBid: "$41,900",
    estimate: "$38,000 – $52,000",
    endsIn: "5d 11h",
    origin: "Mbuji-Mayi, DRC",
    status: "Active",
  },
];

export const sellerKpis = [
  { label: "Total Stones", value: "1,284" },
  { label: "Total Lots", value: "96" },
  { label: "Under Valuation", value: "37" },
  { label: "Active Listings", value: "58" },
  { label: "Active Auctions", value: "12" },
  { label: "Sold Stones", value: "742" },
  { label: "Pending Payments", value: "$412,900" },
  { label: "Active Shipments", value: "9" },
];

export const buyerKpis = [
  { label: "Active Bids", value: "23" },
  { label: "Winning Bids", value: "7" },
  { label: "Orders", value: "41" },
  { label: "Pending Payments", value: "$88,400" },
  { label: "Active Shipments", value: "5" },
  { label: "Watchlist", value: "18" },
];

export const adminKpis = [
  { label: "Buyers", value: "612" },
  { label: "Sellers", value: "248" },
  { label: "Active Stones", value: "4,918" },
  { label: "Lots", value: "384" },
  { label: "Live Auctions", value: "26" },
  { label: "KYC Pending", value: "34" },
  { label: "AML Cases", value: "6" },
  { label: "Revenue (MTD)", value: "$7.42M" },
];

export const sellerStones: Row[] = [
  {
    "Stone ID": "ADX-S-04412",
    Barcode: "8842-1194",
    Carat: "12.48",
    Status: "Listed",
    Location: "Antwerp Vault",
    Valuation: "Approved",
    Auction: "Active",
    Certification: "Issued",
  },
  {
    "Stone ID": "ADX-S-04409",
    Barcode: "8842-1188",
    Carat: "8.02",
    Status: "Under Valuation",
    Location: "Kinshasa Hub",
    Valuation: "Under Review",
    Auction: "—",
    Certification: "Pending",
  },
  {
    "Stone ID": "ADX-S-04397",
    Barcode: "8842-1170",
    Carat: "5.61",
    Status: "Sold",
    Location: "Delivered",
    Valuation: "Approved",
    Auction: "Completed",
    Certification: "Issued",
  },
  {
    "Stone ID": "ADX-S-04388",
    Barcode: "8842-1163",
    Carat: "3.24",
    Status: "Received",
    Location: "Kinshasa Hub",
    Valuation: "Draft",
    Auction: "—",
    Certification: "—",
  },
  {
    "Stone ID": "ADX-S-04371",
    Barcode: "8842-1140",
    Carat: "19.77",
    Status: "Unsold",
    Location: "Antwerp Vault",
    Valuation: "Approved",
    Auction: "Relisted",
    Certification: "Issued",
  },
];

export const sellerLots: Row[] = [
  {
    "Lot ID": "ADX-L-0312",
    Classification: "Gem / near gem",
    Stones: 42,
    "Total Carat": "63.10",
    "Estimated Value": "$210,000",
    Status: "Listed",
    Auction: "Active",
    Sale: "Pending",
  },
  {
    "Lot ID": "ADX-L-0308",
    Classification: "Near gem",
    Stones: 18,
    "Total Carat": "24.80",
    "Estimated Value": "$74,500",
    Status: "Under Valuation",
    Auction: "—",
    Sale: "—",
  },
  {
    "Lot ID": "ADX-L-0299",
    Classification: "Industrial",
    Stones: 66,
    "Total Carat": "112.35",
    "Estimated Value": "$318,900",
    Status: "Sold",
    Auction: "Completed",
    Sale: "Paid",
  },
];

export const valuations: Row[] = [
  {
    Reference: "VAL-8841",
    Item: "ADX-S-04412",
    "Estimated Value": "$184,500",
    "Reference Price": "$14,780 / ct",
    Date: "12 Aug 2026",
    Status: "Approved",
  },
  {
    Reference: "VAL-8836",
    Item: "ADX-L-0308",
    "Estimated Value": "$74,500",
    "Reference Price": "$3,004 / ct",
    Date: "10 Aug 2026",
    Status: "Under Review",
  },
  {
    Reference: "VAL-8829",
    Item: "ADX-S-04388",
    "Estimated Value": "—",
    "Reference Price": "—",
    Date: "08 Aug 2026",
    Status: "Submitted",
  },
];

export const auctionsRows: Row[] = [
  {
    Auction: "AUC-2026-08-A",
    Item: "ADX-S-04412",
    "Start Price": "$160,000",
    "Current Bid": "$184,500",
    Bids: 14,
    Ends: "21 Aug 2026",
    Status: "Active",
  },
  {
    Auction: "AUC-2026-08-A",
    Item: "ADX-L-0312",
    "Start Price": "$195,000",
    "Current Bid": "$210,000",
    Bids: 9,
    Ends: "21 Aug 2026",
    Status: "Active",
  },
  {
    Auction: "AUC-2026-07-C",
    Item: "ADX-S-04371",
    "Start Price": "$240,000",
    "Current Bid": "—",
    Bids: 0,
    Ends: "28 Jul 2026",
    Status: "Unsold",
  },
];

export const shipments: Row[] = [
  {
    "Shipment ID": "SHP-51204",
    Provider: "Brinks",
    Origin: "Kinshasa Hub",
    Destination: "Antwerp Vault",
    Tracking: "BR-99120445",
    "Expected Delivery": "24 Aug 2026",
    Status: "In Transit",
  },
  {
    "Shipment ID": "SHP-51188",
    Provider: "Malca-Amit",
    Origin: "Antwerp Vault",
    Destination: "Dubai DMCC",
    Tracking: "MA-77340192",
    "Expected Delivery": "22 Aug 2026",
    Status: "Customs",
  },
  {
    "Shipment ID": "SHP-51140",
    Provider: "Brinks",
    Origin: "Kenema",
    Destination: "Kinshasa Hub",
    Tracking: "BR-99118820",
    "Expected Delivery": "15 Aug 2026",
    Status: "Delivered",
  },
];

export const payments: Row[] = [
  {
    "Payment ID": "PAY-30918",
    Reference: "ORD-11204",
    Item: "ADX-S-04412",
    Amount: "$184,500",
    Type: "Market-price share",
    Date: "18 Aug 2026",
    Status: "Pending",
  },
  {
    "Payment ID": "PAY-30902",
    Reference: "ORD-11188",
    Item: "ADX-L-0312",
    Amount: "$62,400",
    Type: "Regulated base payment",
    Date: "14 Aug 2026",
    Status: "Completed",
  },
  {
    "Payment ID": "PAY-30877",
    Reference: "ORD-11150",
    Item: "ADX-S-04397",
    Amount: "$9,850",
    Type: "Bonus adjustment",
    Date: "09 Aug 2026",
    Status: "Completed",
  },
];

export const certificates: Row[] = [
  {
    Certificate: "KP-4471902",
    Type: "Kimberley Process",
    Item: "ADX-S-04412",
    Issued: "12 Aug 2026",
    Status: "Valid",
  },
  {
    Certificate: "GR-2280114",
    Type: "Grading",
    Item: "ADX-S-04412",
    Issued: "13 Aug 2026",
    Status: "Valid",
  },
  {
    Certificate: "KP-4471880",
    Type: "Kimberley Process",
    Item: "ADX-L-0312",
    Issued: "07 Aug 2026",
    Status: "Valid",
  },
];

export const notifications = [
  {
    title: "Valuation completed",
    body: "ADX-S-04412 valued at $184,500.",
    time: "2 hours ago",
    tone: "info",
  },
  {
    title: "Auction started",
    body: "AUC-2026-08-A is now live with 2 of your items.",
    time: "6 hours ago",
    tone: "success",
  },
  {
    title: "Document required",
    body: "Address proof expires in 14 days — upload a new copy.",
    time: "Yesterday",
    tone: "warning",
  },
  {
    title: "Stone received",
    body: "ADX-S-04388 received at Kinshasa Hub.",
    time: "2 days ago",
    tone: "info",
  },
  {
    title: "Payment completed",
    body: "PAY-30902 of $62,400 settled to your account.",
    time: "5 days ago",
    tone: "success",
  },
];

export const pendingActions = [
  {
    title: "Complete AML declaration",
    detail: "Required before the next auction cycle.",
    cta: "Complete",
  },
  { title: "Review valuation VAL-8836", detail: "Awaiting your acknowledgement.", cta: "Review" },
  {
    title: "Upload banking documentation",
    detail: "Bank letter missing for settlement.",
    cta: "Upload",
  },
];

export const buyerBids: Row[] = [
  {
    "Bid ID": "BID-77210",
    Item: "ADX-S-04412",
    "My Bid": "$184,500",
    "Current Bid": "$184,500",
    Ends: "21 Aug 2026",
    Status: "Leading",
  },
  {
    "Bid ID": "BID-77198",
    Item: "ADX-L-0312",
    "My Bid": "$204,000",
    "Current Bid": "$210,000",
    Ends: "21 Aug 2026",
    Status: "Outbid",
  },
  {
    "Bid ID": "BID-77102",
    Item: "ADX-S-04397",
    "My Bid": "$41,900",
    "Current Bid": "$41,900",
    Ends: "02 Aug 2026",
    Status: "Won",
  },
];

export const orders: Row[] = [
  {
    "Order ID": "ORD-11204",
    Item: "ADX-S-04412",
    Seller: "Kasai Mining SARL",
    Amount: "$184,500",
    Payment: "Pending",
    Shipment: "Not started",
    Status: "Awaiting Payment",
  },
  {
    "Order ID": "ORD-11188",
    Item: "ADX-L-0312",
    Seller: "Kono Cooperative",
    Amount: "$210,000",
    Payment: "Paid",
    Shipment: "In Transit",
    Status: "Processing",
  },
  {
    "Order ID": "ORD-11150",
    Item: "ADX-S-04397",
    Seller: "Kasai Mining SARL",
    Amount: "$41,900",
    Payment: "Paid",
    Shipment: "Delivered",
    Status: "Completed",
  },
];

export const returnsRows: Row[] = [
  {
    "Return ID": "RET-2041",
    Order: "ORD-11150",
    Item: "ADX-S-04397",
    Reason: "Grading mismatch",
    Raised: "10 Aug 2026",
    Status: "Under Review",
  },
  {
    "Return ID": "RET-2033",
    Order: "ORD-11088",
    Item: "ADX-S-04301",
    Reason: "Damaged in transit",
    Raised: "02 Aug 2026",
    Status: "Resolved",
  },
];

export const adminUsers: Row[] = [
  {
    User: "Amina Diallo",
    Email: "amina@kasaimining.cd",
    Role: "Seller Admin",
    Organization: "Kasai Mining SARL",
    "Last Active": "Today",
    Status: "Active",
  },
  {
    User: "Marc Vermeulen",
    Email: "marc@vermeulen-gems.be",
    Role: "Buyer",
    Organization: "Vermeulen Gems",
    "Last Active": "Yesterday",
    Status: "Active",
  },
  {
    User: "Fatou Sesay",
    Email: "fatou@konocoop.sl",
    Role: "Seller",
    Organization: "Kono Cooperative",
    "Last Active": "3 days ago",
    Status: "Suspended",
  },
  {
    User: "Rahul Mehta",
    Email: "rahul@adex.io",
    Role: "Compliance Admin",
    Organization: "ADEX",
    "Last Active": "Today",
    Status: "Active",
  },
];

export const kycCases: Row[] = [
  {
    "Case ID": "KYC-9012",
    Applicant: "Kasai Mining SARL",
    Type: "Seller",
    "Risk Level": "Medium",
    Reviewer: "R. Mehta",
    Submitted: "14 Aug 2026",
    Status: "Under Review",
  },
  {
    "Case ID": "KYC-9008",
    Applicant: "Vermeulen Gems",
    Type: "Buyer",
    "Risk Level": "Low",
    Reviewer: "R. Mehta",
    Submitted: "12 Aug 2026",
    Status: "Approved",
  },
  {
    "Case ID": "AML-4402",
    Applicant: "Kono Cooperative",
    Type: "Seller",
    "Risk Level": "High",
    Reviewer: "L. Okafor",
    Submitted: "09 Aug 2026",
    Status: "Escalated",
  },
];

export const adminStones: Row[] = [
  {
    "Stone ID": "ADX-S-04412",
    Seller: "Kasai Mining SARL",
    Carat: "12.48",
    Lot: "—",
    Location: "Antwerp Vault",
    Scan: "Complete",
    Valuation: "Approved",
    Status: "Listed",
  },
  {
    "Stone ID": "ADX-S-04409",
    Seller: "Kono Cooperative",
    Carat: "8.02",
    Lot: "ADX-L-0308",
    Location: "Kinshasa Hub",
    Scan: "Queued",
    Valuation: "Under Review",
    Status: "Processing",
  },
  {
    "Stone ID": "ADX-S-04388",
    Seller: "Kasai Mining SARL",
    Carat: "3.24",
    Lot: "—",
    Location: "Kinshasa Hub",
    Scan: "Pending",
    Valuation: "Draft",
    Status: "Received",
  },
];

export const partners: Row[] = [
  {
    Partner: "FOMIN Facility A",
    Type: "Funding",
    Country: "DRC",
    Exposure: "$2.10M",
    Settlement: "Monthly",
    Status: "Active",
  },
  {
    Partner: "Brinks Global",
    Type: "Logistics",
    Country: "Belgium",
    Exposure: "—",
    Settlement: "Per shipment",
    Status: "Active",
  },
  {
    Partner: "Antwerp Cutting House",
    Type: "Processing",
    Country: "Belgium",
    Exposure: "$340K",
    Settlement: "Quarterly",
    Status: "Review",
  },
];

export const auditLogs: Row[] = [
  {
    Timestamp: "19 Aug 2026 09:41",
    Actor: "R. Mehta",
    Action: "kyc.approve",
    Entity: "KYC-9008",
    IP: "41.79.22.10",
    Result: "Success",
  },
  {
    Timestamp: "19 Aug 2026 08:12",
    Actor: "system",
    Action: "auction.close",
    Entity: "AUC-2026-07-C",
    IP: "—",
    Result: "Success",
  },
  {
    Timestamp: "18 Aug 2026 17:55",
    Actor: "L. Okafor",
    Action: "user.suspend",
    Entity: "fatou@konocoop.sl",
    IP: "41.79.22.44",
    Result: "Success",
  },
  {
    Timestamp: "18 Aug 2026 16:03",
    Actor: "A. Diallo",
    Action: "stone.create",
    Entity: "ADX-S-04412",
    IP: "197.14.8.2",
    Result: "Success",
  },
];

export const revenueSeries = [
  { period: "Mar", revenue: 4.1, volume: 210 },
  { period: "Apr", revenue: 5.2, volume: 248 },
  { period: "May", revenue: 4.8, volume: 232 },
  { period: "Jun", revenue: 6.4, volume: 288 },
  { period: "Jul", revenue: 6.9, volume: 301 },
  { period: "Aug", revenue: 7.4, volume: 326 },
];

/* ---------- Unified buyer journey (bid -> pay -> certify -> ship -> deliver) ---------- */

export const journeyStages = [
  "Auction won",
  "Payment",
  "Certification",
  "Shipment",
  "Delivered",
] as const;

export type Purchase = {
  orderId: string;
  stoneId: string;
  title: string;
  seller: string;
  amount: string;
  stage: number;
  nextStep: string;
  nextDetail: string;
};

export const purchases: Purchase[] = [
  {
    orderId: "ORD-11204",
    stoneId: "ADX-S-04412",
    title: "Rough diamond, gem quality · 12.48 ct",
    seller: "Kasai Mining SARL",
    amount: "$189,220",
    stage: 1,
    nextStep: "Payment due 22 Aug 2026",
    nextDetail: "Wire transfer · invoice INV-20411",
  },
  {
    orderId: "ORD-11188",
    stoneId: "ADX-L-0312",
    title: "Parcel — 42 stones, mixed · 63.10 ct",
    seller: "Kono Cooperative",
    amount: "$215,600",
    stage: 3,
    nextStep: "In transit · Malca-Amit MA-77340192",
    nextDetail: "Customs clearance Dubai DMCC · ETA 22 Aug 2026",
  },
  {
    orderId: "ORD-11150",
    stoneId: "ADX-S-04397",
    title: "Rough diamond, macle · 5.61 ct",
    seller: "Kasai Mining SARL",
    amount: "$43,110",
    stage: 4,
    nextStep: "Delivered 15 Aug 2026",
    nextDetail: "Signed for at Antwerp · certificates transferred",
  },
];

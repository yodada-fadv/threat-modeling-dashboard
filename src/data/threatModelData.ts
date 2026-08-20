// Sample/placeholder data modeled on the "Information Security: Threat Modeling Program"
// (STRIDE framework) and the real product list from the ProdDev ADO wiki.
// Replace with a live query (e.g., ADO REST API / work item query) when available.

export type ThreatModelStatus =
  | "Not Started"
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Needs Follow-up";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface ProductThreatModel {
  id: string;
  product: string;
  owner: string;
  status: ThreatModelStatus;
  riskLevel: RiskLevel;
  lastReviewDate: string | null;
  openFindings: number;
  closedFindings: number;
}

export const products: ProductThreatModel[] = [
  { id: "clienthub", product: "ClientHub Team Torvalds", owner: "Des Suydam", status: "Completed", riskLevel: "Medium", lastReviewDate: "2026-05-12", openFindings: 2, closedFindings: 9 },
  { id: "candidatehub", product: "Candidate Hub", owner: "Unassigned", status: "In Progress", riskLevel: "High", lastReviewDate: "2026-06-30", openFindings: 5, closedFindings: 3 },
  { id: "fadvid", product: "FADV ID", owner: "Unassigned", status: "Completed", riskLevel: "Low", lastReviewDate: "2026-04-02", openFindings: 0, closedFindings: 6 },
  { id: "personservice", product: "Person Service", owner: "Unassigned", status: "Needs Follow-up", riskLevel: "High", lastReviewDate: "2026-03-18", openFindings: 4, closedFindings: 7 },
  { id: "switchplatform", product: "Switch Platform Architecture", owner: "Unassigned", status: "Scheduled", riskLevel: "Medium", lastReviewDate: null, openFindings: 0, closedFindings: 0 },
  { id: "printscan", product: "PrintScan", owner: "Unassigned", status: "Not Started", riskLevel: "Medium", lastReviewDate: null, openFindings: 0, closedFindings: 0 },
  { id: "coreservices", product: "Core Services", owner: "Unassigned", status: "In Progress", riskLevel: "Critical", lastReviewDate: "2026-07-01", openFindings: 7, closedFindings: 2 },
  { id: "faintegrations", product: "FA Integrations", owner: "Unassigned", status: "Completed", riskLevel: "Low", lastReviewDate: "2026-02-20", openFindings: 1, closedFindings: 11 },
  { id: "risqamya", product: "RISQ-AMYA", owner: "Unassigned", status: "Not Started", riskLevel: "Medium", lastReviewDate: null, openFindings: 0, closedFindings: 0 },
  { id: "sipplatform", product: "SIP Platform", owner: "Unassigned", status: "Completed", riskLevel: "Medium", lastReviewDate: "2026-05-28", openFindings: 3, closedFindings: 8 },
  { id: "sipecosystem", product: "SIP Ecosystem", owner: "Unassigned", status: "Scheduled", riskLevel: "Medium", lastReviewDate: null, openFindings: 0, closedFindings: 0 },
  { id: "inboundworkqueue", product: "Inbound Work Queue", owner: "Unassigned", status: "Not Started", riskLevel: "Low", lastReviewDate: null, openFindings: 0, closedFindings: 0 },
  { id: "tax", product: "TAX", owner: "Unassigned", status: "In Progress", riskLevel: "High", lastReviewDate: "2026-06-15", openFindings: 6, closedFindings: 1 },
  { id: "fingerprintadvantage", product: "Fingerprint Advantage", owner: "Unassigned", status: "Completed", riskLevel: "Low", lastReviewDate: "2026-01-10", openFindings: 0, closedFindings: 5 },
  { id: "wellnessreports", product: "Wellness Reports", owner: "Unassigned", status: "Not Started", riskLevel: "Low", lastReviewDate: null, openFindings: 0, closedFindings: 0 },
  { id: "siptoea", product: "SIP to EA Integration", owner: "Unassigned", status: "Needs Follow-up", riskLevel: "High", lastReviewDate: "2026-04-22", openFindings: 3, closedFindings: 4 },
  { id: "dohs", product: "DOHS", owner: "Unassigned", status: "Scheduled", riskLevel: "Medium", lastReviewDate: null, openFindings: 0, closedFindings: 0 },
  { id: "faanalytics", product: "FA Analytics", owner: "Unassigned", status: "In Progress", riskLevel: "Medium", lastReviewDate: "2026-07-10", openFindings: 2, closedFindings: 2 },
];

export interface StrideFinding {
  category: "Spoofing" | "Tampering" | "Repudiation" | "Information Disclosure" | "Denial of Service" | "Elevation of Privilege";
  open: number;
  closed: number;
}

export const strideFindings: StrideFinding[] = [
  { category: "Spoofing", open: 4, closed: 8 },
  { category: "Tampering", open: 3, closed: 6 },
  { category: "Repudiation", open: 2, closed: 4 },
  { category: "Information Disclosure", open: 6, closed: 9 },
  { category: "Denial of Service", open: 5, closed: 3 },
  { category: "Elevation of Privilege", open: 3, closed: 7 },
];

export const guidingPrinciples: string[] = [
  "Security is a shared responsibility.",
  "Early engagement is better than late remediation.",
  "Pragmatic risk-based decisions over theoretical perfection.",
];

export const strideReference: { code: string; name: string; description: string; example: string }[] = [
  { code: "S", name: "Spoofing", description: "Impersonating users or systems", example: "Stolen credentials used to log in" },
  { code: "T", name: "Tampering", description: "Unauthorized modification of data", example: "Altering data in transit or storage" },
  { code: "R", name: "Repudiation", description: "Denying actions without traceability", example: "No audit logs for critical actions" },
  { code: "I", name: "Information Disclosure", description: "Exposure of sensitive data", example: "Leaking PII or secrets" },
  { code: "D", name: "Denial of Service", description: "Disrupting system availability", example: "Overloading APIs or services" },
  { code: "E", name: "Elevation of Privilege", description: "Gaining unauthorized access", example: "User gaining admin rights" },
];

// Per-system drill-down detail, modeled on the Threat Model Document Template
// (Product Overview, Components/Connections, Threat Catalog, Risk Assessment, Change Log).
// Only systems with a held session have detail; others show a "no session yet" state.

export interface SystemMitigation {
  finding: string;
  strideCategory: StrideFinding["category"];
  mitigation: string;
  status: "Open" | "Mitigated" | "Accepted Risk";
}

export interface SystemChangeLogEntry {
  date: string;
  change: string;
}

export interface SystemDetail {
  description: string;
  components: string[];
  strideBreakdown: { category: StrideFinding["category"]; open: number; closed: number }[];
  mitigations: SystemMitigation[];
  changeLog: SystemChangeLogEntry[];
}

export const systemDetails: Record<string, SystemDetail> = {
  clienthub: {
    description: "Client-facing portal for background check ordering and status tracking.",
    components: ["Web front-end", "Order API", "Client identity provider", "PostgreSQL order store"],
    strideBreakdown: [
      { category: "Spoofing", open: 0, closed: 2 },
      { category: "Information Disclosure", open: 2, closed: 3 },
      { category: "Tampering", open: 0, closed: 4 },
    ],
    mitigations: [
      { finding: "Session tokens do not expire on password reset", strideCategory: "Spoofing", mitigation: "Invalidate active sessions on credential change", status: "Mitigated" },
      { finding: "Order status API returns full PII payload", strideCategory: "Information Disclosure", mitigation: "Field-level response filtering by role", status: "Open" },
    ],
    changeLog: [
      { date: "2026-05-12", change: "Threat model completed with InfoSec." },
      { date: "2026-05-20", change: "Session invalidation fix deployed to production." },
    ],
  },
  candidatehub: {
    description: "Candidate-facing hub for application submission and document upload.",
    components: ["React SPA", "Document upload service", "Blob storage", "Notification service"],
    strideBreakdown: [
      { category: "Information Disclosure", open: 3, closed: 1 },
      { category: "Denial of Service", open: 2, closed: 2 },
    ],
    mitigations: [
      { finding: "Uploaded documents stored without encryption at rest", strideCategory: "Information Disclosure", mitigation: "Enable storage-level encryption + access logging", status: "Open" },
      { finding: "No rate limiting on document upload endpoint", strideCategory: "Denial of Service", mitigation: "Add per-user rate limiting", status: "Open" },
    ],
    changeLog: [
      { date: "2026-06-30", change: "In-progress session with security team; findings captured." },
    ],
  },
  personservice: {
    description: "Core service resolving person identity records across products.",
    components: ["Person API", "Identity matching engine", "SQL Server", "Internal service mesh"],
    strideBreakdown: [
      { category: "Information Disclosure", open: 2, closed: 4 },
      { category: "Elevation of Privilege", open: 2, closed: 3 },
    ],
    mitigations: [
      { finding: "Internal service-to-service calls lack mutual TLS", strideCategory: "Elevation of Privilege", mitigation: "Roll out mTLS across service mesh", status: "Open" },
      { finding: "Debug endpoint exposes raw person records", strideCategory: "Information Disclosure", mitigation: "Remove/restrict debug endpoint in production", status: "Open" },
    ],
    changeLog: [
      { date: "2026-03-18", change: "Threat model session held; flagged for follow-up." },
    ],
  },
  coreservices: {
    description: "Shared backend platform providing auth, config, and workflow orchestration.",
    components: ["Auth service", "Workflow engine", "Config service", "Message bus"],
    strideBreakdown: [
      { category: "Elevation of Privilege", open: 3, closed: 1 },
      { category: "Tampering", open: 2, closed: 1 },
      { category: "Denial of Service", open: 2, closed: 0 },
    ],
    mitigations: [
      { finding: "Message bus accepts unsigned messages", strideCategory: "Tampering", mitigation: "Require message signing for all publishers", status: "Open" },
      { finding: "Admin role assignable via API without approval", strideCategory: "Elevation of Privilege", mitigation: "Add approval workflow for role elevation", status: "Open" },
      { finding: "No throttling on workflow trigger endpoint", strideCategory: "Denial of Service", mitigation: "Add throttling + queueing", status: "Open" },
    ],
    changeLog: [
      { date: "2026-07-01", change: "Session in progress; critical risk flagged to leadership." },
    ],
  },
};


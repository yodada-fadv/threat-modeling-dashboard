import type { ProductThreatModel } from "../data/threatModelData";
import { RiskDistributionChart } from "./RiskDistributionChart";

interface StakeholderOverviewProps {
  products: ProductThreatModel[];
  onSelect: (product: ProductThreatModel) => void;
}

const statusClass: Record<ProductThreatModel["status"], string> = {
  "Not Started": "badge badge-neutral",
  Scheduled: "badge badge-info",
  "In Progress": "badge badge-warning",
  Completed: "badge badge-success",
  "Needs Follow-up": "badge badge-danger",
};

const riskClass: Record<ProductThreatModel["riskLevel"], string> = {
  Low: "badge badge-success",
  Medium: "badge badge-warning",
  High: "badge badge-danger",
  Critical: "badge badge-critical",
};

function programHealth(products: ProductThreatModel[]): { label: string; className: string } {
  const criticalOrHighNeedingAttention = products.filter(
    (p) =>
      (p.riskLevel === "Critical" || p.riskLevel === "High") &&
      (p.status === "Needs Follow-up" || p.status === "In Progress"),
  ).length;

  if (criticalOrHighNeedingAttention >= 3) return { label: "At Risk", className: "health-red" };
  if (criticalOrHighNeedingAttention >= 1) return { label: "Attention Needed", className: "health-yellow" };
  return { label: "On Track", className: "health-green" };
}

export function StakeholderOverview({ products, onSelect }: StakeholderOverviewProps) {
  const total = products.length;
  const completed = products.filter((p) => p.status === "Completed").length;
  const coveragePct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const health = programHealth(products);

  const needsAttention = products
    .filter((p) => p.status === "Needs Follow-up" || p.riskLevel === "Critical")
    .sort((a, b) => b.openFindings - a.openFindings)
    .slice(0, 5);

  return (
    <>
      <div className="stakeholder-top">
        <div className="panel health-panel">
          <h2>Program Health</h2>
          <div className={`health-badge ${health.className}`}>{health.label}</div>
          <p className="health-note">
            Based on high/critical-risk systems that are still in progress or need follow-up.
          </p>
        </div>

        <div className="panel coverage-panel">
          <h2>Threat Modeling Coverage</h2>
          <div className="coverage-value">{coveragePct}%</div>
          <div className="coverage-bar">
            <div className="coverage-bar-fill" style={{ width: `${coveragePct}%` }} />
          </div>
          <p className="health-note">
            {completed} of {total} systems have a completed threat model.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <RiskDistributionChart products={products} />

        <div className="panel">
          <h2>Systems Needing Attention</h2>
          {needsAttention.length === 0 ? (
            <p className="health-note">No systems currently flagged for follow-up.</p>
          ) : (
            <ul className="attention-list">
              {needsAttention.map((p) => (
                <li key={p.id} className="clickable-row" onClick={() => onSelect(p)}>
                  <span className="attention-product">{p.product}</span>
                  <span className={`badge ${p.riskLevel === "Critical" ? "badge-critical" : "badge-danger"}`}>
                    {p.riskLevel}
                  </span>
                  <span className="attention-findings">{p.openFindings} open finding{p.openFindings === 1 ? "" : "s"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="panel">
        <h2>What This Program Delivers</h2>
        <p className="health-note">
          Threat modeling identifies, analyzes, and mitigates security risks before they can be
          exploited — reducing rework, improving design decisions, and protecting customer data,
          business operations, and organizational reputation.
        </p>
      </div>

      <div className="panel">
        <h2>All Systems — Product Owners</h2>
        <div className="table-scroll">
          <table className="sessions-table">
            <thead>
              <tr>
                <th>Product / App</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="clickable-row" onClick={() => onSelect(p)}>
                  <td>{p.product}</td>
                  <td className={p.owner === "Unassigned" ? "owner-unassigned" : undefined}>{p.owner}</td>
                  <td><span className={statusClass[p.status]}>{p.status}</span></td>
                  <td><span className={riskClass[p.riskLevel]}>{p.riskLevel}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

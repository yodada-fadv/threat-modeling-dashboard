import type { ProductThreatModel } from "../data/threatModelData";

interface SessionsTableProps {
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

export function SessionsTable({ products, onSelect }: SessionsTableProps) {
  return (
    <div className="panel">
      <h2>Threat Modeling Sessions by System</h2>
      <div className="table-scroll">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>System</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Risk Level</th>
              <th>Last Review</th>
              <th>Open Findings</th>
              <th>Closed Findings</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="clickable-row" onClick={() => onSelect(p)}>
                <td>{p.product}</td>
                <td>{p.owner}</td>
                <td><span className={statusClass[p.status]}>{p.status}</span></td>
                <td><span className={riskClass[p.riskLevel]}>{p.riskLevel}</span></td>
                <td>{p.lastReviewDate ?? "—"}</td>
                <td>{p.openFindings}</td>
                <td>{p.closedFindings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

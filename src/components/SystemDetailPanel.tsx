import type { ProductThreatModel, SystemDetail } from "../data/threatModelData";

interface SystemDetailPanelProps {
  product: ProductThreatModel;
  detail: SystemDetail | undefined;
  onClose: () => void;
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

const mitigationStatusClass: Record<string, string> = {
  Open: "badge badge-danger",
  Mitigated: "badge badge-success",
  "Accepted Risk": "badge badge-warning",
};

export function SystemDetailPanel({ product, detail, onClose }: SystemDetailPanelProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{product.product}</h2>
            <div className="modal-badges">
              <span className={statusClass[product.status]}>{product.status}</span>
              <span className={riskClass[product.riskLevel]}>{product.riskLevel} Risk</span>
            </div>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <dl className="modal-meta">
          <div>
            <dt>Owner</dt>
            <dd className={product.owner === "Unassigned" ? "owner-unassigned" : undefined}>{product.owner}</dd>
          </div>
          <div>
            <dt>Last Review</dt>
            <dd>{product.lastReviewDate ?? "—"}</dd>
          </div>
          <div>
            <dt>Open Findings</dt>
            <dd>{product.openFindings}</dd>
          </div>
          <div>
            <dt>Closed Findings</dt>
            <dd>{product.closedFindings}</dd>
          </div>
        </dl>

        {!detail ? (
          <p className="health-note">No threat modeling session has been held for this system yet.</p>
        ) : (
          <>
            <section className="modal-section">
              <h3>Overview</h3>
              <p className="health-note">{detail.description}</p>
            </section>

            {detail.components.length > 0 && (
              <section className="modal-section">
                <h3>Components</h3>
                <ul className="principles-list">
                  {detail.components.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            )}

            {detail.strideBreakdown.length > 0 && (
              <section className="modal-section">
                <h3>STRIDE Breakdown</h3>
                <div className="table-scroll">
                  <table className="sessions-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Open</th>
                        <th>Closed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.strideBreakdown.map((s) => (
                        <tr key={s.category}>
                          <td>{s.category}</td>
                          <td>{s.open}</td>
                          <td>{s.closed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {detail.mitigations.length > 0 && (
              <section className="modal-section">
                <h3>Findings &amp; Mitigations</h3>
                <div className="table-scroll">
                  <table className="sessions-table">
                    <thead>
                      <tr>
                        <th>Finding</th>
                        <th>STRIDE</th>
                        <th>Mitigation</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.mitigations.map((m) => (
                        <tr key={m.finding}>
                          <td>{m.finding}</td>
                          <td>{m.strideCategory}</td>
                          <td>{m.mitigation}</td>
                          <td><span className={mitigationStatusClass[m.status]}>{m.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {detail.changeLog.length > 0 && (
              <section className="modal-section">
                <h3>Change Log</h3>
                <ul className="attention-list">
                  {detail.changeLog.map((c) => (
                    <li key={c.date + c.change}>
                      <span className="attention-findings">{c.date}</span>
                      <span className="attention-product">{c.change}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

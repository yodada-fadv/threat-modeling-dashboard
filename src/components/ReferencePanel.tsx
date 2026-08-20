import type { guidingPrinciples, strideReference } from "../data/threatModelData";

interface ReferencePanelProps {
  principles: typeof guidingPrinciples;
  stride: typeof strideReference;
}

export function ReferencePanel({ principles, stride }: ReferencePanelProps) {
  return (
    <div className="panel">
      <h2>STRIDE Reference</h2>
      <div className="table-scroll">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Threat Type</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {stride.map((s) => (
              <tr key={s.code}>
                <td>{s.code}</td>
                <td>{s.name}</td>
                <td>{s.description}</td>
                <td>{s.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: "1.5rem" }}>Guiding Principles</h2>
      <ul className="principles-list">
        {principles.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

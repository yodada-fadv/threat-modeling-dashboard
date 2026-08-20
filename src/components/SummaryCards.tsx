import type { ProductThreatModel } from "../data/threatModelData";

interface SummaryCardsProps {
  products: ProductThreatModel[];
}

export function SummaryCards({ products }: SummaryCardsProps) {
  const total = products.length;
  const completed = products.filter((p) => p.status === "Completed").length;
  const inProgress = products.filter((p) => p.status === "In Progress").length;
  const needsFollowUp = products.filter((p) => p.status === "Needs Follow-up").length;
  const openFindings = products.reduce((sum, p) => sum + p.openFindings, 0);
  const highRisk = products.filter((p) => p.riskLevel === "High" || p.riskLevel === "Critical").length;

  const cards = [
    { label: "Systems Tracked", value: total },
    { label: "Threat Models Completed", value: completed },
    { label: "In Progress", value: inProgress },
    { label: "Needs Follow-up", value: needsFollowUp },
    { label: "Open Findings", value: openFindings },
    { label: "High / Critical Risk Systems", value: highRisk },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div className="summary-card" key={card.label}>
          <div className="summary-card-value">{card.value}</div>
          <div className="summary-card-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
}

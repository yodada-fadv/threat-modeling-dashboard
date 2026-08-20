import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { ProductThreatModel } from "../data/threatModelData";

interface RiskDistributionChartProps {
  products: ProductThreatModel[];
}

const RISK_COLORS: Record<ProductThreatModel["riskLevel"], string> = {
  Low: "#2f855a",
  Medium: "#d69e2e",
  High: "#d64545",
  Critical: "#8b1a1a",
};

export function RiskDistributionChart({ products }: RiskDistributionChartProps) {
  const counts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.riskLevel] = (acc[p.riskLevel] ?? 0) + 1;
    return acc;
  }, {});

  const data = (Object.keys(RISK_COLORS) as ProductThreatModel["riskLevel"][])
    .filter((level) => counts[level])
    .map((level) => ({ name: level, value: counts[level] }));

  return (
    <div className="panel">
      <h2>Risk Posture Across Systems</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((entry) => (
              <Cell key={entry.name} fill={RISK_COLORS[entry.name as ProductThreatModel["riskLevel"]]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

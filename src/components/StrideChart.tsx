import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StrideFinding } from "../data/threatModelData";

interface StrideChartProps {
  data: StrideFinding[];
}

export function StrideChart({ data }: StrideChartProps) {
  return (
    <div className="panel">
      <h2>Findings by STRIDE Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 48 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" angle={-30} textAnchor="end" interval={0} height={80} tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="open" name="Open" fill="#d64545" />
          <Bar dataKey="closed" name="Closed" fill="#2f855a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

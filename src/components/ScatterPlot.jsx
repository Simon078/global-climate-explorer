import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ScatterPlot({ climateData, year }) {
  if (!climateData) return null;

  const scatterData = Object.keys(climateData)
    .map((country) => {
      const rec = climateData[country]?.[year];
      if (!rec) return null;

      const co2 = rec.co2;
      const temperature = rec.temperature;
      if (co2 == null || temperature == null) return null;

      return { country, co2, temperature };
    })
    .filter(Boolean);

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h3 style={{ textAlign: "center" }}>CO₂ vs Temperature ({year})</h3>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="co2" name="CO₂ per capita" />
          <YAxis type="number" dataKey="temperature" name="Temperature anomaly (°C)" />
          <Tooltip
            labelFormatter={(label, payload) => payload?.[0]?.payload?.country || ""}
          />
          <Scatter data={scatterData} fill="#ff5722" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScatterPlot;
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function TrendChart({ selectedCountry, climateData, metric }) {
  if (!selectedCountry || !climateData) return null;

  const countryData = climateData[selectedCountry];
  if (!countryData) return null;

  const years = Object.keys(countryData).sort();
  const chartData = years.map((year) => ({
    year,
    value: countryData[year]?.[metric] ?? null,
  }));

  const title =
    metric === "temperature"
      ? `Temperature anomaly trend: ${selectedCountry}`
      : `CO₂ per capita trend: ${selectedCountry}`;

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#ff5722" strokeWidth={2} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;
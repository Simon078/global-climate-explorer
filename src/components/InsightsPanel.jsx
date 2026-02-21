function InsightsPanel({ selectedCountry, climateData, metric }) {
  if (!selectedCountry || !climateData) return null;

  const countryData = climateData[selectedCountry];
  if (!countryData) return null;

  const years = Object.keys(countryData).sort();
  if (years.length < 2) return null;

  const firstYear = years[0];
  const lastYear = years[years.length - 1];

  const firstValue = countryData[firstYear]?.[metric] ?? null;
  const lastValue = countryData[lastYear]?.[metric] ?? null;

  if (firstValue == null || lastValue == null) return null;

  const change = lastValue - firstValue;
  const changeAbs = Math.abs(change).toFixed(2);

  const metricLabel =
    metric === "temperature" ? "temperature anomaly" : "CO₂ per capita";

  let message = "";
  if (change > 0) {
    message = `Between ${firstYear} and ${lastYear}, ${selectedCountry}'s ${metricLabel} increased by ${changeAbs}.`;
  } else if (change < 0) {
    message = `Between ${firstYear} and ${lastYear}, ${selectedCountry}'s ${metricLabel} decreased by ${changeAbs}.`;
  } else {
    message = `Between ${firstYear} and ${lastYear}, ${selectedCountry}'s ${metricLabel} remained stable.`;
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "30px auto",
        padding: "15px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h3>Insight</h3>
      <p>{message}</p>
    </div>
  );
}

export default InsightsPanel;
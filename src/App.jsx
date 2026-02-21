import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import TrendChart from "./components/TrendChart";
import InsightsPanel from "./components/InsightsPanel";
import ScatterPlot from "./components/ScatterPlot";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [year, setYear] = useState("2020");
  const [metric, setMetric] = useState("temperature");
  const [climateData, setClimateData] = useState(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL; // "/global-climate-explorer/"
    fetch(`${base}data/climateData.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`climateData.json load failed: ${res.status}`);
        return res.json();
      })
      .then((data) => setClimateData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        🌍 Global Climate Explorer
      </h1>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <label>Year: </label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2010">2010</option>
          <option value="2015">2015</option>
          <option value="2020">2020</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Metric: </label>
        <select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option value="temperature">Temperature</option>
          <option value="co2">CO₂ Emissions</option>
        </select>
      </div>

      <MapView
        selectedCountry={selectedCountry}
        onCountrySelect={setSelectedCountry}
        year={year}
        metric={metric}
        climateData={climateData}
      />

      <TrendChart selectedCountry={selectedCountry} climateData={climateData} metric={metric} />
      <InsightsPanel selectedCountry={selectedCountry} climateData={climateData} metric={metric} />
      <ScatterPlot climateData={climateData} year={year} />
    </div>
  );
}

export default App;
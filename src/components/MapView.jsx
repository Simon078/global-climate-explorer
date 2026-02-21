import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Legend from "./Legend";

function MapView({ selectedCountry, onCountrySelect, year, metric, climateData }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL; // "/global-climate-explorer/"
    fetch(`${base}data/world.geo.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`world.geo.json load failed: ${res.status}`);
        return res.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => console.error(err));
  }, []);

  const getColor = (value) => {
    if (value == null) return "#ccc";

    if (metric === "temperature") {
      if (value > 1.5) return "#800026";
      if (value > 1.2) return "#BD0026";
      if (value > 1.0) return "#E31A1C";
      return "#FD8D3C";
    }

    if (value > 15) return "#084081";
    if (value > 10) return "#0868ac";
    if (value > 5) return "#2b8cbe";
    return "#4eb3d3";
  };

  const getStyle = (feature) => {
    const countryName = feature.properties.name;

    const value =
      climateData &&
      climateData[countryName] &&
      climateData[countryName][year]
        ? climateData[countryName][year][metric]
        : null;

    return {
      fillColor: countryName === selectedCountry ? "#ff5722" : getColor(value),
      weight: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const onEachCountry = (feature, layer) => {
    layer.on({
      click: () => {
        onCountrySelect(feature.properties.name);
      },
      mouseover: (e) => {
        e.target.setStyle({ weight: 2 });
      },
      mouseout: (e) => {
        e.target.setStyle({ weight: 1 });
      },
    });
  };

  return (
    <div style={{ position: "relative", marginBottom: "40px" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && (
          <GeoJSON data={geoData} style={getStyle} onEachFeature={onEachCountry} />
        )}
      </MapContainer>

      <Legend metric={metric} />
    </div>
  );
}

export default MapView;
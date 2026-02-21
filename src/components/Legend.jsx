function Legend({ metric }) {
  const box = (color) => ({
    width: "15px",
    height: "15px",
    backgroundColor: color,
    marginRight: "8px",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "30px",
        right: "20px",
        background: "white",
        padding: "12px",
        borderRadius: "6px",
        boxShadow: "0 0 8px rgba(0,0,0,0.4)",
        fontSize: "14px",
        zIndex: 1000,        // ⭐ 关键修复
      }}
    >
      <strong>
        {metric === "temperature"
          ? "Temperature (°C)"
          : "CO₂ per capita"}
      </strong>

      <div style={{ marginTop: "6px" }}>
        {metric === "temperature" ? (
          <>
            <div style={{ display: "flex" }}>
              <div style={box("#800026")} /> &gt; 1.5
            </div>
            <div style={{ display: "flex" }}>
              <div style={box("#BD0026")} /> 1.2–1.5
            </div>
            <div style={{ display: "flex" }}>
              <div style={box("#E31A1C")} /> 1.0–1.2
            </div>
            <div style={{ display: "flex" }}>
              <div style={box("#FD8D3C")} /> &lt; 1.0
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex" }}>
              <div style={box("#084081")} /> &gt; 15
            </div>
            <div style={{ display: "flex" }}>
              <div style={box("#0868ac")} /> 10–15
            </div>
            <div style={{ display: "flex" }}>
              <div style={box("#2b8cbe")} /> 5–10
            </div>
            <div style={{ display: "flex" }}>
              <div style={box("#4eb3d3")} /> &lt; 5
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Legend;
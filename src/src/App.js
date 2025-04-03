import React, { useEffect, useState } from "react";

function App() {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jsonUrl = `${process.env.PUBLIC_URL}/data/aluminum_7075.json`;
    console.log("Fetching JSON from:", jsonUrl);

    fetch(jsonUrl)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Read response as text first
      })
      .then((text) => {
        console.log("Raw response:", text);
        try {
          const data = JSON.parse(text); // Try parsing JSON
          console.log("Fetched data:", data);
          setMaterials([data]);
        } catch (jsonError) {
          throw new Error("Invalid JSON format");
        }
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Aerospace Material Database</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : materials.length > 0 ? (
        <ul>
          {materials.map((material, index) => (
            <li key={index}>
              <strong>{material.name}</strong> ({material.category}) <br />
              Density: {material.density} <br />
              Yield Strength: {material.yield_strength} <br />
              Thermal Conductivity: {material.thermal_conductivity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading materials...</p>
      )}
    </div>
  );
}

export default App;

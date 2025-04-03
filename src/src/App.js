import React, { useEffect, useState } from "react";

function App() {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jsonUrl = process.env.PUBLIC_URL + "/aluminum_7075.json"; // Ensure correct path
    console.log("Fetching JSON from:", jsonUrl);

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json(); // Parse JSON directly
      })
      .then((data) => {
        console.log("Parsed JSON:", data);
        setMaterials([data]); // Ensure data is structured correctly
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setError(error.message);
      });
  }, []);

  console.log("Materials state:", materials); // Debugging output

  return (
    <div>
      <h1>Aerospace Material Database</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && materials.length === 0 && <p>Loading materials...</p>}
      {!error && materials.length > 0 && (
        <ul>
          {materials.map((material, index) => (
            <li key={index}>
              <strong>{material.name}</strong> - {material.category}
              <ul>
                <li>Density: {material.density}</li>
                <li>Yield Strength: {material.yield_strength}</li>
                <li>Thermal Conductivity: {material.thermal_conductivity}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './styles.css';

const materialFiles = [
  'aluminum_7075.json',
  'titanium_6al4v.json'
];

function App() {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const loadMaterials = async () => {
      const loadedMaterials = [];
      for (const file of materialFiles) {
        try {
          const res = await fetch(`/${file}`);
          const data = await res.json();
          loadedMaterials.push(data);
        } catch (err) {
          console.error(`Error loading ${file}:`, err);
        }
      }
      setMaterials(loadedMaterials);
    };

    loadMaterials();
  }, []);

  const filteredMaterials = materials.filter(mat =>
    mat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Aerospace Materials Database</h1>

      <input
        type="text"
        className="search-bar"
        placeholder="Search for a material..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="category-buttons">
        <button className="category-button" onClick={() => alert('Metals')}>
          Metals
        </button>
        <button className="category-button" onClick={() => alert('Ceramics')}>
          Ceramics
        </button>
        <button className="category-button" onClick={() => alert('Composites')}>
          Composites
        </button>
      </div>

      {filteredMaterials.map((material, index) => (
        <div key={index} className="material-card">
          <h2>{material.name}</h2>
          {material.properties ? (
            <ul className="material-properties">
              {Object.entries(material.properties).map(([prop, val]) => (
                <li key={prop}><strong>{prop}:</strong> {val}</li>
              ))}
            </ul>
          ) : (
            <p>No properties available for this material.</p>
          )}
        </div>
      ))}

      <div className="toggle-container">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

export default App;

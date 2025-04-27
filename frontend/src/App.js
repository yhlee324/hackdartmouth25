// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';

// API
import { searchSpecies } from './api/localAnimals';

// Globe
import Globe from 'react-globe.gl';

// Coordinate Lookup Map
const countryCoordinates = {
  US: { lat: 39.8, lng: -98.5 },  // United States
  CA: { lat: 56.1, lng: -106.3 }, // Canada
  MX: { lat: 23.6, lng: -102.5 }, // Mexico
  CN: { lat: 35.8, lng: 104.1 }, // China
  RU: { lat: 61.5, lng: 105.3 }, // Russia
  IN: { lat: 20.5, lng: 78.9 },  // India
  AU: { lat: -25.2, lng: 133.7 }, // Australia
  BR: { lat: -14.2, lng: -51.9 }, // Brazil
  ZA: { lat: -30.5, lng: 22.9 }, // South Africa
  GB: { lat: 55.3, lng: -3.4 },  // United Kingdom
  FR: { lat: 46.2, lng: 2.2 },   // France
  DE: { lat: 51.1, lng: 10.4 },  // Germany
  JP: { lat: 36.2, lng: 138.2 }, // Japan
  VN: { lat: 14.0, lng: 108.2 }, // Vietnam (Example for Asian Elephant)
  ID: { lat: -0.7, lng: 113.9 }, // Indonesia (Example for Sumatran Elephant)
};

function App() {
  const [status, setStatus] = useState(null);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [speciesData, setSpeciesData] = useState(null);
  const globeRef = useRef();
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  // Local species list
  const speciesList = [
    "bald eagle",
    "american alligator",
    "red wolf",
    "loggerhead sea turtle",
    "whooping crane",
    "black-footed ferret",
    "giant panda",
    "snow leopard",
    "vaquita",
    "african elephant"
  ];

  const handleLookup = async (nameToSearch = null) => {
    const query = (nameToSearch || searchText).toLowerCase().trim();
    if (!query) return;

    setError('');
    setSpeciesData(null);
    setStatus(null);
    setCountries([]);

    try {
      const result = await searchSpecies(query);

      if (!result || !result.status) {
        throw new Error('No match found');
      }

      setSpeciesData(result);
      setStatus(result.status);
      setCountries(result.countries || []);

      if (result.countries && result.countries.length > 0) {
        setSelectedCountryCode(result.countries[0]); // Focus on first country
      }else {
        setSelectedCountryCode(null); // Reset zoom target if no countries
      }

    } catch (e) {
      setError('Species not found. Please check spelling.');
      setStatus(null);
      setCountries([]);
      setSelectedCountryCode(null);
    }
  };

  // Auto-spin the globe
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
    }
  }, []);

  // // Auto-zoom to selected country
  // useEffect(() => {
  //   if (selectedCountryCode && globeRef.current) {
  //     globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }, 2000);
  //   }
  // }, [selectedCountryCode]);

  useEffect(() => {
    if (selectedCountryCode && globeRef.current) {
      // --- UPDATED ---
      const coords = countryCoordinates[selectedCountryCode]; // Look up coords
      if (coords) {
        globeRef.current.pointOfView({ lat: coords.lat, lng: coords.lng, altitude: 1.5 }, 1000); // Zoom to coords
      } else {
         globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 1000); // Fallback zoom out
      }
    }
  }, [selectedCountryCode]);
  // Create highlighted features for the globe
  const features = countries.map(code => ({
    type: 'Feature', 
    properties: { ISO_A2: code },
    geometry: { // Dummy geometry, not used by label funcs but good practice
      type: 'Point',
      coordinates: [ // Use lookup here too, defaulting to 0,0
          countryCoordinates[code]?.lng ?? 0,
          countryCoordinates[code]?.lat ?? 0,
      ]
    }
  }));

  return (
    <div className="App">
      <Header />

      <main>
        <HeroSection />

        {/* --- Section for Feature Cards --- */}
        <section className="features-section">
          <div className="container">
            <h2>Our Features</h2>
            <div className="features-grid">
              <FeatureCard
                title="Search for an animal"
                description="Learn fun facts about your pals."
              />
              <FeatureCard
                title="Status Monitoring"
                description="Keep track of their conservation status."
              />
              <FeatureCard
                title="Location Visualization"
                description="Spin the globe to find out where they live."
              />
            </div>
          </div>
        </section>

        {/* --- Explore Endangered Species Section --- */}
        <section className="globe-section">
          <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Explore Endangered Species</h2>

            {/* Quick Species Buttons */}
            <div style={{ marginBottom: '20px' }}>
              {speciesList.map((name) => (
                <button
                  key={name}
                  onClick={() => handleLookup(name)}
                  style={{ margin: '5px', padding: '8px 12px', fontSize: '14px' }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Enter species name (e.g., red wolf)"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ padding: '8px', width: '300px', fontSize: '16px' }}
              />
              <button
                onClick={() => handleLookup()}
                style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }}
              >
                Search
              </button>
            </div>

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Species Info Display */}
            {status && (
              <div>
                <p>Conservation status: <strong>{status}</strong></p>
                {speciesData && (
                  <>
                    <p>Scientific Name: <i>{speciesData.scientific_name}</i></p>
                    <p>Population Trend: {speciesData.population}</p>
                    <p>Habitat: {speciesData.habitat}</p>
                  </>
                )}
              </div>
            )}

            {/* Globe */}
            <div style={{ height: '500px', width:'100%', marginTop: '30px' }}>
              <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                // polygonsData={[]}
                labelsData={features}
                labelLat={(d) => countryCoordinates[d.properties.ISO_A2]?.lat ?? 0}
                labelLng={(d) => countryCoordinates[d.properties.ISO_A2]?.lng ?? 0}
                // labelLat={() => 0}
                // labelLng={() => 0}
                labelText={(d) => d.properties.ISO_A2}
                labelSize={1.5}
                labelColor={() => 'rgba(255, 165, 0, 0.8)'} // Highlight color
                labelsTransitionDuration={500}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
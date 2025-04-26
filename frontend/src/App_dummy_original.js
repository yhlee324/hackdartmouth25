import React from 'react';
import './App.css'; // General app styles

// Import your components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <HeroSection />

        {/* Section for Feature Cards */}
        <section className="features-section">
          <div className="container">
            <h2>Our Features</h2> {/* Placeholder Title */}
            <div className="features-grid"> {/* Use this class to layout cards */}
              {/* Use the FeatureCard component multiple times with different props */}
              <FeatureCard
                // icon="path/to/icon1.svg" // Example: Pass icon path or component
                title="Real-Time Tracking"
                description="Monitor your pet's location anytime, anywhere."
              />
              <FeatureCard
                title="Health Monitoring"
                description="Keep track of vital signs and activity levels."
              />
              <FeatureCard
                title="Safety Zones"
                description="Get alerts when your pet leaves designated safe areas."
              />
              {/* Add more FeatureCards as needed based on Figma */}
            </div>
          </div>
        </section>


        {/* --- NEW Section for Endangered Species Globe --- */}
        <section className="globe-section">
          <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Explore Endangered Species</h2>

            {/* Search bar */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Enter species common name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ padding: '8px', width: '300px', fontSize: '16px' }}
              />
              <button 
                onClick={handleLookup} 
                style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }}
              >
                Search
              </button>
            </div>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Status result */}
            {status && <p>Endangerment level: <strong>{status}</strong></p>}

            {/* 3D Globe */}
            <div style={{ height: '500px', marginTop: '30px' }}>
              <Globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                polygonsData={[]}
                labelsData={features}
                labelLat={() => 0}
                labelLng={() => 0}
                labelText={(d) => d.properties.ISO_A2}
                labelSize={1}
                polygonsTransitionDuration={300}
              />
            </div>
          </div>
        </section>

        {/* Add other sections from your Figma design here */}

      </main>

      <Footer />
    </div>
  );
}

export default App;
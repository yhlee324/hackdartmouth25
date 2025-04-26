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

        {/* Add other sections from your Figma design here */}

      </main>

      <Footer />
    </div>
  );
}

export default App;
// This is the globe component, which will render the geographical location of a specific endangered species. 

import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import worldData from '../data/world-110m.json';

export default function GlobeMap({ highlighted = [] }) {
  const globeEl = useRef();

  useEffect(() => {
    globeEl.current
      .polygonsData(worldData.features)
      .polygonCapColor(({ properties: c }) =>
        highlighted.includes(c.ISO_A2) ? 'red' : 'rgba(200,200,200,0.1)'
      )
      .polygonSideColor(() => 'rgba(0,0,0,0)')
      .polygonStrokeColor(() => '#111');
  }, [highlighted]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      width={600}
      height={600}
    />
  );
}

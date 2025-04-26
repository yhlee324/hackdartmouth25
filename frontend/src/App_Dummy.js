//Make sure do this command: npm install react-globe.gl three axios

import React, { useState } from 'react';
import { searchSpecies, getDetails, getCountries } from './api/iucn';
import SearchBar from './components/SearchBar';
import GlobeMap   from './components/GlobeMap';

export default function App() {
  const [status,   setStatus]   = useState(null);
  const [countries,setCountries]= useState([]);
  const [error,    setError]    = useState('');

  const handleLookup = async commonName => {
    setError('');
    try {
      const results = await searchSpecies(commonName);
      if (!results.length) throw new Error('No match found');
      const taxonId = results[0].taxonid;

      // fetch status & country list in parallel
      const [ detail, countryList ] = await Promise.all([
        getDetails(taxonId),
        getCountries(taxonId)
      ]);

      setStatus(detail.category);
      setCountries(countryList);
    } catch (e) {
      setError(e.message);
      setStatus(null);
      setCountries([]);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Endangered Species Globe</h1>
      <SearchBar onLookup={handleLookup} />
      {error && <p style={{ color:'red' }}>{error}</p>}
      {status && <p>Endangerment level: <strong>{status}</strong></p>}
      <GlobeMap highlighted={countries} />
    </div>
  );
}

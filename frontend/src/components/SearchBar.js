// Searchbar where u look up a specific species

import React, { useState } from 'react';

export default function SearchBar({ onLookup }) {
  const [q, setQ] = useState('');
  const submit = e => {
    e.preventDefault();
    if (!q.trim()) return;
    onLookup(q.trim());
  };

  return (
    <form onSubmit={submit}>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Enter common name (e.g. tiger)"
      />
      <button type="submit">Lookup</button>
    </form>
  );
}

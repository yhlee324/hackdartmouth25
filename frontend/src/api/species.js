import axios from 'axios'

// — GBIF client for name matching & country facets (no API key) —
const GBIF = axios.create({
  baseURL: 'https://api.gbif.org/v1'
})

/**
 * 1) Match a common‐name (or scientific) to GBIF’s taxonKey & canonicalName
 * @param  {string} commonName
 * @return {Promise<{ usageKey: number, scientificName: string }>}
 */
export const searchSpecies = async commonName => {
  const { data } = await GBIF.get('/species/match', {
    params: { name: commonName }
  })
  const { usageKey, scientificName } = data
  if (!usageKey) throw new Error(`No match found for “${commonName}”`)
  return { usageKey, scientificName }
}

// — IUCN v4 client for Red List assessments —
const IUCN = axios.create({
  baseURL: 'https://api.iucnredlist.org/api/v4'
})

/**
 * 2) Get the latest Red List assessment for a species
 * @param  {string} scientificName
 * @return {Promise<{ category: string, year: string }>}
 */
export const getDetails = async scientificName => {
  const { data } = await IUCN.get('/assessment', {
    params: {
      scientific_name: scientificName,
      token: process.env.REACT_APP_IUCN_TOKEN,
      latest: true
    }
  })
  const [assmnt] = data.result
  if (!assmnt) throw new Error(`No IUCN assessment found for “${scientificName}”`)
  return {
    category: assmnt.category,
    year:     assmnt.year_published
  }
}

/**
 * 3) Get ISO‐2 country codes via GBIF occurrence facets
 * @param  {number} usageKey  from searchSpecies()
 * @return {Promise<string[]>} array of country codes, e.g. ['IN','RU',…]
 */
export const getCountries = async usageKey => {
  // fetch zero‐limit occurrences but facet on country
  const { data } = await GBIF.get('/occurrence/search', {
    params: { taxonKey: usageKey, limit: 0, facet: 'country' }
  })
  const facet = (data.facets || []).find(f => f.field === 'country')
  return facet ? facet.counts.map(c => c.name) : []
}

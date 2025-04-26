// src/api/natureserve.js

import axios from 'axios';

const BASE_URL = 'https://explorer.natureserve.org/api/data';

export async function searchSpecies(commonName) {
  try {
    const searchResponse = await axios.post(`${BASE_URL}/speciesSearch`, {
      criteriaType: "combined",
      textCriteria: [
        {
          paramType: "textSearch",
          searchToken: commonName,
          matchAgainst: "allScientificAndCommonNames",  // <-- very important
          operator: "similarTo"
        }
      ],
      locationCriteria: [],
      pagingOptions: {
        page: 0,
        recordsPerPage: 25
      },
      recordSubtypeCriteria: [],
      recordTypeCriteria: [],
      speciesTaxonomicCriteria: [],
      conservationStatusCriteria: []
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const results = searchResponse.data.results;
    if (!results || results.length === 0) {
      throw new Error('Species not found');
    }

    const species = results[0];
    const taxonId = species.uniqueId;

    const detailResponse = await axios.get(`${BASE_URL}/taxon/${taxonId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const detail = detailResponse.data;

    return {
      common_name: detail.primaryCommonName || 'Unknown',
      scientific_name: detail.scientificName || 'Unknown',
      status: detail.iucn?.iucnDescEn || detail.roundedGRank || 'Unknown',
      habitat: detail.habitat || 'Unknown',
      population: detail.populationTrend || 'Unknown',
      countries: detail.elementNationals
        ? detail.elementNationals.map(n => n.nation.isoCode).filter(Boolean)
        : []
    };
  } catch (error) {
    console.error('NatureServe API Error:', error);
    throw new Error(error.message || 'Error fetching species data from NatureServe');
  }
}

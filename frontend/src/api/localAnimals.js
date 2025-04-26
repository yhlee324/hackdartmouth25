// src/api/localAnimals.js

export const animals = [
  {
    common_name: "Bald Eagle",
    scientific_name: "Haliaeetus leucocephalus",
    status: "Least Concern",
    habitat: "Forests, wetlands, rivers",
    population: "Increasing",
    countries: ["US", "CA"]
  },
  {
    common_name: "American Alligator",
    scientific_name: "Alligator mississippiensis",
    status: "Least Concern",
    habitat: "Swamps, wetlands",
    population: "Increasing",
    countries: ["US"]
  },
  {
    common_name: "Red Wolf",
    scientific_name: "Canis rufus",
    status: "Critically Endangered",
    habitat: "Forests, wetlands",
    population: "Decreasing",
    countries: ["US"]
  },
  {
    common_name: "Loggerhead Sea Turtle",
    scientific_name: "Caretta caretta",
    status: "Vulnerable",
    habitat: "Coastal oceans, beaches",
    population: "Decreasing",
    countries: ["US", "MX"]
  },
  {
    common_name: "Whooping Crane",
    scientific_name: "Grus americana",
    status: "Endangered",
    habitat: "Wetlands",
    population: "Increasing",
    countries: ["US", "CA"]
  },
  {
    common_name: "Black-Footed Ferret",
    scientific_name: "Mustela nigripes",
    status: "Endangered",
    habitat: "Grasslands",
    population: "Stable",
    countries: ["US"]
  },
  {
    common_name: "Giant Panda",
    scientific_name: "Ailuropoda melanoleuca",
    status: "Vulnerable",
    habitat: "Bamboo forests",
    population: "Increasing",
    countries: ["CN"]
  },
  {
    common_name: "Snow Leopard",
    scientific_name: "Panthera uncia",
    status: "Vulnerable",
    habitat: "Mountain ranges",
    population: "Decreasing",
    countries: ["CN", "IN", "NP"]
  },
  {
    common_name: "Vaquita",
    scientific_name: "Phocoena sinus",
    status: "Critically Endangered",
    habitat: "Northern Gulf of California",
    population: "Decreasing",
    countries: ["MX"]
  },
  {
    common_name: "African Elephant",
    scientific_name: "Loxodonta africana",
    status: "Endangered",
    habitat: "Savannahs, forests",
    population: "Decreasing",
    countries: ["ZA", "KE", "TZ", "BW"]
  }
];

// --- Search Function ---
export async function searchSpecies(commonName) {
  const search = commonName.toLowerCase().trim();
  const found = animals.find(animal => animal.common_name.toLowerCase() === search);
  if (!found) throw new Error("Species not found");
  return found;
}

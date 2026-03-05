const pokemons = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0",
);

const pokemonDetails = await pokemons.json();
Deno.writeTextFileSync("./public/data/pokemon_data.json", JSON.stringify(pokemonDetails));

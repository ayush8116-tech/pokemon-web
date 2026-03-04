const pokemons = await fetch(
  "https://pokeapi.co/api/v2/pokemon?limit=15&offset=0",
);

const pokemonDetails = await pokemons.json();
Deno.writeTextFileSync("./src/pokemon_data.json", JSON.stringify(pokemonDetails));

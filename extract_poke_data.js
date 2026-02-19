import * as pokedata from "./src/pokemon_data.json" with { type: "json" };
const pokemons = pokedata.default;

const extractTypes = (pokemonTypes) =>
  pokemonTypes.map((types) => types.type.name);

const extractPokemonStats = (pokemons) => {
  const stats = pokemons.map((pokemon) => {
    const pokemonStat = {};
    pokemonStat.name = pokemon.name;
    pokemonStat.types = extractTypes(pokemon.types);
    pokemonStat.xp = pokemon.base_experience;
    pokemonStat.weight = pokemon.weight;
    pokemon.stats.forEach((stat) =>
      pokemonStat[stat.stat.name] = stat.base_stat
    );
    pokemonStat.imgUrl = pokemon.sprites.other["official-artwork"]["front_default"]
    
    return pokemonStat;
  });

  return stats;
};

const processPokemonData = async (pokemons) => {
  const pokemonDetails = [];

  for (const pokemon of pokemons) {
    const pokedata = await fetch(pokemon.url);
    pokemonDetails.push(await pokedata.json());
  }

  const stats = extractPokemonStats(pokemonDetails);
  Deno.writeTextFileSync("./pokemon_data.json", JSON.stringify(stats));

  return stats;
};

await processPokemonData(pokemons.results);

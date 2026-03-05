import * as pokemonsData from "./data/pokemon_data.json" with { type: "json" };
import { displayAllPokemon } from "./generate_cardfragment.js";
import { displaySidebar } from "./generate_navigations.js";
import { navigate } from "./navigate.js";
const pokemons = pokemonsData.default;

const separatePokemons = (pokemons) => {
  return pokemons.reduce((pokeTypes, pokemon) => {
    pokemon.types.forEach((type) => {
      pokeTypes[type] ||= [];
      pokeTypes[type].push(pokemon);
    });

    return pokeTypes;
  }, {});
};

const filteredPokemon = separatePokemons(pokemons);

export const generatePage = (pokemons) => {
  const body = document.querySelector("body");

  const main = document.createElement("div");
  main.classList = "body";

  const sidebar = displaySidebar(filteredPokemon);
  const cardContainer = displayAllPokemon(pokemons);

  main.append(sidebar, cardContainer);
  body.append(main);

  return body;
};

generatePage(pokemons)

window.onload = () => {
  navigate(pokemons, filteredPokemon);
}

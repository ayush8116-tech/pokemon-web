import * as pokemonsData from "./data/pokemon_data.json" with { type: "json" };
import { displayAllPokemon } from "./generate_cardfragment.js";
import { displaySidebar } from "./generate_navigations.js";
const pokemons = pokemonsData.default;

// const generateSidebar = (pokemons) => {
//   const sidebar = document.createElement("div");
//   sidebar.classList = "sidebar";

//   const navigations = generateNavigations(pokemons);
//   sidebar.append(...navigations);

//   return sidebar;
// };

const generatePage = () => {
  const body = document.querySelector("body");

  const main = document.createElement("div");
  main.classList = "body";

  const sidebar = displaySidebar(pokemons);
  const cardContainer = displayAllPokemon(pokemons);

  main.append(sidebar, cardContainer);
  body.append(main);
};

window.onload = () => generatePage();

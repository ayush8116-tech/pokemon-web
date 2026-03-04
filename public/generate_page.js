import { generateCard } from "./generate_cards.js";
import { generateNavigations } from "./generate_navigations.js";

import * as pokemonsData from "/data/pokemon_data.json" with { type: "json" };
const pokemons = pokemonsData.default;

const generateCardContainer = (pokemons) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList = "card-container";

  pokemons.forEach((pokemon) => {
    const card = generateCard(pokemon);
    cardContainer.appendChild(card);
  });

  return cardContainer;
};

const generateSidebar = (pokemons) => {
  const sidebar = document.createElement("div");
  sidebar.classList = "sidebar";

  const navigations = generateNavigations(pokemons);
  sidebar.append(...navigations);

  return sidebar;
};

const generatePage = () => {
  const body = document.querySelector("body");

  const main = document.createElement("div");
  main.classList = "body";

  const sidebar = generateSidebar(pokemons);
  const cardContainer = generateCardContainer(pokemons);

  main.append(sidebar, cardContainer);
  body.append(main);

  console.log(body);
};

window.onload = () => generatePage();
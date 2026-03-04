import { createFragment } from "./generate_cardfragment.js";

const separatePokemons = (pokemons) => {
  return pokemons.reduce((pokeTypes, pokemon) => {
    pokemon.types.forEach((type) => {
      pokeTypes[type] ||= [];
      pokeTypes[type].push(pokemon);
    });

    return pokeTypes;
  }, {});
};

export const displaySidebar = (pokemons) => {
  const sidebarDom = [
      "div",
      {class : "sidebar"},
      [[
        "a",
        {href : "index.html"},
        [[
          "li",
          {id : "all"},
          "All"
        ]]
      ], ...Object.keys(separatePokemons(pokemons)).map(type => ["a", {class : `${type}.html`}, [["li", {class : type}, type]]])]
    ];

  const sidebar = createFragment(sidebarDom);
  return sidebar;
}
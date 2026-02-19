import * as pokemonsData from "./src/pokemon_data.json" with { type: "json" };
const pokemons = pokemonsData.default;

const pageTemplate = (cards, navigations, style) =>
  `<html>
<head>
  <title>Pokedex</title>
  <link rel="stylesheet" href="poke_style.css">
  ${style}
</head>

<body>
  <div class="body">
    <div class="sidebar">
    <a href="index.html"><li id="all">All</li></a>
      ${navigations}
    </div>
    <div class="card-container">
      ${cards}
    </div>
  </div>
</body>

</html>`;

const CARDTEMPLATE = Deno.readTextFileSync("./card_template.html");

const TYPECOLOR = {
  grass: "mediumseagreen",
  poison: "mediumpurple",
  fire: "goldenrod",
  flying: "steelblue",
  water: "dodgerblue",
  bug: "brown",
  normal: "gray",
  ground: "peru",
  fairy: "hotpink",
  fighting: "crimson",
  electric: "hsl(51deg 73% 50%)",
  psychic: "orange",
  rock: "dimgray",
  ice: "darkcyan",
  dragon: "mediumaquamarine",
  ghost: "black",
  dark: "slategray",
  steel: "steelblue",
  all: "dimgray",
};

const listStyleTemplate = (navigation) => {
  return `<style>
    #${navigation}{
      background-color: ${TYPECOLOR[navigation]};
      color : white;
      }
      </style>`;
};

const typeTemplate = (type, index) => {
  return `<div class="type type-${index + 1}" style="background-color : ${
    TYPECOLOR[type]
  }">
                <p>${type}</p>
          </div>`;
};

const listTemplate = (navigation) => {
  return `<a href="${navigation}.html"><li id="${navigation}">${
    formatName(navigation)
  }</li></a>`;
};

const generateTypes = (types) => {
  return types.map((type, index) => typeTemplate(type, index)).join("\n");
};

const generateNavigations = (pokemonTypes) => {
  const types = Object.keys(pokemonTypes);
  return types.map((type) => listTemplate(type)).join("\n");
};

const formatName = (name) => {
  return name[0].toUpperCase() + name.slice(1);
};

const generateReplacementData = (pokemon) => {
  return {
    "${name}": formatName(pokemon.name),
    "${types}": generateTypes(pokemon.types),
    "${url}": pokemon.imgUrl,
    "${weight}": pokemon.weight,
    "${xp}": pokemon.xp,
    "${hp}": pokemon.hp,
    "${attack}": pokemon.attack,
    "${defense}": pokemon.defense,
    "${speed}": pokemon.speed,
  };
};

const generateCards = (pokemons) => {
  const cards = [];

  pokemons.forEach((pokemon) => {
    const replacementData = generateReplacementData(pokemon);
    let page = CARDTEMPLATE;

    for (const data in replacementData) {
      page = page.replaceAll(data, replacementData[data]);
    }

    cards.push(page);
  });

  return cards.join("\n");
};

const separatePokemons = (pokemons) => {
  return pokemons.reduce((pokeTypes, pokemon) => {
    pokemon.types.forEach((type) => {
      if (pokeTypes[type]) {
        pokeTypes[type].push(pokemon);
        return;
      }
      pokeTypes[type] = [];
      pokeTypes[type].push(pokemon);
      return;
    });
    return pokeTypes;
  }, {});
};

const pokemonTypes = separatePokemons(pokemons);
const navigations = generateNavigations(pokemonTypes);

const generateIndexPage = (pokemons, navigations) => {
  const cards = generateCards(pokemons);
  const style = listStyleTemplate("all");
  const page = pageTemplate(cards, navigations, style);

  Deno.writeTextFileSync("./index.html", page);
};

const generateTypesPages = (types, navigations) => {
  for (const type in types) {
    const cards = generateCards(types[type]);
    const style = listStyleTemplate(type);
    const page = pageTemplate(cards, navigations, style);

    Deno.writeTextFileSync(`./${type}.html`, page);
  }
};

generateIndexPage(pokemons, navigations);
generateTypesPages(pokemonTypes, navigations);

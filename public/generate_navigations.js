const separatePokemons = (pokemons) => {
  return pokemons.reduce((pokeTypes, pokemon) => {
    pokemon.types.forEach((type) => {
      pokeTypes[type] ||= [];
      pokeTypes[type].push(pokemon);
    });

    return pokeTypes;
  }, {});
};

const format = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const generateNavigation = (type, href) => {
  const anchor = document.createElement("a");
  anchor.href = href;

  const list = document.createElement("li");

  list.id = type;
  list.innerText = format(type);
  anchor.appendChild(list);

  return anchor;
};

export const generateNavigations = (pokemons) => {
  const pokeTypes = separatePokemons(pokemons);
  console.log(pokeTypes);
  
  const allLink = generateNavigation("all", "index.html");

  const navigations = Object.keys(pokeTypes).map((type) => {
    const href = `${type}.html`;
    return generateNavigation(type, href);
  });

  return [allLink, ...navigations];
};

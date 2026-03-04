const separatePokemons = (pokemons) => {
  const all = []
  const pokeTypes = {all : []}
  return pokemons.reduce((pokeTypes, pokemon) => {
    all.push(pokemon);
    pokemon.types.forEach((type) => {
      if (pokeTypes[type]) {
        pokeTypes[type].push(pokemon);
        return;
      }
      pokeTypes[type] = [];
      pokeTypes[type].push(pokemon);
      return;
    });

    pokeTypes.all = all

    return pokeTypes;
  }, pokeTypes);
};

const format = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}

const generateNavigation = (type) => {
  const anchor = document.createElement("a");
  anchor.href = `${type === "all" ? "index" : type}.html`

  const list = document.createElement("li");
  list.id = type;
  list.innerText = format(type);
  anchor.appendChild(list);

  return anchor
}

export const generateNavigations = (pokemons) => {
  const pokeTypes = separatePokemons(pokemons);
  console.log(pokeTypes);

  const navigations = Object.keys(pokeTypes).map(generateNavigation);
  return navigations
}
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

const createImage = (pokemon) => {
  const image = document.createElement("img");
  image.src = `${pokemon.imgUrl}`;
  image.alt = `${pokemon.name}`;

  return image;
};

const createImageContainer = (pokemon) => {
  const imageContainer = document.createElement("div");

  imageContainer.className = "image-container";

  const image = createImage(pokemon);

  imageContainer.appendChild(image);

  return imageContainer;
};

const generateType = (type, index) => {
  const typeDiv = document.createElement("div");

  typeDiv.classList.add("type", `type-${index + 1}`);
  typeDiv.style.backgroundColor = TYPECOLOR[type];

  const typeName = document.createElement("p");
  typeName.innerText = type;

  typeDiv.appendChild(typeName);

  return typeDiv;
};

const createTypes = (types) => {
  return types.map((type, index) => generateType(type, index));
};

const createNameHeading = (pokemon) => {
  const nameHeading = document.createElement("div");
  nameHeading.classList = "poke-name-type";

  const name = document.createElement("div");
  name.classList = "name";
  name.innerText = pokemon.name;

  const types = document.createElement("div");
  types.classList = "types";

  const typeNames = createTypes(pokemon.types);
  types.append(...typeNames);

  nameHeading.append(name, types);

  return nameHeading;
};

const generateRow = (statName, statValue) => {
  const row = document.createElement("tr");
  const name = document.createElement("td");
  name.classList = "stat-name";
  name.innerText = statName;

  const val = document.createElement("td");
  val.classList = "stat-entry";
  val.innerText = statValue;

  row.append(name, val);

  return row;
};

const createRows = (pokemon) => {
  const tableData = {
    "Base XP": pokemon.xp,
    "Weight": pokemon.weight,
    "HP": pokemon.hp,
    "Attack": pokemon.attack,
    "Defense": pokemon.defense,
    "Speed": pokemon.speed,
  };
   
  const rows = [];

  for (const data in tableData) {
    const row = generateRow(data, tableData[data]);
    rows.push(row);
  }

  return rows;
};

const createTable = (pokemon) => {
  const table = document.createElement("table");
  table.classList = "stats";

  const body = document.createElement("tbody");

  const rows = createRows(pokemon);
  body.append(...rows);

  table.appendChild(body);

  return table;
};

const createTableContainer = (pokemon) => {
  const tableContainer = document.createElement("div");
  tableContainer.classList = "stats-table-container";

  const table = createTable(pokemon);
  tableContainer.append(table);

  return tableContainer;
};

const createDetailContainer = (pokemon) => {
  const detailContainer = document.createElement("div");
  detailContainer.classList = "detail-container";

  const nameHeading = createNameHeading(pokemon);

  const tableContainer = createTableContainer(pokemon);

  detailContainer.append(nameHeading, tableContainer);

  return detailContainer;
};

export const generateCard = (pokemon) => {
  const card = document.createElement("div");
  card.classList = "card";

  const image = createImageContainer(pokemon);
  const details = createDetailContainer(pokemon);

  card.append(image, details);

  return card;
};
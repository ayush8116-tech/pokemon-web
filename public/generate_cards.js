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

const createHTMLElement = ([tag, attributes, textNode]) => {
  const element = document.createElement(tag);
    attributes.forEach(([name, val]) => {
      element.setAttribute(name, val)
    });

  element.innerText = textNode || "";

  return element;
}

const createImage = (pokemon) => {
  const dom = ["img", [["src", pokemon.imgUrl], ["alt", pokemon.name]]]
  const image = createHTMLElement(dom);
  
  return image;
};

const createImageContainer = (pokemon) => {
  const containerDom = ["div", [["class", "image-container"]]]
  const imageContainer = createHTMLElement(containerDom);

  const image = createImage(pokemon);
  imageContainer.appendChild(image);

  return imageContainer;
};

const generateType = (type, index) => {
  const typeDivDom = ["div", [["class", `type type-${index + 1}`],["style", `background-color : ${TYPECOLOR[type]}`]]];
  const typeDiv = createHTMLElement(typeDivDom);

  const typeNameDom = ["p", [["id", "para"]], type];
  const typeName = createHTMLElement(typeNameDom);
  typeDiv.appendChild(typeName);

  return typeDiv;
};

const createTypes = (types) => {
  return types.map((type, index) => generateType(type, index));
};

const createNameHeading = (pokemon) => {
  const nameHeadingDom = ["div", [["class", "poke-name-type"]]]
  const nameHeading = createHTMLElement(nameHeadingDom);

  const nameDom = ["div", [["class", "name"]], pokemon.name]
  const name = createHTMLElement(nameDom);

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

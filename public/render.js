import { createFragment, format } from "./generate_fragment.js";

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

const displayPokemon = (pokemon, type) => {
  const statsData = {
    "Base XP": pokemon.xp,
    "Weight": pokemon.weight,
    "HP": pokemon.hp,
    "Attack": pokemon.attack,
    "Defense": pokemon.defense,
    "Speed": pokemon.speed,
  };

  const cardDom = 
  ["div", 
    { class: "card" },
    [
      ["div",
         { class: "image-container", style:`background-image: linear-gradient(${type === "all" ? TYPECOLOR[pokemon.types[0]] : TYPECOLOR[type]}, white);` },
        [
          [
            "img", 
            { src: pokemon.imgUrl, alt: pokemon.name },
             ""
          ]
        ]
      ],
       ["div",
         {class: "detail-container"},
          [
            [
              "div",
               { class: "poke-name-type" },
               [
                [
                  "div",
                  { class: "name" },
                  format(pokemon.name),
                ], 
                [
                    "div",
                    { class: "types" },
                    pokemon.types.map(( type, index ) => [
                      "div",
                       {
                      class: `type type-${index + 1}`,
                      style: `background-color : ${TYPECOLOR[type]}`,
                    },
                     [
                      [
                        "p",
                         { id: pokemon.name },
                          type
                      ]
                    ]
                  ]),
                  ]
                ]
              ],
               [
                "div",
                 { class: "stats-table-container" },
                  [
                    [
                      "table",
                       {class: "stats"},
                        [
                          [
                            "tbody",
                            { id: "table-body" },
                            Object.entries(statsData).map(( [key, val],) => [
                              "tr",
                               { class: "row" },
                                [
                                  [
                                    "td",
                                     { class: "stat-name" },
                                      key
                                    ],
                                  [
                                    "td",
                                    { class: "stat-entry"},
                                    val
                                  ]
                                ]
                              ]),
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ];

  const card = createFragment(cardDom);

  return card;
};

export const displayAllPokemon = (pokemon, type = "all") => {
  const cardContainer = createFragment(["div", {class:"card-container"}, ""]);
  
  pokemon.forEach((singlePokemon) => {

    cardContainer.appendChild(displayPokemon(singlePokemon,type));
  });

  return cardContainer;
};

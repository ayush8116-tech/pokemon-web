import { displayAllPokemon } from "./render.js";

export const navigate = (pokemon, filteredPokemon) => {
  const form = document.querySelector("form");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const main = document.querySelector(".body");
    const cardContainer = document.querySelector(".card-container");
    
    const fd = new FormData(event.target, event.submitter);
    const { type } = Object.fromEntries(fd.entries());
    
    main.removeChild(cardContainer);
    const newCardContainer = displayAllPokemon(filteredPokemon[type] || pokemon, type);

    main.append(newCardContainer);
  })
};

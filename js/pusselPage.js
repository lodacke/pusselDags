import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"

export function renderPussel (character) {
    main.innerHTML = `<div> ${character.name}</div>`;
}
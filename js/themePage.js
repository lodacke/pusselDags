import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"

export function renderTheme () {
    swapCSS("themePage");

    main.innerHTML = `
    <div> HELLO </div>`;
}
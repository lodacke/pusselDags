import { main } from "/utilities/variables.js";
import {swapCSS} from "/utilities/swapCSS.js";

export function renderLandingPage () {
    swapCSS("homepage");

    main.innerHTML = `
        <button class="start-button">Start</button>`;
}
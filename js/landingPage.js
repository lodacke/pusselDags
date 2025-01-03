import { main } from "/utilities/variables.js";
import {swapCSS} from "/utilities/swapCSS.js";
import { renderTheme } from "./themePage.js";
import { callFunction } from "./index.js";

export function renderLandingPage () {

    document.querySelector(".nav-back").style.opacity = 0;

    swapCSS("homepage");
    
    main.innerHTML = `
        <div class="landing-container"> 
            <div class="banner">
                <H1> Välkommen till Pusseldags!</H1>
            </div>
            <div class="airplane"></div>
        </div>
        <button class="start-button">Start</button>`;

    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
        callFunction(renderTheme);
    })
}


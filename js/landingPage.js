import { main, soundEff } from "/utilities/variables.js";
import {swapCSS} from "/utilities/swapCSS.js";
import { renderTheme } from "./themePage.js";
import { callFunction } from "./index.js";

export function renderLandingPage () {

    document.querySelector(".nav-back").style.display = "none";

    swapCSS("homepage");
    
    main.innerHTML = `  
        <div class="landing-container">
        <img src="./media/airplaine-banner-cord.svg" alt="Välkommen till puzzeldags!"> 
        </div>
        <button class="start-button">Start</button>`;

    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", () => {
        soundEff.play();
        main.querySelector(".landing-container").classList.add("landing-ending")
        main.querySelector(".start-button").classList.add("button-ending")
         setTimeout(() => {
            callFunction(renderTheme); 
        }, 2000); 
    });
}


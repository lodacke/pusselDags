import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"
import {themes} from "/API/themes.js"
import { renderCharacters } from "./characters.js";

export function renderTheme () {
    swapCSS("themePage");

    main.innerHTML = `
    <div class="container">  
    </div>`;
    
    let themeContainer = document.querySelector(".container");
    themes.forEach(theme => {
        let div = document.createElement("div");
        div.innerHTML = `<H2> ${theme.name}</h2>`;
        div.addEventListener("click" , () => {
            renderCharacters(theme);
        })
        themeContainer.append(div);
    }); 
}


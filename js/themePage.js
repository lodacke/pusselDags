import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"
import {themes} from "/API/themes.js"
import { renderCharacters } from "./characters.js";
import { callFunction } from "./index.js";

export function renderTheme () {
    swapCSS("themePage");
    document.querySelector(".nav-back").style.opacity = 1;

    main.innerHTML = `
    <div class="container">  
    </div>`;
    
    let themeContainer = document.querySelector(".container");
    themes.forEach(theme => {
        let div = document.createElement("div");
        div.innerHTML = ` 
        <h2> ${theme.name}</h2>
        <img src="${theme.img}">`;
        div.addEventListener("click" , () => {
            callFunction(() => renderCharacters(theme))
        })
        themeContainer.append(div);
    }); 
}


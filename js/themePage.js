import { swapCSS } from "/utilities/swapCSS.js"
import { main, soundEff } from "/utilities/variables.js"
import {themes} from "/API/themes.js"
import { renderCharacters } from "./characters.js";
import { callFunction } from "./index.js";

export function renderTheme () {
    swapCSS("themePage");
    document.querySelector(".nav-back").style.display = "block";

    main.innerHTML = `
    <div class="container">  
    </div>`;
    
    let themeContainer = document.querySelector(".container");
    themes.forEach(theme => {
        let div = document.createElement("div");
        div.tabIndex = 0;
        div.ariaDescription = `${theme}`;
        div.innerHTML = ` 
        <img src="${theme.img}">
         <h2> ${theme.name}</h2>`;
        div.addEventListener("keydown", (event) => {
            if (event.key === "Enter") { 
                soundEff.play();
                callFunction(() => renderCharacters(theme));
            }
        });
        div.addEventListener("click" , () => {
            soundEff.play();
            callFunction(() => renderCharacters(theme))
        })
        div.classList.add("theme-container");
        themeContainer.append(div); 
    }); 

    let themesDoms = themeContainer.querySelectorAll(".theme-container");

  themesDoms.forEach((theme, index) => {
        setTimeout(() => {
            theme.classList.add("move-in")
        },  index * 900)
    }); 
    
}


import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"
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
    themes.forEach((theme, index)  => {
        let div = document.createElement("div");
        div.innerHTML = ` 
        <h2> ${theme.name}</h2>
        <img src="${theme.img}">`;
        div.addEventListener("click" , () => {
            callFunction(() => renderCharacters(theme))
        })
        div.classList.add("theme-container");
        themeContainer.append(div); 
    }); 

    let themesDoms = themeContainer.querySelectorAll(".theme-container");

  themesDoms.forEach((theme, index) => {
        setTimeout(() => {
            theme.classList.add("move-in")
        }, index * 1000)
    }); // class is still never added. why?
    
}


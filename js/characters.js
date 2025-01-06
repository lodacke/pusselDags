import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"
import {renderPussel} from "./pusselPage.js"
import { callFunction } from "./index.js";

export function renderCharacters (theme) {

    console.log(theme)
    swapCSS("charactersPage");

        document.querySelector(".landscape").style.opacity = "1";

    main.innerHTML = `
    <div class="container">
    </div>`;
    
    let charactersContainer = document.querySelector(".container");
    theme.characters.forEach(character => {
        let div = document.createElement("div");
        div.classList.add(`character_${character.name}`);
        div.classList.add("character");
        div.addEventListener("click", ()=> {
            callFunction(() => renderPussel(character))
        })
        div.innerHTML = `
         <img src="${character.imgTotal}" alt="${character.name}" />`;
        charactersContainer.append(div);
    });

    let characterDoms = main.querySelectorAll(".character")
    characterDoms.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add("move-in")
        }, index * 400)
    }); 
}

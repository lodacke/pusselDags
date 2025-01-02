import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"
import {renderPussel} from "./pusselPage.js"

export function renderCharacters (theme) {
    swapCSS("charactersPage");

    main.innerHTML = `
    <div class="container">
    </div>`;

    console.log(theme.characters);
    
    
    let charactersContainer = document.querySelector(".container");
    theme.characters.forEach(character => {
        let div = document.createElement("div");
        div.classList.add(`character_${character.name}`);
        div.classList.add("character");
        div.addEventListener("click", ()=> {
            renderPussel(character);
        })
        div.innerHTML = `<H2> ${character.name}</H2>
         <img src="${character.imgTotal}" alt="${character.name}" />`;
        charactersContainer.append(div);

    });
}

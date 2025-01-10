import { swapCSS } from "/utilities/swapCSS.js"
import { main, soundEff } from "/utilities/variables.js"
import {renderPussel} from "./pusselPage.js"
import { callFunction } from "./index.js";

export function renderCharacters (theme) {

    swapCSS("charactersPage");

        document.querySelector(".landscape").style.opacity = "1";
        document.querySelector(".main-item").style.opacity = "1";

    main.innerHTML = `
    <div class="container">
    </div>`;
    
    let charactersContainer = document.querySelector(".container");
    theme.characters.forEach(character => {
        let div = document.createElement("div");
        div.classList.add(`character_${character.name}`);
        div.classList.add("character");
        div.tabIndex = 0;
        div.addEventListener("keydown", (event) => {
            if (event.key === "Enter") { 
                console.log("entered")
                //soundEff.play();
                callFunction(() => renderCharacters(theme));
            }
        });
        div.addEventListener("click", ()=> {
            soundEff.play();
            callFunction(() => renderPussel(character))
        });
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

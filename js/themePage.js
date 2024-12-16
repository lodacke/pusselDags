import { swapCSS } from "/utilities/swapCSS.js"
import { main } from "/utilities/variables.js"

export function renderTheme () {
    swapCSS("themePage");

    main.innerHTML = `
    <div class="container">  
    </div>`;

    let themeContainer = document.querySelector(".container");
    for (let i = 0; i < 3; i++) {
        let div = document.createElement("div");
    }
}
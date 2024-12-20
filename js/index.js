import { nav, body, forfront } from "/utilities/variables.js"
import { renderLandingPage } from "/js/landingPage.js"
import { forfrontItems } from "../API/forfront-items.js";

function renderNav(){
    nav.innerHTML = `
    <div class="nav-change-mode day"></div>
    <div class="nav-sound"></div>
    `;

    let changeModeDom = document.querySelector(".nav-change-mode");

    changeModeDom.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");

        switch (currentTheme) {
            case "day":
                body.setAttribute("data-theme", "sunset");
                changeModeDom.classList.remove("day")
                changeModeDom.classList.add("sunset")
                renderForfront("sunset", true)
                break;
            case "sunset":
                body.setAttribute("data-theme", "darkmode");
                changeModeDom.classList.remove("sunset")
                changeModeDom.classList.add("darkmode")
                renderForfront("darkmode", true)
                break;
            case "darkmode":
                body.setAttribute("data-theme", "day");
                changeModeDom.classList.remove("darkmode")
                changeModeDom.classList.add("day")
                renderForfront("day", true)
                break;
        }
    });

renderForfront("day");
}

function renderForfront(mode, change){

    if(!change){
        forfront.innerHTML = `
        <div class="items-container"></div>
        <div class="landscape"></div>
        `;
    } 

    let itemContainer = forfront.querySelector(".items-container");

    forfrontItems.forEach( modeItem=> {
        if(modeItem.name === mode){
            itemContainer.innerHTML = `
            <img src=${modeItem.mainComponent} class="main-item"></img>
            `;

            for (let key in modeItem) {
                if (key.startsWith("small")) { 
                    let smallItem = document.createElement("img");
                    smallItem.src = modeItem[key]; 
                    smallItem.classList.add(`${key}`); 
                    itemContainer.append(smallItem);
                }
            }
        };
    })
}
renderNav();
renderLandingPage();

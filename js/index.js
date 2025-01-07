import { nav, body, forfront } from "/utilities/variables.js"
import { renderLandingPage } from "/js/landingPage.js"
import { forfrontItems } from "../API/forfront-items.js";

let functionStack = [];

export function callFunction(func, ...args) {
    functionStack.push({ func, args });
    func(...args) 
}

function renderNav(){
    nav.innerHTML = `
    <div class="nav-back"></div>
    <div class="nav-change-mode day"></div>
    <div class="nav-sound"></div>
    `;

    let changeModeDom = document.querySelector(".nav-change-mode");
    let navBackDom = document.querySelector(".nav-back")

    changeModeDom.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");

        switch (currentTheme) {
            case "day":
                body.dataset.theme = "sunset";
                changeModeDom.classList.remove("day")
                changeModeDom.classList.add("sunset")
                renderForfront("sunset", true)
                break;
            case "sunset":
                body.dataset.theme = "darkmode";
                changeModeDom.classList.remove("sunset")
                changeModeDom.classList.add("darkmode")
                renderForfront("darkmode", true)
                break;
            case "darkmode":
                body.dataset.theme = "day";
                changeModeDom.classList.remove("darkmode")
                changeModeDom.classList.add("day")
                renderForfront("day", true)
                break;
        }
    });

    navBackDom.addEventListener("click", () => {
        returnStep()
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
            <img src=${modeItem.mainComponent} class="main-item ${mode}-item"></img>
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

export function returnStep(){
    functionStack.pop();
    const previousFunctionData = functionStack[functionStack.length - 1];

    if (previousFunctionData) {
        const { func, args } = previousFunctionData;
        func(...args); 
    } else {
        console.warn("No previous function found in the stack");
    }
}

renderNav();
callFunction(renderLandingPage)

import { nav, body, forfront, bkgSound, soundEff } from "/utilities/variables.js"
import { renderLandingPage } from "/js/landingPage.js"
import { forfrontItems } from "../API/forfront-items.js";

let functionStack = [];

export function callFunction(func, ...args) {
    functionStack.push({ func, args });
    func(...args) 
}

function renderNav(){
    nav.innerHTML = `
    <div tabindex="0" role="button" aria-label="Gå till föregående sida" class="nav-back"></div>
    <div tabindex="0" role="button" aria-label="Ändra bakgrundsfärg" class="nav-change-mode day"></div>
    <div tabindex="0" role="button" aria-label="Stoppa eller start musik" class="nav-sound"></div>
    `;

    let changeModeDom = document.querySelector(".nav-change-mode");
    let navBackDom = document.querySelector(".nav-back")
    let soundNav = document.querySelector(".nav-sound");

    changeModeDom.addEventListener("click", handleChangeMode);

    changeModeDom.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleChangeMode();
        }
    });

    function handleNavBack() {
        soundEff.play();
        returnStep();
        }

    navBackDom.addEventListener("click", handleNavBack);

    navBackDom.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleNavBack();
        }
    });

    function handleSoundToggle() {
        if (bkgSound.paused) {
            bkgSound.play();
            soundNav.classList.remove("sound-off");
            soundEff.ariaLabel = "ljud på";
        } else {
            bkgSound.pause();
            soundNav.classList.add("sound-off");
            soundEff.ariaLabel = "ljud av";
        }
    }

    soundNav.addEventListener("click", handleSoundToggle);

    soundNav.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSoundToggle();
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
            <img src=${modeItem.mainComponent} class="main-item ${mode}-item"></img alt="sol eller måne, beroende på vilket mood">
            `;

            for (let key in modeItem) {
                if (key.startsWith("small")) { 
                    let smallItem = document.createElement("img");
                    smallItem.ariaDescription="This content is hidden";
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
    soundEff.play();
    const previousFunctionData = functionStack[functionStack.length - 1];

    if (previousFunctionData) {
        const { func, args } = previousFunctionData;
        func(...args); 
    } else {
        console.warn("No previous function found in the stack");
    }
}

function handleChangeMode() {
    soundEff.play();
    const currentTheme = body.getAttribute("data-theme");
    const changeButton = document.querySelector(".nav-change-mode")

    switch (currentTheme) {
        case "day":
            body.dataset.theme = "sunset";
            changeButton.classList.remove("day");
            changeButton.classList.add("sunset");
            changeButton.ariaLabel = "solnedgång";
            renderForfront("sunset", true);
            break;
        case "sunset":
            body.dataset.theme = "darkmode";
            changeButton.classList.remove("sunset");
            changeButton.classList.add("darkmode");
            changeButton.ariaLabel = "mörkerläge";
            renderForfront("darkmode", true);
            break;
        case "darkmode":
            body.dataset.theme = "day";
            changeButton.classList.remove("darkmode");
            changeButton.classList.add("day");
            changeButton.ariaLabel = "dag-läge";
            renderForfront("day", true);
            break;
    }
}

renderNav();
callFunction(renderLandingPage)

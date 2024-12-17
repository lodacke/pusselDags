import { nav, body } from "/utilities/variables.js"
import { renderLandingPage } from "/js/landingPage.js"

function renderNav(){
    nav.innerHTML = `
    <div class="nav-darkmode"></div>
    <div class="nav-sunset"></div>
    <div class="nav-sound"></div>
    `;

    let darkmodeDom = document.querySelector(".nav-darkmode");
    let sunsetDom = document.querySelector(".nav-sunset");

    darkmodeDom.addEventListener("click", () => {
        body.setAttribute("data-theme", "darkmode")
    })

    sunsetDom.addEventListener("click", () => {
        body.setAttribute("data-theme", "sunset")
    })

}

renderNav();
renderLandingPage();

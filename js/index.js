import { nav } from "/utilities/variables.js"
import { renderLandingPage } from "/js/landingPage.js"

function renderNav(){
    nav.innerHTML = `
    <div class="nav-darkmode"></div>
    <div class="nav-sunset"></div>
    <div class="nav-sound"></div>
    `;

}

renderNav();
renderLandingPage();

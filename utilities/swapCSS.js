export function swapCSS(theme){
    let style = document.getElementById("theme");
    style.setAttribute('href', `CSS/${theme}.css`)
}
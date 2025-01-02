import { swapCSS } from "/utilities/swapCSS.js";
import { main } from "/utilities/variables.js";

export function renderPussel(character) {
    swapCSS("puzzle");

    main.innerHTML = `
    <div class="puzzle-container">
        <div class="l-puzzle-container">
            <img class="puzzle-piece" draggable="true" id="piece1" src="${character.pussel1}" />
            <img class="puzzle-piece" draggable="true" id="piece2" src="${character.pussel3}" />
        </div>
        <div id="outline">
            <img class="puzzle-outline" src="${character.pusselOutline}" />
        </div>
        <div class="r-puzzle-container">
            <img class="puzzle-piece" draggable="true" id="piece3" src="${character.pussel2}" />
            <img class="puzzle-piece" draggable="true" id="piece4" src="${character.pussel4}" />
        </div>
    </div>`;

    const puzzlePieces = document.querySelectorAll(".puzzle-piece");
    const outline = document.getElementById("outline");
    outline.style.maxHeight = character.maxHeight  + "px";

    puzzlePieces.forEach(piece => {
        piece.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id); 
        });
    });

    outline.addEventListener("dragover", (event) => {
        event.preventDefault(); 
    });

    outline.addEventListener("drop", (event) => {
        event.preventDefault();
        let pieceId = event.dataTransfer.getData("text/plain");
        let piece = document.getElementById(pieceId);
        outline.append(piece)
        
        piece.style.position = "absolute";
        switch (piece.id) {
        case "piece1":
            piece.style.left = "0%";  
            piece.style.top = "0%";  
            break;
        case "piece2":
            piece.style.left = "0%";  
            piece.style.top = "50%";  
            break;
        case "piece3":
            piece.style.left = "50%"; 
            piece.style.top = "0%";   
            break;
        case "piece4":
            piece.style.left = "50%";  
            piece.style.top = "50%";   
            break;
        }

    });
}
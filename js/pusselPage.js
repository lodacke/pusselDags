import { swapCSS } from "/utilities/swapCSS.js";
import { main } from "/utilities/variables.js";

export function renderPussel(character) {
    swapCSS("puzzle");
    let counter = 0;

    main.innerHTML = `
    <div class="puzzle-container">
            <div id="outline">
            <img class="puzzle-outline" src="${character.pusselOutline}" />
        </div>
        <div class="puzzle-container-pieces">
            <img class="puzzle-piece" draggable="true" id="piece3" src="${character.pussel2}" />
            <img class="puzzle-piece" draggable="true" id="piece1" src="${character.pussel1}" />
            <img class="puzzle-piece" draggable="true" id="piece2" src="${character.pussel3}" />
            <img class="puzzle-piece" draggable="true" id="piece4" src="${character.pussel4}" />
        </div>
    </div>`;

    document.querySelector(".landscape").style.opacity = "0";

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
        counter++;
        
        piece.style.position = "absolute";
        switch (piece.id) {
        case "piece1":
            piece.style.left = "0%";  
            piece.style.top = "0%";  
            break;
        case "piece2":
            piece.style.left = "0%";  
            piece.style.top = "88%";  
            break;
        case "piece3":
            piece.style.left = "50%"; 
            piece.style.top = "0%";   
            break;
        case "piece4":
            piece.style.left = "50%";  
            piece.style.top = "88%";   
            break;
        }

        if(counter === 4){
            console.log("puzzle completed!")
            renderFinished(character)
        }
    });
}

function renderFinished(character){
    setTimeout(() => {
        let container = main.querySelector("#outline");
        while (container.firstChild) {
            container.removeChild(container.firstChild); 
        }
        container.innerHTML = `<img class="puzzle-finish" src="${character.imgTotal}">`;

        let retryButton = document.createElement("button");
        retryButton.innerText = "Spela igen";
        let puzzleContainer = document.querySelector(".puzzle-container")
        puzzleContainer.classList.add("puzzle-container-after");
        puzzleContainer.append(retryButton)

        retryButton.addEventListener("click", () => {
            renderPussel(character)
        })
    }, 600)


}
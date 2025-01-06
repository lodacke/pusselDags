import { swapCSS } from "/utilities/swapCSS.js";
import { main } from "/utilities/variables.js";

export function renderPussel(character) {
    swapCSS("puzzle");
    let counter = 0;

    console.log(character.theme)

    main.innerHTML = `
    <div class="puzzle-container">
            <div id="outline">
            <img class="puzzle-outline" src="${character.outline}" />
        </div>
        <div class="puzzle-container-pieces ${character.theme}">
        </div>
    </div>`;

    let puzzleOrder = [2, 1, 3, 4, 9, 6, 8, 7, 5]
    let i = 0;

    for (let key in character) {
    if (key.startsWith("pussel")) { 
        let piece = document.createElement("img");
        piece.classList.add("puzzle-piece");
        piece.setAttribute("id", `piece${puzzleOrder[i]}`);   
        piece.setAttribute("draggable", "true");
        piece.src = character[key]; 
        main.querySelector(".puzzle-container-pieces").append(piece);
        i++;
    }
}

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
        switch (character.theme){
            case "Babblarna":
                switch (piece.id) {
                    case "piece1":
                        piece.style.left = "50%";  
                        piece.style.top = "0%";  
                        break;
                    case "piece2":
                        piece.style.left = "0%";  
                        piece.style.top = "0%";  
                        break;
                    case "piece3":
                        piece.style.left = "0%"; 
                        piece.style.top = "89%";   
                        break;
                    case "piece4":
                        piece.style.left = "50%";  
                        piece.style.top = "89%";   
                        break;
                }

            if(counter === 4){ 
                console.log("puzzle completed!")
                renderFinished(character)
            }
        case "Bamse":
            console.log("Bamse is theme")
            switch(piece.id){
                case "piece1":
                    piece.style.left = "33.3%";  
                    piece.style.top = "0%";  
                    break;
                case "piece2":
                    piece.style.left = "66.6%";  
                    piece.style.top = "0%";  
                    break;
                case "piece3":
                    piece.style.left = "0%"; 
                    piece.style.top = "0%";   
                    break;
                case "piece4":
                    piece.style.left = "66.6%";  
                    piece.style.top = "46%";   
                    break; 
                case "piece5":
                    piece.style.left = "0%";  
                    piece.style.top = "92.4%";   
                    break; 
                case "piece6":
                    piece.style.left = "0%";  
                    piece.style.top = "46%";   
                    break; 
                case "piece7":
                    piece.style.left = "33.3%";  
                    piece.style.top = "92.4%";   
                    break; 
                case "piece8":
                    piece.style.left = "66.6%";  
                    piece.style.top = "92.4%";  
                    break; 
                case "piece9":
                    piece.style.left = "33.3%";  
                    piece.style.top = "46%";   
                    break; 
                }   

            if(counter === 9){
                console.log("puzzle completed!")
                renderFinished(character)
            }

        }

    });
}

function renderFinished(character){
    setTimeout(() => {
        let container = main.querySelector("#outline");
        while (container.firstChild) {
            container.removeChild(container.firstChild); 
        }
        container.innerHTML = `<img class="puzzle-finish" src="${character.imgPuzzle}">`;

        let retryButton = document.createElement("button");
        retryButton.innerText = "Spela igen";
        let puzzleContainer = document.querySelector(".puzzle-container")
        let puzzlePicesC = document.querySelector(`.${character.theme}`);
        puzzlePicesC.style.display = "none";
        puzzleContainer.classList.add("puzzle-container-after");
        puzzleContainer.append(retryButton)

        retryButton.addEventListener("click", () => {
            renderPussel(character)
        })
    }, 600)


}

/*            <img class="puzzle-piece" draggable="true" id="piece3" src="${character.pussel2}" />
            <img class="puzzle-piece" draggable="true" id="piece1" src="${character.pussel1}" />
            <img class="puzzle-piece" draggable="true" id="piece2" src="${character.pussel3}" />
            <img class="puzzle-piece" draggable="true" id="piece4" src="${character.pussel4}" /> */
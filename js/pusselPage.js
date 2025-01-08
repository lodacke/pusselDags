import { swapCSS } from "/utilities/swapCSS.js";
import { main } from "/utilities/variables.js";

export function renderPussel(character) {
    swapCSS("puzzle");
    let counter = 0;

    main.innerHTML = `
    <div class="puzzle-container">
        <div id="outline">
            <img class="puzzle-outline" src="${character.outline}" />
        </div>
        <div class="puzzle-container-pieces ${character.theme}">
        </div>
    </div>`;

    let puzzleOrder = [2, 1, 3, 4, 9, 6, 8, 7, 5];
    let i = 0;

    for (let key in character) {
        if (key.startsWith("pussel")) {
            let piece = document.createElement("img");
            piece.classList.add("puzzle-piece");
            piece.id = `piece${puzzleOrder[i]}`;
            piece.draggable = true;
            piece.src = character[key];
            main.querySelector(".puzzle-container-pieces").append(piece);
            i++;
        }
    }

    document.querySelector(".landscape").style.opacity = "0";

    const puzzlePieces = document.querySelectorAll(".puzzle-piece");
    const outline = document.getElementById("outline");

    const piecePositions = {
        Babblarna: {
                piece1: { left: "203px", top: "0px"},
                piece2: { left: "0px", top: "0px"},
                piece3: { left: "0px", top: "195px"},
                piece4: { left: "203px", top: "195px"},
            },
        Bamse: {
            piece1: { left: "135px", top: "0px"},
            piece2: { left: "270px", top: "0px"},
            piece3: { left: "0px", top: "0px"},
            piece4: { left: "270px", top: "130px"},
            piece5: { left: "0px", top: "260px"},
            piece6: { left: "0px", top: "130px"},
            piece7: { left: "135px", top: "260px"},
            piece8: { left: "270px", top: "260px"},
            piece9: { left: "135px", top: "130px"},
        },
    };

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

        const targetPosition = piecePositions[character.theme][piece.id];
        outline.append(piece)

        const targetRect = outline.getBoundingClientRect(); 
        const pieceRect = piece.getBoundingClientRect(); 
    
        console.log("Outline position:", targetRect); 
        console.log("Piece position:", pieceRect); 


        if (targetPosition) { 
            piece.style.position = "absolute";
            piece.style.left = targetPosition.left;
            piece.style.top = targetPosition.top;

            counter++;

            let pieceCount = 0;
            for (let key in piecePositions[character.theme]) {
                pieceCount++;
            }

            if (counter === pieceCount) {
                console.log("Puzzle completed!");
                renderFinished(character);
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

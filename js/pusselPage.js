import { swapCSS } from "/utilities/swapCSS.js";
import { main } from "/utilities/variables.js";

export function renderPussel(character) {
    swapCSS("puzzle");
    let counter = 0;

    document.querySelector(".landscape").style.opacity = "0";
    document.querySelector(".main-item").style.opacity = "0";

    main.innerHTML = `
    <div class="puzzle-container">
        <div id="outline">
            <img class="puzzle-outline" src="${character.outline}" alt="Pussel container" tabindex=0/>
        </div>
        <div class="puzzle-container-pieces ${character.theme}">
        </div>
        <audio id="pop-effect" src="./media/audio/button-click-1.wav"></audio>
    </div>`;

    let puzzleOrder = [2, 1, 3, 4, 9, 6, 8, 7, 5];
    let i = 0;

    for (let key in character) {
        if (key.startsWith("pussel")) {
            let piece = document.createElement("img");
            piece.classList.add("puzzle-piece");
            piece.tabIndex = 0;
            piece.id = `piece${puzzleOrder[i]}`;
            piece.ariaDescription = `pusselbit ${i}`;
            piece.draggable = true;
            piece.src = character[key];
            piece.alt = "Pusselbit";
            main.querySelector(".puzzle-container-pieces").append(piece);
            i++;
        }
    }

    const puzzlePieces = document.querySelectorAll(".puzzle-piece");
    const outline = document.getElementById("outline");

    const piecePositions = {

        Babblarna: {
                piece1: { left: 202, top: 0},
                piece2: { left: 0, top: 0},
                piece3: { left: 0, top: 195},
                piece4: { left: 202, top: 195},
            },
        Bamse: {
            piece1: { left: 135, top: 0},
            piece2: { left: 270, top: 0},
            piece3: { left: 0, top: 0},
            piece4: { left: 270, top: 130},
            piece5: { left: 0, top: 260},
            piece6: { left: 0, top: 130},
            piece7: { left: 135, top: 260},
            piece8: { left: 270, top: 260},
            piece9: { left: 135, top: 130},
        },
        pawpatrol: {
            piece1: { left: 135, top: 0},
            piece2: { left: 270, top: 0},
            piece3: { left: 0, top: 0},
            piece4: { left: 270, top: 130},
            piece5: { left: 0, top: 260},
            piece6: { left: 0, top: 130},
            piece7: { left: 135, top: 260},
            piece8: { left: 270, top: 260},
            piece9: { left: 135, top: 130},
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

        const dropX = event.clientX;
        const dropY = event.clientY;

        let containerRect = outline.getBoundingClientRect();
        let pieceRect = piece.getBoundingClientRect();
        let pieceWidth = pieceRect.width;
        let pieceHeight = pieceRect.height;

        let targetPosition = piecePositions[character.theme][piece.id];

        let dropArea = {
            left: containerRect.left + targetPosition.left,  
            top: containerRect.top + targetPosition.top,
            right: containerRect.left + targetPosition.left + pieceWidth,
            bottom: containerRect.top + targetPosition.top+ pieceHeight
        };


        let corrArea = dropX >= dropArea.left && dropX <= dropArea.right &&
                              dropY >= dropArea.top && dropY <= dropArea.bottom;

        if (corrArea) {
            main.querySelector("#pop-effect").play();
            piece.style.position = "absolute";
            piece.style.left = `${targetPosition.left}px`; 
            piece.style.top = `${targetPosition.top}px`;    
            outline.append(piece);
            counter++;

            let pieceCount = 0;
            for (let key in piecePositions[character.theme]) {
                pieceCount++;
            }
            if (counter === pieceCount) {
                console.log("Puzzle completed!");
                renderFinished(character);
            }

        } else {
            console.log("Piece placed in the wrong area.");
        }
    });
}

function renderFinished(character){
    setTimeout(() => {
        let container = main.querySelector("#outline");
        while (container.firstChild) {
            container.removeChild(container.firstChild); 
        }
        container.innerHTML = `
        <audio src="/media/audio/win.wav"></audio>
        <img class="puzzle-finish" src="${character.imgPuzzle}">`;
        container.querySelector("audio").play()
        let retryButton = document.createElement("button");
        retryButton.ariaLabel = "Spela igen";
        retryButton.innerText = "Spela igen";
        retryButton.tabIndex = 0;
        
        let puzzleContainer = document.querySelector(".puzzle-container")
        let picesC = document.querySelector(`.${character.theme}`);
        picesC.style.display = "none";
        puzzleContainer.classList.add("puzzle-container-after");
        puzzleContainer.append(retryButton)

        retryButton.addEventListener("click", () => {
            renderPussel(character)
        })
    }, 600)
}

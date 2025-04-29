function Gameboard() {
    const board = [];

    for (i = 0; i < 9; i++) {
        board.push("");
    }

    const move = (place, player) =>  {
        // Make sure place is not already taken
        if (!board[place]) {
            // Place marker
            board.splice(place, 1, player);
            return true;
        }
    };

    const getBoard = () => board;

    const resetBoard = () => {
        for (i = 0; i < 9; i++) {
            board.splice(i, 1, "");
        }
    }
    
    return {move, getBoard, resetBoard}
};


let winner;
let tie;

function gameController(playerOneName, playerTwoName) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(board.getBoard());
    }

    

    const checkForWin = () => {
        const win = board.getBoard();

        const winningLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
    
        const hasWinner = winningLines.some(([a, b, c]) => 
            win[a] && win[a] === win[b] && win[a] === win[c]
        );

        const hasTie = win.every(place => place);
    
        if (hasWinner) winner = true;
        if (hasTie) tie = true;
    };

    const takeTurn = (place) => {
        // Make move and check sure place isn't already taken
        const placeCheck = board.move(place, getActivePlayer().token);

        // Only run if place isn't already taken
        if (placeCheck === true) {
            checkForWin();
            printNewRound();
            // Check for winner or a tie
            if (!winner && !tie) switchPlayerTurn();
        }
    };

    
    // Initialise game
    printNewRound();

    return {takeTurn, getActivePlayer, getBoard: board.getBoard, resetBoard: board.resetBoard};
};


/* game.takeTurn(3) */



function ScreenController(playerOneName, playerTwoName) {
    const game = gameController(playerOneName, playerTwoName);
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        if (winner) {
            playerTurnDiv.textContent = `${activePlayer.name} WINS`;
        } else if (tie && !winner) {
            playerTurnDiv.textContent = `TIE`;
        } else {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        }

        board.forEach((element, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");

            cellButton.dataset.cell = index;

            cellButton.textContent = element;
            boardDiv.appendChild(cellButton);
        })
    }

    function clickHandlerBoard(e) {
        const cell = e.target.dataset.cell;
        // Make sure I've clicked a column and not the gaps in between
        if (!cell) return;
        
        game.takeTurn(cell);
        updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();

    // New Game button
    document.getElementById("newGameBtn").addEventListener("click", () => {
        winner = null;
        tie = null;
        game.resetBoard();
        updateScreen();
    })
}


const dialog = document.querySelector("dialog");
dialog.showModal();

const playerOneName = document.querySelector("#playerOneName");
const playerTwoName = document.querySelector("#playerTwoName");


document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    ScreenController(playerOneName.value, playerTwoName.value);
})
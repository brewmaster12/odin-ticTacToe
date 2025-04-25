function Gameboard() {
    const board = [];

    for (i = 0; i < 9; i++) {
        board.push("");
    }

    const move = (place, player) =>  {
        // Make sure place is not already taken
        if (!board[place]) {
            // Place marker
            board.splice(place, 1, player)
        } else console.log("THAT PLACE IS ALREADY TAKEN");
    };

    const getBoard = () => board;
    
    return {move, getBoard}
};



function gameController() {
    const board = Gameboard();

    const players = ["X", "O"];

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
    
        if (hasWinner) console.log("WIN");
    };

    const takeTurn = (place) => {
        board.move(place, getActivePlayer());

        switchPlayerTurn();
        printNewRound();
        checkForWin();
    };

    
    // Initialise game
    printNewRound();

    return {takeTurn};
};

const game = gameController();

/* console.log(game.takeTurn(3)); */
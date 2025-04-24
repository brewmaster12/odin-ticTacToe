function Gameboard() {
    const board = [];

    for (i = 0; i < 9; i++) {
        board.push("");
    }

    const move = (place, player) =>  {
        if (!board[place]) {
        board.splice(place, 1, player)
        } else console.log("THAT PLACE IS ALREADY OCCUPIED");
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

    const takeTurn = (place) => {
        board.move(place, getActivePlayer());

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {takeTurn};
};

const game = gameController();

/* console.log(game.takeTurn(4)); */
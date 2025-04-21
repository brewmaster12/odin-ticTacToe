function Gameboard() {
    const board = ["","","","","","","","",""];

    return {
        move(place, player) {
            board.splice(place, 1, player)
        },
        getBoard() {
            return {board};
        }
    }
};

const turn = Gameboard();
turn.move(2, "X");
turn.move(4, "O");

console.log(turn.getBoard());
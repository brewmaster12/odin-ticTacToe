const Gameboard = (function() {
    const board = ["","","","","","","","",""];

    return {
        move(place, player) {
            board.splice(place, 1, player)
        },
        getBoard() {
            return {board};
        }
    }
})();

Gameboard.move(2, "X");
Gameboard.move(4, "O");

console.log(Gameboard.getBoard());
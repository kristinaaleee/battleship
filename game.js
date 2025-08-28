// building game board in dom
export { Board, GameOver };
// initial form page for player name
// page for ship placement

function Board(){
    const boardWrapper = document.createElement('div');
    boardWrapper.setAttribute('id', 'board-wrapper');

    for (let i = 0; i < 100; i++){
        const square = document.createElement('div')
        square.setAttribute('class', 'square')

        boardWrapper.appendChild(square);
    }
    return boardWrapper;
}

function GameOver(){
    const overWrapper = document.createElement('div');
    overWrapper.setAttribute('id', 'game-over');
    overWrapper.innerHTML = 'Game Over'

    // button to reset game?
    return overWrapper;
}
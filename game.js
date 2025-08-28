// building game board in dom
<<<<<<< HEAD
export { Board };

function Board(){
    const boardWrapper = document.createElement('div') 
    boardWrapper.setAttribute('id', 'board-wrapper')
=======
export { Board, GameOver };
// initial form page for player name
// page for ship placement

function Board(){
    const boardWrapper = document.createElement('div');
    boardWrapper.setAttribute('id', 'board-wrapper');
>>>>>>> 3a5fe67cae35273cf35bc6c1a509fb7767c5cb28

    for (let i = 0; i < 100; i++){
        const square = document.createElement('div')
        square.setAttribute('class', 'square')

<<<<<<< HEAD
        boardWrapper.appendChild(square)
    }
    return boardWrapper;
=======
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
>>>>>>> 3a5fe67cae35273cf35bc6c1a509fb7767c5cb28
}
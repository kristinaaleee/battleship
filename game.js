// building game board in dom
export { Board };

function Board(){
    const boardWrapper = document.createElement('div') 
    boardWrapper.setAttribute('id', 'board-wrapper')

    for (let i = 0; i < 100; i++){
        const square = document.createElement('div')
        square.setAttribute('class', 'square')

        boardWrapper.appendChild(square)
    }
    return boardWrapper;
}
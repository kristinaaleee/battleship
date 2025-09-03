// building game board in dom
export { Board, GameOver, Form };
// initial form page for player name
// page for ship placement

function Form(){
    const formWrapper = document.createElement('form')
    formWrapper.setAttribute ('onSubmit', 'return false')
    const nameInput = document.createElement('input')
    nameInput.placeholder = 'Please enter name'
    nameInput.required = true

    const submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.setAttribute('type', 'button')
    
    formWrapper.appendChild(nameInput)
    formWrapper.appendChild(submitButton)
    return formWrapper
}

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
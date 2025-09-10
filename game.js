// building game board in dom
export { Board, GameOver, Form, ShipPlacement };
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
    return formWrapper;
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

function ShipPlacement(){
    const placementWrapper = document.createElement('div');
    placementWrapper.setAttribute('id', 'placement-wrapper');

    const allShipWrapper = document.createElement('div');
    const board = Board();

    const ships = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol'];
    ships.forEach(ship => {
        // Create Dom
        const shipWrapper = document.createElement('div');
        shipWrapper.setAttribute('id', ship);
        shipWrapper.setAttribute('draggable', true);
        shipWrapper.classList.add('ship-wrapper')

        const shipName = document.createElement('h4');
        shipName.textContent = ship;

        // shipImg = document.createElement('img');
        // shipImg.setAttribute('src', `ships/${ship}.png`);

        shipWrapper.appendChild(shipName);
        allShipWrapper.appendChild(shipWrapper);

        shipWrapper.addEventListener('dragstart', dragStart);

    })

    function dragStart(e){
        const currentShip = e.target.id
        console.log(shipLengths[currentShip])
        e.dataTransfer.setData('text/plain', shipLengths[currentShip])
    }

    const shipLengths = {carrier: '5', battleship: '4', destroyer: '3', submarine: '3', patrol: '2'}

    // const boardChildren = board.childNodes
    // boardChildren.forEach(square => {
    //     square.addEventListener('dragover', dragOver);
    //     square.addEventListener('dragleave', dragLeave);
    //     square.addEventListener('drop', drop);
    // })
    // function dragOver(e){
    //     e.preventDefault();
    //     e.target.classList('drag-over')
    // }
    placementWrapper.appendChild(board);
    placementWrapper.appendChild(allShipWrapper);

    return placementWrapper
}
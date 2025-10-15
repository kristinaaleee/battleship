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

    const overText = document.createElement('p')
    overText.textContent = 'Game Over'

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again?'

    resetButton.addEventListener('click', () => {
        window.location.reload();
    })

    overWrapper.appendChild(overText);
    overWrapper.appendChild(resetButton);
    // button to reset game?
    return overWrapper;
}

function ShipPlacement(){
    const placementWrapper = document.createElement('div');
    placementWrapper.setAttribute('id', 'placement-wrapper');

    const axisButton = document.createElement('button');
    axisButton.textContent = 'X Axis'
    let axis = 'x'
    axisButton.addEventListener('click', () => {
        if(axisButton.textContent === 'X Axis'){
            axisButton.textContent = 'Y Axis'
            axis = 'y'
        }
        else{
            axisButton.textContent = 'X Axis'
            axis = 'x'
        }
    })

    const allShipWrapper = document.createElement('div');
    allShipWrapper.setAttribute('id', 'shipWrapper')
    const board = Board();

    const ships = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol'];
    ships.forEach(ship => {
        // Create Dom
        const shipDiv = document.createElement('div');
        shipDiv.setAttribute('id', ship);
        shipDiv.setAttribute('draggable', true);
        shipDiv.classList.add('ship-wrapper')

        const shipName = document.createElement('h4');
        shipName.textContent = ship;

        // shipImg = document.createElement('img');
        // shipImg.setAttribute('src', `ships/${ship}.png`);

        shipDiv.appendChild(shipName);
        allShipWrapper.appendChild(shipDiv);

        shipDiv.addEventListener('dragstart', dragStart);

    })

    function dragStart(e){
        const currentShip = e.target.id;
        e.dataTransfer.setData('text/plain', currentShip);
    }

    const shipInfo = {
        carrier: {length: '5'}, 
        battleship: {length: '4'},
        destroyer: {length: '3'},
        submarine: {length: '3'},
        patrol: {length: '2'}
    }
    const boardChildren = board.childNodes
    boardChildren.forEach((square, index) => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', (e) => {
            drop(e, index);
        });
    })
    function dragOver(e){
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragLeave(e){
        e.preventDefault();
        e.target.classList.remove('drag-over');
    }

    function drop(e, index){
        e.target.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        let shipLength = shipInfo[id]['length'];
        const draggedShip = document.getElementById(id);


        // check for overlap or off board
        for (let i = 1; i < shipLength; i++){
            let testIndex;
            if (axis === 'x'){
                testIndex = index + i
                if ((testIndex) % 10 === 0 ) return;
            }
            if (axis === 'y'){
                testIndex = index - (10 * i)
                if ((testIndex) < 0) return;
            }
            if (boardChildren[testIndex].classList.contains('dragged-ship') ||
                boardChildren[index].classList.contains('dragged-ship')){
                return
            }
        }

        shipInfo[id]['axis'] = axis;
        shipInfo[id]['index'] = index;
        
        // Add visual for placed ship on dom
        while (shipLength > 0){
            boardChildren[index].classList.add('dragged-ship');
            if (axis === 'x'){
                index++
            }
            else{
                index -= 10
            }
            shipLength--
        }

        e.target.appendChild(draggedShip);
        draggedShip.classList.remove('hide');
    }

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm'
    confirmButton.addEventListener('click', () =>{
        if(allShipWrapper.childNodes.length != 0){
            alert('Please finish placing ships');
        }
        else{
            document.dispatchEvent(new Event('placeShips'));
        }
    })
    // ship wrapper empty can proceed with submit button
    placementWrapper.appendChild(axisButton)
    placementWrapper.appendChild(board);
    placementWrapper.appendChild(allShipWrapper);
    placementWrapper.appendChild(confirmButton)

 
    return {placementWrapper, shipInfo};
}
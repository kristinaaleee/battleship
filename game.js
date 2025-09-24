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
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    const shipLengths = {carrier: '5', battleship: '4', destroyer: '3', submarine: '3', patrol: '2'}

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
        e.target.classList.remove('dragged-ship')
    }

    function drop(e, index){
        e.target.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        let length = shipLengths[id];
        const draggedShip = document.getElementById(id);

        e.target.appendChild(draggedShip);

        draggedShip.classList.remove('hide');

        while (length > 0){
            boardChildren[index].classList.add('dragged-ship');
            if (axis === 'x'){
                index++
            }
            // double check function direction
            else{
                index -= 10
            }
            length--
        }
    }

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm'
    confirmButton.addEventListener('click', () =>{
        if(allShipWrapper.childNodes.length != 0){
            alert('Please finish placing ships');
        }
        else{
            alert('You good to go');
        }
    })
    // ship wrapper empty can proceed with submit button
    placementWrapper.appendChild(axisButton)
    placementWrapper.appendChild(board);
    placementWrapper.appendChild(allShipWrapper);
    placementWrapper.appendChild(confirmButton)


    return placementWrapper
}
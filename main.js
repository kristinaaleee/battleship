import { Player } from './script.js'
import { Board, GameOver, Form, ShipPlacement } from './game.js'

const container = document.getElementById('container');

/* Page 1: Form to enter player name */
const form = Form()
let input = form[0]
let nameSubmit = form[1]

container.appendChild(form)

// Submit with enter
input.addEventListener('keypress', (event) =>{
    if (event.key === 'Enter'){
        nameSubmit.click();
    }
})

// Attach input to player name
nameSubmit.addEventListener('click', () => {
    // Rename player
    friend.name = input.value

    // Next Page
    container.removeChild(form);

    // need to add in between page for placing ships
    container.appendChild(place.placementWrapper)
})

/* Page 2: Drag and Drop to place friendly ships */

const place = ShipPlacement();

// need player made only after first submit button. 
const friend = new Player(`placeholder`);
const enemy = new Player('enemy');

// initialize friend/enemy board
const friendBoard = Board();
friendBoard.classList.add('friendly');
const enemyBoard = Board();
enemyBoard.classList.add('enemy');

document.addEventListener('placeShips', () => {
    const ships = place.shipInfo
    for (const type in ships) {
        let [x, y] = indexToCoordinate(ships[type]['index'])
        friend.board.placeShip(x, y, ships[type]['axis'], Number(ships[type]['length']))
    }

    // Need to add randomization for enemy
    enemy.board.placeShip(1, 1, 'x', 2);
    enemy.board.placeShip(9, 0, 'y', 4);

    // build board visual
    friend.board.board.forEach((row) => {
        row.forEach((space) => {
            if (space.ship === true){
                let index = (9 - space.y) * 10 + space.x
                friendBoard.childNodes[index].classList.add('ship')
            }
        })
    })

    container.removeChild(place.placementWrapper)
    container.appendChild(friendBoard)
    container.appendChild(enemyBoard)
})

//adds delay between turns
let canTrigger = true;
// build board with event listeners
const enemySquares = enemyBoard.childNodes;
enemySquares.forEach((square, index) => {
    square.addEventListener('click', () =>{
        if (canTrigger){
            let [x, y] = indexToCoordinate(index);

            // checks if previously selected
            if (enemy.board.recieveAttack(x,y) === 'Error'){
                return
            }
            else{
                enemy.board.recieveAttack(x, y);
                turnResult(x, y, enemy, square);

                //time delay before playing computer turn
                setTimeout(() => {
                    document.dispatchEvent(new Event('enemyTurn'));
                }, 2000)
            }   
        }
        canTrigger = false;
    })
})

// change later for smarter computer logic
document.addEventListener('enemyTurn', () => {
        let friendIndex = Math.floor(Math.random() * 100);
        let [x, y] = indexToCoordinate(friendIndex);

        // checks if previously selected
        while (friend.board.recieveAttack(x, y) === 'Error'){
            friendIndex = Math.floor(Math.random() * 100);
            ([x, y]= indexToCoordinate(friendIndex));
        }

        friend.board.recieveAttack(x, y)
        turnResult(x, y, friend, friendBoard.childNodes[friendIndex]) 
        
        canTrigger = true;
})

function indexToCoordinate (index) {
    let x = index % 10;
    let y = 9 - Math.trunc(index/10);
    return [x, y]
}

function turnResult (x, y, player, space) {
    if (player.board.getSpace(x, y).occupant != null){
        space.classList.add('hit');
    }
    else{
        space.classList.add('miss');
    }
    if (player.board.allSunk() === true){
        // pop-up
        const gameOverScreen = GameOver()
        container.appendChild(gameOverScreen);

        friendBoard.classList.add('block')
        enemyBoard.classList.add('block')
        // darken background when game over
    }
}

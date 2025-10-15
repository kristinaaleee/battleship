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

/* Page 3: Official GameBoard  */

// Initialize friend
const gameWrapper = document.createElement('div');
gameWrapper.setAttribute('id', 'game-wrapper');

const friendWrapper = document.createElement('div');
const friendTitle = document.createElement('h3');
friendTitle.textContent = 'Friendly Waters';
const friendBoard = Board();
friendBoard.classList.add('friendly');

friendWrapper.appendChild(friendTitle);
friendWrapper.appendChild(friendBoard);

// Initialize enemy
const enemyWrapper = document.createElement('div')
const enemyTitle = document.createElement('h3')
enemyTitle.textContent = 'Enemy Waters'
const enemyBoard = Board();
enemyBoard.classList.add('enemy');

enemyWrapper.appendChild(enemyTitle);
enemyWrapper.appendChild(enemyBoard);

gameWrapper.appendChild(friendWrapper);
gameWrapper.appendChild(enemyWrapper);

const turnWrapper = document.createElement('div');
turnWrapper.setAttribute('id', 'turn-text');
turnWrapper.innerHTML = 'Your turn..'

// Activate once confirm on Page 2 is pressed
document.addEventListener('placeShips', () => {
    const ships = place.shipInfo
    for (const type in ships) {
        let [x, y] = indexToCoordinate(ships[type]['index'])
        friend.board.placeShip(x, y, ships[type]['axis'], Number(ships[type]['length']))
    }

    let enemyShips = [5, 4, 3, 3, 2];

    while (enemyShips.length != 0){
        let randomAxis = Math.random() < 0.5 ? 'x' : 'y';
        let randomX = Math.floor(Math.random() * 10)
        let randomY = Math.floor(Math.random() * 10)
        let shipLength = enemyShips.shift();

        while (enemy.board.placeShip(randomX, randomY, randomAxis, shipLength) === 'Error'){
            randomAxis = Math.random() < 0.5 ? 'x' : 'y';
            randomX = Math.floor(Math.random() * 10)
            randomY = Math.floor(Math.random() * 10)
        }
        enemy.board.placeShip(randomX, randomY, randomAxis, shipLength)
    }
    console.log(enemy.board);
    // build board visual
    friend.board.board.forEach((row) => {
        row.forEach((space) => {
            if (space.ship === true){
                let index = (9 - space.y) * 10 + space.x
                friendBoard.childNodes[index].classList.add('ship')
            }
        })
    })

    // build board visual
    enemy.board.board.forEach((row) => {
        row.forEach((space) => {
            if (space.ship === true){
                let index = (9 - space.y) * 10 + space.x
                // take out to make enemy board not visible 
                enemyBoard.childNodes[index].classList.add('ship')
            }
        })
    })

    container.removeChild(place.placementWrapper);
    container.appendChild(gameWrapper);
    container.appendChild(turnWrapper);
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
                let result = turnResult(x, y, enemy, square);
                turnWrapper.textContent = `The shot is a ${result} on the enemy's ship.`
                setTimeout(() => {
                turnWrapper.textContent = 'Enemy turn..'  
                }, 2000)
                
                //time delay before playing computer turn
                setTimeout(() => {
                    document.dispatchEvent(new Event('enemyTurn'));
                }, 3000)
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

        setTimeout(() => {
            friend.board.recieveAttack(x, y)
            let result = turnResult(x, y, friend, friendBoard.childNodes[friendIndex]) 
            turnWrapper.textContent = `The enemy's shot is a ${result} on the your ship.`
        })
        
        setTimeout(() => {
            turnWrapper.textContent = 'Your turn..'
            canTrigger = true;
        }, 2000)
})

function indexToCoordinate (index) {
    let x = index % 10;
    let y = 9 - Math.trunc(index/10);
    return [x, y]
}

function turnResult (x, y, player, space) {
    // Need to check every hit - maybe don't return
    if (player.board.allSunk() === true){
        // pop-up
        const gameOverScreen = GameOver();
        container.appendChild(gameOverScreen);

        friendBoard.classList.add('block')
        enemyBoard.classList.add('block')
        // darken background when game over
    }
    if (player.board.getSpace(x, y).occupant != null){
        space.classList.add('hit');
        return 'hit'
        // add turnWrapper.text content in here
    }
    else{
        space.classList.add('miss');
        return 'miss'
    }

}

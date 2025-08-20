import { Player } from './script.js'
import { Board } from './game.js'

// make friendly
const friend = new Player('friend')
friend.board.placeShip(4, 4, 'x', 3)
friend.board.placeShip(0, 0, 'y', 5)
// make enemy
const enemy = new Player('enemy')
enemy.board.placeShip(1, 1, 'x', 2)
enemy.board.placeShip(9, 0, 'y', 4)


const container = document.getElementById('container')
const friendBoard = Board()
friendBoard.classList.add('friendly')
const enemyBoard = Board()
enemyBoard.classList.add('enemy')
container.appendChild(friendBoard)
container.appendChild(enemyBoard)

// move to board module?
// build board visual
const friendSquares = friendBoard.childNodes;
friend.board.board.forEach((row) => {
    row.forEach((space) => {
        if (space.ship === true){
            let index = (9 - space.x) * 10 + space.y
            friendSquares[index].classList.add('ship')
        }
    })
})

// build board with event listeners
const enemySquares = enemyBoard.childNodes;
enemySquares.forEach((square, index) => {
    square.addEventListener('click', () =>{
        let x = index % 10;
        let y = 9 - Math.trunc(index/10);
        
        enemy.board.recieveAttack(x, y);

        // apply same logic to friendly board
        // randomize x,y for enemy to friendly hit
        if (enemy.board.getSpace(x, y).occupant != null){
            square.classList.add('hit');
        }
        else{
            square.classList.add('miss');
        }
        if (enemy.board.allSunk() === true){
            console.log('GAME OVER')
        }

        friend.board.recieveAttack()
    })
})



// event listeners for interacting with objects

// separate module for dom

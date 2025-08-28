import { Player } from './script.js'
import { Board, GameOver } from './game.js'

// make friendly
const friend = new Player('friend');
friend.board.placeShip(4, 4, 'x', 3);
friend.board.placeShip(0, 0, 'y', 5);

// make enemy
const enemy = new Player('enemy');
enemy.board.placeShip(1, 1, 'x', 2);
enemy.board.placeShip(9, 0, 'y', 4);


const container = document.getElementById('container');

// initialize friend/enemy board
const friendBoard = Board();
friendBoard.classList.add('friendly');
const enemyBoard = Board();
enemyBoard.classList.add('enemy');

container.appendChild(friendBoard);
container.appendChild(enemyBoard);

// build board visual
const friendSquares = friendBoard.childNodes;
friend.board.board.forEach((row) => {
    row.forEach((space) => {
        if (space.ship === true){
            let index = (9 - space.y) * 10 + space.x
            friendSquares[index].classList.add('ship')
        }
    })
})

// build board with event listeners
const enemySquares = enemyBoard.childNodes;
enemySquares.forEach((square, index) => {
    square.addEventListener('click', () =>{
        // fix time delay to not allow overlap with computer
        let [x, y] = indexToCoordinate(index);

        // checks if previously selected
        if (enemy.board.recieveAttack(x,y) === 'Error'){
            return
        }
        else{
            enemy.board.recieveAttack(x, y);
            turnResult(x, y, enemy, square);

            document.dispatchEvent(new Event('enemyTurn'));
        }  
    })
})

// change later for smarter computer logic
document.addEventListener('enemyTurn', () => {
    // Two second delay before turn
    setTimeout(() => {
        let friendIndex = Math.floor(Math.random() * 100);
        let [x, y] = indexToCoordinate(friendIndex);

        // checks if previously selected
        while (friend.board.recieveAttack(x, y) === 'Error'){
            friendIndex = Math.floor(Math.random() * 100);
            ([x, y]= indexToCoordinate(friendIndex));
        }

        friend.board.recieveAttack(x, y)
        turnResult(x, y, friend, friendSquares[friendIndex]) 
    }, 2000)
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

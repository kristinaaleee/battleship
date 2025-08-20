import { Player } from './script.js'
import { Board } from './game.js'

// make new player
const player1 = new Player('one')
player1.board.placeShip(4, 4, 'x', 3)
player1.board.recieveAttack(4,4)
player1.board.recieveAttack(5,4)
player1.board.recieveAttack(6,4)
console.log(player1)

const container = document.getElementById('container')
container.appendChild(Board())
// event listeners for interacting with objects

// separate module for dom

export { Ship, Gameboard };

class Ship {
    constructor(length){
        //defined later
        this.length = length
        this.hits = 0
        this.sunk = false;
    }
    hitFunction(){
        this.hits++
    }
    isSunk(){
        this.sunk = this.hits === this.length ? true : false
        return this.sunk
    }
}

// 10x10 gameboard

class Gameboard {
    constructor(){
        // Building using the index of empty array
        // _ indicates unsused variable (value)
        this.board = Array.from({ length: 10 }, (_, y) => 
                        Array.from({ length: 10 }, (_, x) => ({x, y, ship: false, selected: false})))
    }

//     placeShip(x, y, axis, length){
//         this.board[]
//     }
}
let grid = new Gameboard();
console.log(grid)
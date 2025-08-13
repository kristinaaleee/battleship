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
        // 0 to 9 coordinates
    }

    getSpace(x, y){
        return this.board[y]?.[x] ?? null;
    }

    placeShip(x, y, axis, length){
        let space = this.getSpace(x, y)

        // Square already occupied
        if (space.ship === true) return 'Error: Square already has a ship'
        
        // Ship would go of grid if placed here
        if (axis === 'y' && (y + length > 9)) return 'Error: Ship goes out of coordinates'
        if (axis === 'x' && (x + length > 9)) return 'Error: Ship goes out of coordinates'

        // Same ship object in each square
        let shipObject = new Ship(length);

        for (let i = 0; i < length; i++){
            axis == 'y' ? y += i : x += i;
            space = this.getSpace(x, y);
            space.ship = true;
            space.occupant = shipObject;
        }
    }
    recieveAttack(x, y){
        let space = this.getSpace(x, y);

        if (space.selected === true) return 'Error: Space already selected'

        if (space.ship === true) {
            space.occupant.hitFunction();
            space.occupant.isSunk();
        }
        space.selected = true
    }
    allSunk(){
        for (const row of this.board){
            let ships = row.filter(space => "occupant" in space)
            for (const element of ships){
                if (element.occupant.sunk === false) return false;
            }
        }
        return true;
    }
}

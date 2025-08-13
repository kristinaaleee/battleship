import { Ship, Gameboard } from './script.js'

test('hit function', () => {
    let ship = new Ship(4);
    ship.hitFunction();
    expect(ship.hits).toBe(1);
})
test('sunk function', () => {
    let ship = new Ship(4);
    ship.hitFunction();
    ship.hitFunction();
    ship.hitFunction();
    ship.hitFunction();
    expect(ship.isSunk()).toBe(true);
})

test('get square', () =>{
    let board = new Gameboard();
    expect(board.getSpace(0, 0)).toEqual({x: 0, y: 0, ship: false, selected: false})
})
test('placing valid ship', () => {
    let board = new Gameboard();
    board.placeShip(2, 2, 'x', 3)
    expect(board.getSpace(3, 2)).toEqual({x: 3, y: 2, ship: true, selected: false, occupant : { length : 3, hits: 0, sunk: false}});
})
test('placing in occupied square', () => {
    let board = new Gameboard();
    board.placeShip(2, 2, 'x', 3)
    expect(board.placeShip(2, 2, 'x', 3)).toBe('Error: Square already has a ship');
})


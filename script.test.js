import { Ship, Gameboard } from './script.js'

test('hit function', () => {
    let ship = new Ship();
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

test('placing ships', () => {
    let board = new Gameboard();
    expect(board[1]).toBe({x: 2, y: 1, ship: false, selected: false});
})
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const KEY = { LEFT: ['ArrowLeft','KeyA'], RIGHT: ['ArrowRight', 'KeyD'], DOWN: ['ArrowDown','KeyS'], SPACE: ['Space'], TURN_RIGHT: ['ArrowUp','Period'], TURN_LET:['Comma']};
const COLORS=[
    'blue',
    'red',
    'green',
    'yellow',
    'purple',
    'pink',
    'brown'
];
const SHAPES = [[[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[2, 2], [2, 2]],
    [[3,3,0],[0,3,3],[0,0,0]],
    [[0,0,4],[4,4,4],[0,0,0]],
    [[5,0,0],[5,5,5],[0,0,0]],
    [[0,6,0],[6,6,6],[0,0,0]],
    [[0,0,0,0],[7,7,7,7],[0,0,0,0],[0,0,0,0]]
];

const POINTS={
    ONE: 40,
    TWO: 100,
    THREE: 300,
    FOUR: 1200
}
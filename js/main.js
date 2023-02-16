const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board(ctx, ctxNext);

let requestId;
const time = {start: 0, elapsed: 0, level: 1000};
let data = {score: 0, lines: 0, level: 1}

function play() {
    resetGame();
    animate();
}


document.addEventListener('keydown', event => {
    event.preventDefault();
    let p = {...board.piece};
    if (KEY.LEFT.includes(event.code)) {
        p.x -= 1;
    } else if (KEY.RIGHT.includes(event.code)) {
        p.x += 1;
    } else if (KEY.DOWN.includes(event.code)) {
        p.y += 1;
    } else if (KEY.SPACE.includes(event.code)) {
        p.y += 1;
    } else if (KEY.TURN_RIGHT.includes(event.code)) {
        p=board.rightRotate(p);
    } else if(KEY.TURN_LET.includes(event.code)){
        p=board.leftRotate(p);
    }

    if (KEY.SPACE.includes(event.code)) {
        while (board.valid(p)) {
            board.piece.move(p);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.piece.draw();
            p.y += 1;
        }
        board.freeze();
    } else if (board.valid(p)) {
        board.piece.move(p);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        board.piece.draw();
    }


});

document.addEventListener('pointerdown',event=>{
    let p = {...board.piece};
    if (event.target.className==='moveLeft') {
        p.x -= 1;
    } else if (event.target.className==='moveRight') {
        p.x += 1;
    } else if (event.target.className==='moveDown') {
        p.y += 1;
    } else if (event.target.className==='drop') {
        p.y += 1;
    } else if (event.target.className==='turnRight') {
        p=board.rightRotate(p);
    } else if(event.target.className==='turnLeft'){
        p=board.leftRotate(p);
    }

    if (event.target.className==='drop') {
        while (board.valid(p)) {
            board.piece.move(p);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.piece.draw();
            p.y += 1;
        }
        board.freeze();
    } else if (board.valid(p)) {
        board.piece.move(p);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        board.piece.draw();
    }
    console.log(event.target.className);
});

function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        time.start = now;
        if (!board.drop()) {
            gameOver();
            return;
        }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    requestAnimationFrame(animate);
}

function gameOver() {
    cancelAnimationFrame(requestId);
    ctx.fillStyle = 'cyan';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Comic Sans MS';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4);
}

function updateData(value) {
    let score = document.getElementById('score');
    if (score) {
        score.textContent = value.score;
    }
    let lines = document.getElementById('lines');
    if (lines) {
        lines.textContent = value.lines;
    }
    let level = document.getElementById('level');
    if (level) {
        level.textContent = value.level;
    }
}

function resetGame() {
    data.level = 1;
    data.lines = 0;
    data.score = 0;
    time.level = 1000;
    board.reset();
    board.piece = new Piece(ctx);
    board.piece.x = 3;
    board.piece.y = 0;

}

class Board {
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.piece = null;
        this.pieceNext = null;
    }

    getNewPiece() {
        this.pieceNext = new Piece(this.ctxNext);
        this.ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
        this.pieceNext.draw();
    }

    reset() {
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(this.ctx);
        this.getNewPiece();
    }

    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    underFloor(y) {
        return y <= ROWS;
    }

    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return value === 0 ||
                    (this.insideWalls(x) && this.underFloor(y) && this.notOccupied(x, y));
            });
        });
    }

    rightRotate(piece) {
        let p = JSON.parse(JSON.stringify(piece));
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] =
                    [p.shape[y][x], p.shape[x][y]];
            }
        }
        p.shape.forEach(row => row.reverse());
        return p;
    }

    leftRotate(piece) {
        let p = JSON.parse(JSON.stringify(piece));
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] =
                    [p.shape[y][x], p.shape[x][y]];
            }
        }
        p.shape.reverse();
        return p;
    }

    draw() {
        this.piece.draw();
        this.drawBoard();
    }

    drop() {
        let p = {...board.piece};
        p.y += 1;
        if (this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            this.clearLines();
            if (this.piece.y === 0) {
                // Game over
                return false;
            }
            this.piece = this.pieceNext;
            this.piece.x = 3;
            this.piece.y = 0;
            this.piece.ctx = this.ctx;
            this.getNewPiece();
        }
        return true;
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            })
        });
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value - 1];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            })
        });
    }

    clearLines() {
        let lines = 0;
        this.grid.forEach((row, y) => {
            if (row.every(value => value > 0)) {
                lines++;
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
        if (lines > 0) {
            data.score += this.getLineClearPoints(lines, data.level);
            data.lines += lines;
            if (data.lines > data.level * 10) {
                time.level -= 100;
                console.log(time.level)
                data.level++;
            }
            updateData(data);
        }
    }

    getLineClearPoints(lines, level) {
        switch (lines) {
            case 1:
                return POINTS.ONE * level;
            case 2:
                return POINTS.TWO * level;
            case 3:
                return POINTS.THREE * level;
            case 4:
                return POINTS.FOUR * level;
        }
    }

}
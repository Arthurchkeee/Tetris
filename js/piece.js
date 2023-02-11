class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        let i = Math.floor(Math.random() * 7);
        this.color = COLORS[i];
        this.shape = SHAPES[i];
        this.x = 0;
        this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            })
        })
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape=p.shape;
    }

}
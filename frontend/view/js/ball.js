class Ball {
  x;
  y;
  dy;
  dx;
  radius;
  color;
  ctx;
  type = "ball";
  players = [];
  constructor(ctx, x, y, dy, dx, radius, color, players) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.players = players;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.stroke();
    this.ctx.fill();
  }

  update() {
    // * wall collison
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx *= -1;
    }

    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy *= -1;
    }

    if (
      (this.x + this.radius) <= this.players[0].x ||
      (this.x - this.radius) == this.players[1].x
    ) {
      this.dx *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

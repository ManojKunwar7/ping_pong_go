class Bar {
  x;
  y;
  dx;
  dy;
  width;
  height;
  ctx;
  color;
  type = "bar";
  inputKeys;
  speed = 0;
  padding = 10;

  constructor(ctx, x, y, dx, dy, width, height, color, speed, inputKeys) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ctx = ctx;
    this.speed = speed;
    this.color = color;
    this.width = width;
    this.height = height;
    this.inputKeys = inputKeys;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  update() {
    if (this.inputKeys.ArrowUp) this.y -= this.speed;
    if (this.inputKeys.ArrowDown) this.y += this.speed;
    // if (this.inputKeys.ArrowRight) this.x += this.speed;
    // if (this.inputKeys.ArrowLeft) this.x -= this.speed;

    // ------ X-axis-------
    if (this.x + this.width + this.padding > window.innerWidth) {
      this.x = window.innerWidth - this.width - this.padding;
    }

    if (this.x - this.padding < 0) {
      this.x = this.padding;
    }

    // ------ Y-axis-------
    if (this.y + this.height  > window.innerHeight) {
      this.y = window.innerHeight - this.height;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    this.draw();
  }
}

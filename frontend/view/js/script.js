// ! Variables initialization
let animationId;
let objects = [];
const ball_colors = ["red", "blue", "yellow", "gold"];
const bar_colors = ["#FA0080", "#00DDFA", "#011142", "#5F935D"];
const body = document.querySelector("body");
const canvas = document.querySelector("canvas");

const bar_width = 10;
const bar_height = 60;

let oldWidth = window.innerWidth;
let oldHeight = window.innerHeight;

// ! Resizing canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player1 = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

let player2 = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

let players = [
  {
    x: 0 + bar_width,
    y: (window.innerHeight / 2) + bar_height,
  },
  {
    x: window.innerWidth - bar_width,
    y: window.innerHeight / 2 + bar_height,
  },
];

// ! Get Context
const ctx = canvas.getContext("2d");

// ! Event listeners
window.addEventListener("resize", () => {
  try {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resizeRetention();
  } catch (error) {
    console.log("Error resizing", error);
  }
});

window.addEventListener("keydown", (e) => {
  player1[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  player1[e.key] = false;
});

// ! Function Calls
animate();
init();

// ! Functions

function getDistance(x1, y1, x2, y2) {
  let distanceX = x1 - x2;
  let distanceY = y1 - y2;

  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

function resizeRetention() {
  try {
    const widthRatio = window.innerWidth / oldWidth;
    const heightRatio = window.innerHeight / oldHeight;

    oldWidth = window.innerWidth;
    oldHeight = window.innerHeight;

    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];

      object.x *= widthRatio;
      object.y *= heightRatio;

      switch (object.type) {
        case "bar":
          {
            // TODO
          }
          break;
        case "ball": {
          if (object.x - object.radius < 0) object.x = object.radius;
          if (object.x + object.radius > window.innerWidth)
            object.x = object.x - object.radius;

          if (object.y - object.radius < 0) object.y = object.radius;
          if (object.y + object.radius > window.innerHeight)
            object.y = object.y - object.radius;
        }
      }
    }
  } catch (error) {
    console.log("Error resizing", error);
  }
}

function init() {
  try {
    objects = [];
    // * Ball Creation
    const ball_radius = 10;
    const randomize_x = (Math.floor(Math.random() * 100) + 1) & 1 ? -1 : 1;
    const randomize_y = (Math.floor(Math.random() * 100) + 1) & 1 ? -1 : 1;
    const ball_x = window.innerWidth / 2;
    const ball_y = window.innerHeight / 2;
    const ball_dx = 5 * randomize_x;
    const ball_dy = 5 * randomize_y;
    const ball_color =
      ball_colors[
        Math.floor((Math.random() * ball_colors.length) % ball_colors.length)
      ];
    const ball = new Ball(
      ctx,
      ball_x,
      ball_y,
      ball_dx,
      ball_dy,
      ball_radius,
      ball_color,
      players
    );
    objects.push(ball);
    console.log("x y", randomize_x, randomize_y);

    // ! Bar Creation
 

    const bar_x = 0;
    const bar_y = window.innerHeight / 2;
    const bar_dx = 5;
    const bar_dy = 5;
    const bar_speed = 6;
    const bar_color =
      bar_colors[
        Math.floor((Math.random() * bar_colors.length) % bar_colors.length)
      ];
    const bar = new Bar(
      ctx,
      bar_x,
      bar_y,
      bar_dx,
      bar_dy,
      bar_width,
      bar_height,
      bar_color,
      bar_speed,
      player1
    );
    objects.push(bar);
  } catch (err) {
    console.log("Error: while animate() called", err);
  }
}

function animate() {
  try {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < objects.length; i++) {
      objects[i].update();
    }
  } catch (error) {
    console.log("Error: while animate() called", error);
    cancelAnimationFrame(animationId);
  }
}

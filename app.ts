let canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null,
  balls: Ball[] = [],
  lastTime = 0;

const img = new Image();
img.src = './ball.svg';

class Ball {
  x: number;
  y: number;
  radius: number;
  velocityY: number;
  damping: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = (window.innerWidth / 100) * 2;
    this.velocityY = 0;
    this.damping = 0.9;
  }

  draw(): void {
    if (ctx !== undefined && ctx !== null) {
      ctx.drawImage(img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
  }

  update(deltaTime: number): void {
    this.velocityY += 9.8 * 0.01 * deltaTime;
    this.y += this.velocityY;
    if (this.y + this.radius > (canvas?.height || 0)) {
      this.y = (canvas?.height || 0) - this.radius;
      this.velocityY *= -this.damping;
    }
    this.draw();
  }
}



function spawnBall(x: number, y: number): void {
  balls.push(new Ball(x, y));
  if (balls.length > 10) balls.shift();
}

function tick(currentTime: number): void {
  const deltaTime = currentTime - lastTime;
  ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
  balls.forEach((ball) => ball.update(deltaTime));
  lastTime = currentTime;
  requestAnimationFrame(tick);
}

function init(): void {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas?.addEventListener("click", (event) => {
    const { left, top }:any = canvas?.getBoundingClientRect();
    spawnBall(event.clientX - left, event.clientY - top);
  });

  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;
    ctx = canvas.getContext("2d");
    requestAnimationFrame(tick);
  }
}

init();


let canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D | null,
    balls: Ball[] = [],
    lastTime = 0;

class Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityY: number;
    damping: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.floor((Math.random() + 0.5) * 26);
        this.color = getRandomColor();
        this.velocityY = 0;
        this.damping = 0.9;
    }

    draw(): void {
        if (ctx != undefined) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    update(deltaTime: number): void {
        this.velocityY += 9.8 * 0.01 * deltaTime;
        this.y += this.velocityY;
        if (this.y + this.radius > canvas!.height) {
            this.y = canvas!.height - this.radius;
            this.velocityY *= -this.damping;
        }
        this.draw();
    }
}

function getRandomColor(): string {
    return `#${("0000" + ((Math.random() * 0x100) | 0).toString(16)).slice(-6)}`;
}

function spawnBall(x: number, y: number): void {
    balls.push(new Ball(x, y));
    if (balls.length > 10) balls.shift();
}

function tick(currentTime: number): void {
    let deltaTime = currentTime - lastTime;
    ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    balls.forEach((ball) => ball.update(deltaTime));
    lastTime = currentTime;
    requestAnimationFrame(tick);
}

function init(): void {
    canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    canvas?.addEventListener("click", (event: MouseEvent) => {
        let { left, top } = canvas!.getBoundingClientRect();
        spawnBall(event.clientX - left, event.clientY - top);
    });

    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 10;
        ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
        requestAnimationFrame(tick);
    }
}

init();
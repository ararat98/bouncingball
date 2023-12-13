var canvas, ctx, balls = [], lastTime = 0;
var Ball = /** @class */ (function () {
    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.floor((Math.random() + 0.5) * 26);
        this.color = getRandomColor();
        this.velocityY = 0;
        this.damping = 0.9;
    }
    Ball.prototype.draw = function () {
        if (ctx != undefined) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    };
    Ball.prototype.update = function (deltaTime) {
        this.velocityY += 9.8 * 0.01 * deltaTime;
        this.y += this.velocityY;
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocityY *= -this.damping;
        }
        this.draw();
    };
    return Ball;
}());
function getRandomColor() {
    return "#".concat(("0000" + ((Math.random() * 0x100) | 0).toString(16)).slice(-6));
}
function spawnBall(x, y) {
    balls.push(new Ball(x, y));
    if (balls.length > 10)
        balls.shift();
}
function tick(currentTime) {
    var deltaTime = currentTime - lastTime;
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) { return ball.update(deltaTime); });
    lastTime = currentTime;
    requestAnimationFrame(tick);
}
function init() {
    canvas = document.getElementById("canvas");
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("click", function (event) {
        var _a = canvas.getBoundingClientRect(), left = _a.left, top = _a.top;
        spawnBall(event.clientX - left, event.clientY - top);
    });
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 10;
        ctx = canvas.getContext("2d");
        requestAnimationFrame(tick);
    }
}
init();

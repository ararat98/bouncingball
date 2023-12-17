var canvas, ctx, balls = [], lastTime = 0;
var img = new Image();
img.src = './ball.svg';
var Ball = /** @class */ (function () {
    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.radius = (window.innerWidth / 100) * 2;
        this.velocityY = 0;
        this.damping = 0.9;
    }
    Ball.prototype.draw = function () {
        if (ctx !== undefined && ctx !== null) {
            ctx.drawImage(img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    };
    Ball.prototype.update = function (deltaTime) {
        this.velocityY += 9.8 * 0.01 * deltaTime;
        this.y += this.velocityY;
        if (this.y + this.radius > ((canvas === null || canvas === void 0 ? void 0 : canvas.height) || 0)) {
            this.y = ((canvas === null || canvas === void 0 ? void 0 : canvas.height) || 0) - this.radius;
            this.velocityY *= -this.damping;
        }
        this.draw();
    };
    return Ball;
}());
function spawnBall(x, y) {
    balls.push(new Ball(x, y));
    if (balls.length > 10)
        balls.shift();
}
function tick(currentTime) {
    var deltaTime = currentTime - lastTime;
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, (canvas === null || canvas === void 0 ? void 0 : canvas.width) || 0, (canvas === null || canvas === void 0 ? void 0 : canvas.height) || 0);
    balls.forEach(function (ball) { return ball.update(deltaTime); });
    lastTime = currentTime;
    requestAnimationFrame(tick);
}
function init() {
    canvas = document.getElementById("canvas");
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("click", function (event) {
        var _a = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect(), left = _a.left, top = _a.top;
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

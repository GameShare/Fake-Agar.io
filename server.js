var app = require('http').createServer();
var io = require('socket.io')(app);
var ballList = {};

app.listen(80);
gameLoop();

io.on('connection', function(socket) {
    console.log("user in!");
    socket.on("newBall", function(ball) {
        for (var key in ballList) {
            var other = ballList[key];
            socket.emit("otherBall", {
                userID: other.userID,
                x: other.x,
                y: other.y
            });
        }
        ballList[ball.userID] = ball;
        socket.broadcast.emit('otherBall', {
            userID: ball.userID,
            x: ball.x,
            y: ball.y
        });
    })

    socket.on("click", function(event) {
        speed = 5;
        ball = ballList[event.userID];
        if (ball.x > event.x) {
            ball.vx = -speed * Math.abs(ball.x - event.x) / Math.sqrt(getDis(ball.x - event.x, ball.y - event.y));
        } else {
            ball.vx = speed * Math.abs(ball.x - event.x) / Math.sqrt(getDis(ball.x - event.x, ball.y - event.y));
        }
        if (ball.y > event.y) {
            ball.vy = -speed * Math.abs(ball.y - event.y) / Math.sqrt(getDis(ball.x - event.x, ball.y - event.y));
        } else {
            ball.vy = speed * Math.abs(ball.y - event.y) / Math.sqrt(getDis(ball.x - event.x, ball.y - event.y));
        }
    });
});

function gameLoop() {
    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);
    //Update the current game state:
    update();
}

function update() {
    for (var userID in ballList) {
        var ball = ballList[userID];
        ball.x += ball.vx;
        ball.y += ball.vy;
        var resist = 0.1;
        if (getDis(ball.vx, ball.vy) >= 0.1) {
            ball.vx -= resist * ball.vx / Math.sqrt(getDis(ball.vx, ball.vy));
            ball.vy -= resist * ball.vy / Math.sqrt(getDis(ball.vx, ball.vy));
        } else {
            ball.vx = 0;
            ball.vy = 0;
        }
        io.emit("update", {
            userID: ball.userID,
            x: ball.x,
            y: ball.y
        });
    }
}

function getDis(x, y) {
    return x * x + y * y;
}

function requestAnimationFrame(fn) {
    setTimeout(fn, 1000 / 60);
}
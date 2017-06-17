var io = require("socket.io-client");
var hash = require('crypto');
// Create the applirection
const app = new PIXI.Application({
    width: 800,
    height: 600
});

var userID = sha1(Date().toString());
var ballList = {};

// init
var socket = io.connect("http://127.0.0.1/");
app.renderer.backgroundColor = 0xffffff;
// Add the view to the DOM
document.body.appendChild(app.view);


function createBall(x, y, isSelf) {
    var rect = new PIXI.Graphics();
    rect.interactive = true;
    rect.hitArea = new PIXI.Circle(0, 0, 50);
    if (isSelf) {
        rect.beginFill(0xff0000, 1);
    } else {
        rect.beginFill(0x000000, 1);
    }
    rect.drawCircle(0, 0, 50);
    rect.endFill();
    rect.x = x;
    rect.y = y;
    rect.vx = 0;
    rect.vy = 0;
    // ex, add display objects
    app.stage.addChild(rect);
    return rect;
}

function setup() {
    ballList[userID] = createBall(300, 400, true);
    socket.emit("newBall", {
        userID: userID,
        x: ballList[userID].x,
        y: ballList[userID].y,
        vx: 0,
        vy: 0
    });

    window.addEventListener("click", function(event) {
        socket.emit("click", {
            userID: userID,
            x: event.x,
            y: event.y
        });
    });
}

socket.on("otherBall", function(ball) {
    ballList[ball.userID] = createBall(ball.x, ball.y);
});

socket.on("update", function(event) {
    var ball = ballList[event.userID];
    if (ball) {
        ball.x = event.x;
        ball.y = event.y;
    }
})

$(function() {
    setup();
});

function sha1(content) {
    var sha1 = hash.createHash('sha1');
    sha1.update(content);
    return sha1.digest('hex');
}

/////////////////////////////////////////////////////////////////
// function setupKeyboard(){
// var left = keyboard(37),
//     up = keyboard(38),
//     right = keyboard(39),
//     down = keyboard(40);
// 	    //Left arrow key `press` method
//     left.press = function() {
//         //Change the rect's velocity when the key is pressed
//         rect.vx = -5;
//         rect.vy = 0;
//     };

//     //Left arrow key `release` method
//     left.release = function() {
//         //If the left arrow has been released, and the right arrow isn't down,
//         //and the rect isn't moving vertically:
//         //Stop the rect
//         if (!right.isDown && rect.vy === 0) {
//             rect.vx = 0;
//         }
//     };

//     //Up
//     up.press = function() {
//         rect.vy = -5;
//         rect.vx = 0;
//     };
//     up.release = function() {
//         if (!down.isDown && rect.vx === 0) {
//             rect.vy = 0;
//         }
//     };

//     //Right
//     right.press = function() {
//         rect.vx = 5;
//         rect.vy = 0;
//     };
//     right.release = function() {
//         if (!left.isDown && rect.vy === 0) {
//             rect.vx = 0;
//         }
//     };

//     //Down
//     down.press = function() {
//         rect.vy = 5;
//         rect.vx = 0;
//     };
//     down.release = function() {
//         if (!up.isDown && rect.vx === 0) {
//             rect.vy = 0;
//         }
//     };
// }


// function keyboard(keyCode) {
//     var key = {};
//     key.code = keyCode;
//     key.isDown = false;
//     key.isUp = true;
//     key.press = undefined;
//     key.release = undefined;
//     //The `downHandler`
//     key.downHandler = function(event) {
//         if (event.keyCode === key.code) {
//             if (key.isUp && key.press) key.press();
//             key.isDown = true;
//             key.isUp = false;
//         }
//         event.preventDefault();
//     };

//     //The `upHandler`
//     key.upHandler = function(event) {
//         if (event.keyCode === key.code) {
//             if (key.isDown && key.release) key.release();
//             key.isDown = false;
//             key.isUp = true;
//         }
//         event.preventDefault();
//     };

//     //Attach event listeners
//     window.addEventListener(
//         "keydown", key.downHandler.bind(key), false
//     );
//     window.addEventListener(
//         "keyup", key.upHandler.bind(key), false
//     );
//     return key;
// }
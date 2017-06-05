// Create the applirection
const app = new PIXI.Application({
    width: 800,
    height: 600
});

app.renderer.backgroundColor = 0xffffff;
// Add the view to the DOM
document.body.appendChild(app.view);

var rect = new PIXI.Graphics();
rect.interactive = true;
rect.hitArea = new PIXI.Circle(0, 0, 50);
rect.beginFill(0x000000, 1);
rect.drawCircle(0, 0, 50);
rect.endFill();
rect.x = 400;
rect.y = 300;

// ex, add display objects
app.stage.addChild(rect);


function gameLoop() {
    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);
    //Update the current game state:
    state();
}

function play() {
    rect.x += rect.vx;
    rect.y += rect.vy;
    resist = 0.1;
    if (getDis(rect.vx, rect.vy) >= 0.1) {
        rect.vx -= resist * rect.vx / Math.sqrt(getDis(rect.vx, rect.vy));
        rect.vy -= resist * rect.vy / Math.sqrt(getDis(rect.vx, rect.vy));
    } else {
        rect.vx = 0;
        rect.vy = 0;
    }
}

function setup() {
    rect.vx = 0;
    rect.vy = 0;
    window.addEventListener("click", function(event) {
        speed = 5;
        if (rect.x > event.x) {
            rect.vx = -speed * Math.abs(rect.x - event.x) / Math.sqrt(getDis(rect.x - event.x, rect.y - event.y));
        } else {
            rect.vx = speed * Math.abs(rect.x - event.x) / Math.sqrt(getDis(rect.x - event.x, rect.y - event.y));
        }
        if (rect.y > event.y) {
            rect.vy = -speed * Math.abs(rect.y - event.y) / Math.sqrt(getDis(rect.x - event.x, rect.y - event.y));
        } else {
            rect.vy = speed * Math.abs(rect.y - event.y) / Math.sqrt(getDis(rect.x - event.x, rect.y - event.y));
        }
    });


    //Set the game state
    state = play;
    //Start the game loop
    gameLoop();
}

function getDis(x, y) {
    return Math.abs(x) * Math.abs(x) + Math.abs(y) * Math.abs(y)
}

$(function() {
    setup();
});

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
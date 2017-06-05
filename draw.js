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
rect.hitArea = new PIXI.Circle(400, 300, 10);
rect.beginFill(0x000000, 1);
rect.drawCircle(400, 300, 10);
rect.endFill();

// ex, add display objects
app.stage.addChild(rect);

// app.renderer.render(app.stage);

function gameLoop() {

    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);
    //Update the current game state:
    state();
}

function play() {
    //Use the rect's velocity to make it move
    rect.x += rect.vx;
    rect.y += rect.vy
}

function setup() {
    var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);


    rect.vx = 0;
    rect.vy = 0;
    //Left arrow key `press` method
    left.press = function() {
        //Change the rect's velocity when the key is pressed
        rect.vx = -5;
        rect.vy = 0;
    };

    //Left arrow key `release` method
    left.release = function() {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the rect isn't moving vertically:
        //Stop the rect
        if (!right.isDown && rect.vy === 0) {
            rect.vx = 0;
        }
    };

    //Up
    up.press = function() {
        rect.vy = -5;
        rect.vx = 0;
    };
    up.release = function() {
        if (!down.isDown && rect.vx === 0) {
            rect.vy = 0;
        }
    };

    //Right
    right.press = function() {
        rect.vx = 5;
        rect.vy = 0;
    };
    right.release = function() {
        if (!left.isDown && rect.vy === 0) {
            rect.vx = 0;
        }
    };

    //Down
    down.press = function() {
        rect.vy = 5;
        rect.vx = 0;
    };
    down.release = function() {
        if (!up.isDown && rect.vx === 0) {
            rect.vy = 0;
        }
    };

    //Set the game state
    state = play;
    //Start the game loop
    gameLoop();

}


function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

$(function() {
    setup();
});
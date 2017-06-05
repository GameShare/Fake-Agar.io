// Create the application
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

// ex, add display objects
app.stage.addChild(rect);

app.renderer.render(app.stage);
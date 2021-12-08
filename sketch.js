var rocket, rocketImg;
var germ, germGroup, germImg;
var paddle;
var lives = 3;
var score = 0;
var gameState = 0;
var edges;


function preload() {
  rocketImg = loadImage("rocket.png");
  germImg = loadImage("germ.png");
}

function setup() {
  createCanvas(600,600);

  edges = createEdgeSprites();
  
  rocket = createSprite(250, 480);
  rocket.addImage(rocketImg);
  rocket.scale = 0.15;

  paddle = createSprite(250, 550, 120, 10);
  paddle.shapeColor = "blue";

  germGroup = new Group;
  for(var i = 0; i <  5; i++) {
    for(var j = 0; j < 6; j++) {
      germ = createSprite(130+65*j, 70+50*i);
      germ.addImage(germImg)
      germ.scale = 0.1;
      germGroup.add(germ);
    }
  }
}

function draw() {
  background(51);
  textSize(20);

  console.log(gameState);

  text("Score: "+score, 500, 50);
  text("Lives: "+lives, 500, 80);
  
  if(gameState===0) {
   text("Click to Serve", 220, 400);
   rocket.velocityX = 0;
   rocket.velocityY = 0;
  }
  
  else if(gameState===2) {
   text("Game Over", 250, 400);
   rocket.remove();
  }

  else if(gameState===3) {
   text("Press the spacebar to resume", 150, 230);
  }

  else {
    gameplay();
  }

  if(keyDown("SPACE")) {
    if(gameState===3) {
      gameState = 1;
      rocket.velocityX = 0;
      rocket.velocityY = 0;
    }

    else if(gameState===1) {
      gameState = 3;
      rocket.velocityX = 0;
      rocket.velocityY = 0;
    }
  }

  drawSprites();
}

function mouseClicked() {
  rocket.velocityX = 3;
  rocket.velocityY = 3;
  gameState = 1;
}

function germHit(rocket, germ) {
  germ.remove();
  score+=5;
  rocket.velocityX+= 0.1;
  rocket.velocityY+= 0.1;
}

function gameplay() {
  paddle.x = World.mouseX;
  rocket.bounceOff(edges[0]);
  rocket.bounceOff(edges[1]);
  rocket.bounceOff(edges[2]);
  rocket.bounceOff(paddle);

  rocket.bounceOff(germGroup, germHit);

  if(rocket.isTouching(edges[3])) {
   lives-=1;
  }

  if(lives===0) {
    lifeOver();
  }

  if(score===150) {
    text("You Win!", 230, 400);
    rocket.velocityX = 0;
    rocket.veloCityY = 0;
  }
}

function lifeOver() {
  gameState = 2;
}
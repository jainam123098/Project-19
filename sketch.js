var ospace, ospaceImg;
var rocket, rocketImg;
var score = 0;
var obstacle, obstacleImg;
var coin, coinImg;
var PLAY = 1;
var END = 2;
var gameState;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){

    ospaceImg = loadImage("space.png");
    rocketImg = loadImage("rocket.jpeg");
    obstacleImg = loadImage("obstacle.png");
    coinImg = loadImage("coin1.png.jpg");
    gameOverImg = loadImage("gameOver1.png");
    restartImg = loadImage("restart.png");

}

function setup() {
    createCanvas(400,400);

    text("score:"+score,300,80);

    ospace = createSprite(200,200,40,40);
    ospace.addImage(ospaceImg);
    ospace.scale = 2;

    rocket = createSprite(180,350,40,20);
    rocket.addImage(rocketImg);
    rocket.depth = ospace.depth+1;
    rocket.scale = 0.18;
    
    gameOver = createSprite(200,150,30,30);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.25;
    gameOver.visible = false;

    restart = createSprite(180,270,30,30);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    restart.visible = false;

    obstacleGroup = new Group();
    coinGroup = new Group();

    gameState = PLAY;
    
}

function draw() {
    background(0);

    if(gameState===PLAY){
        ospace.velocityY = -2;

        if(ospace.y<150){
            ospace.y = 200;
        }

        if(keyDown("right_arrow") && rocket.x<385){
            rocket.x = rocket.x+5;    
        }

        if(keyDown("left_arrow") && rocket.x>12){
            rocket.x = rocket.x-5;    
        }

        spawnObstacles();
        spawnCoin();
    }

    if(rocket.isTouching(obstacleGroup)){
        gameState = END;
    }

    if(mousePressedOver(restart) && gameState===END){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
    }

    if(rocket.isTouching(coinGroup)){
        coinGroup.destroyEach();
    }

    if(gameState===END){
        ospace.velocityY = 0;
        obstacleGroup.destroyEach();
        coinGroup.destroyEach();
        gameOver.visible = true;
        restart.visible = true;
    }
    

    drawSprites();
}

function spawnObstacles(){
    if(frameCount%120==0){
        obstacle = createSprite(Math.round(random(50,350)),0,30,40);
        obstacle.addImage(obstacleImg);
        obstacle.scale = 0.2;      
        obstacle.velocityY = 2;
        obstacle.lifetime = 250;
        obstacleGroup.add(obstacle);
    }
}

function spawnCoin(){
    if(frameCount%120==0){
        coin = createSprite(obstacle.x,obstacle.y+100,30,40);
        coin.addImage(coinImg);
        coin.scale = 0.1;
        coin.velocityY = 2;
        coin.lifetime = 250;
        coinGroup.add(coin);
    }
}
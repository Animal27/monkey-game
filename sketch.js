
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
  background("blue");
  
  monkey=createSprite(50,170,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.09;
  
  ground=createSprite(200,190,900,20);
  
   FoodGroup = new Group();
  obstacleGroup= new Group();
  
  monkey.debug=true;
}
score=0;

function draw() {
background("orange");
  
  text("Score: "+ score, 500,50);
  
 // console.log(monkey.y);
  
  
  if (gameState===PLAY){
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    ground.velocityX=-5;
    
    if(keyDown("space")) {
      monkey.velocityY=-12;
    }
    
   monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(ground);
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1;
    }
    
    
    SpawnFood();
    SpawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)){
  gameState=END;

    }
}
  else if(gameState===END){
    fill("blue");
    textSize(18);
    text("GAME OVER",280,50);
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
   monkey.destroy();
    
    
  }
  console.log(gameState)
  drawSprites();
}

function SpawnFood(){
  if (frameCount % 80 === 0) {
   banana=createSprite(300,100,10,10);
  banana.addImage("banana",bananaImage);
  banana.scale=0.1;
    banana.velocityX=-5;
    
    FoodGroup.add(banana);
}
}
function SpawnObstacle(){
  if (frameCount % 60 === 0) {
  obstacle=createSprite(300,160,10,10);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-5;
    
    obstacleGroup.add(obstacle);
  }
}



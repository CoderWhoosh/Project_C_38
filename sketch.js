
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,ground,bg,backImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("jungle.jpg");
}



function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  backImage = createSprite(0,0,700,700);
  backImage.addImage("jungle",bg);
  backImage.scale = 1.2;
  
  monkey = createSprite(80,240,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.1;
  
  //ground = createSprite(300,250,600,10);
  //ground.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  monkey.velocityX = 0;
  camera.position.x = displayWidth/2;
  camera.position.y = monkey.y;
  if (gameState === PLAY){
    //backImage.velocityY = 6;
  
    
    //if (keyDown("space") && monkey.y>295){
      //monkey.velocityY = -12;
    //}
    if (keyDown(LEFT_ARROW)) {
    monkey.velocityX = -4;
    }
    if (keyDown(RIGHT_ARROW)) {
    monkey.velocityX = 4;
    }
    //monkey.velocityY = monkey.velocityY + 1;
    survivalTime = Math.round(frameCount/80);
    
    if (obstacleGroup.isTouching(monkey)){
      monkey.scale-=0.05;
      backImage.velocityY = 0;
    }
    if (obstacleGroup.isTouching(monkey) && monkey.scale===0.1){
      gameState = END;
    }
    if (foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    create_obstacle();
    create_food();
    switch(score) {
      case 3: monkey.scale = 0.12;
              break;
      case 7: monkey.scale = 0.14;
              break;
      case 12: monkey.scale = 0.16;
              break;
      case 15: monkey.scale = 0.18;
              break;
      case 20: monkey.scale = 0.20;
              break;
      default: break;
    }
  }
  if (gameState === END){
    obstacleGroup.setVelocityYEach(0);
    foodGroup.setVelocityYEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  //monkey.collide(ground);
  drawSprites();
  stroke("white");
  fill("white");
  textSize(16);
  text("Survival Time: " + survivalTime,400,50);
  text("Bananas: " + score,50, 50);
  
}
function create_food(){
  if(frameCount % 180 === 0){
     banana = createSprite(Math.round(random(50,500)),10,20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityY = 6;
     banana.lifetime = 70;
     foodGroup.add(banana);
  }
}
function create_obstacle(){
  if(frameCount % 100 === 0){
     obstacle = createSprite(Math.round(random(0,500)),10,20,20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityY = 6;
     obstacle.lifetime = 70;
     obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,170);
  }
}  
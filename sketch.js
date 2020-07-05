var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudImage, o1,o2,o3,o4,o5,o6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ObstaclesGroup, CloudsGroup 
var count = 0
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 400);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,100,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
 // ground.y = height
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = true;
  trex.addAnimation("Collided",trex_collided)
   ObstaclesGroup = new Group(); 
CloudsGroup = new Group();
  
}

function draw() {
  background(255,255,255);
  
//   if(keyDown("space")) {
//     trex.velocityY = -10;
//   }
// spawnObstacles();
//   trex.velocityY = trex.velocityY + 0.8
  
//   if (ground.x < 0){
//     ground.x = ground.width/2;
//   }
 
   //spawnClouds();
  
  
  
  
  
if(gameState === PLAY){
    //move the ground
  
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count + Math.round(frameRate/60);
    
     if (count>0 && count%100 === 0){
       // playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;

    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
      // playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
     //spawn obstacles
  spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      // playSound("jump.mp3");
      gameState = END;
      // playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    // gameOver.visible = true;
    // restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    // trex.setAnimation("trex_collided");
    trex.changeAnimation("Collided");
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);  
  }
  
  
  trex.collide(invisibleGround);
  drawSprites(); 
  
  
  
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud =  createSprite(600,120,40,10);
    CloudsGroup.add(cloud)
    cloud.addImage("cloudImage",cloudImage);
    cloud.y = random(60,120);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}




function spawnObstacles() { 
  if(frameCount % 60 === 0 ) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    obstacle.scale = 0.5;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.setAnimation("obstacle" + rand);
    console.log(rand); 
    
    
switch(rand)
{ 
  case 1:
    obstacle.addImage("o1",o1);
    break;
    case 2:
    obstacle.addImage("o2",o2);
    break;
     case 3:
    obstacle.addImage("o3",o3);
    break;
    case 4:
    obstacle.addImage("o4",o4);
    break;
    case 5:
    obstacle.addImage("o5",o5);
    break;
    case 6:
    obstacle.addImage("o6",o6);
    break;
    default:
    break;
}
  ObstaclesGroup.add(obstacle)
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
  }
}
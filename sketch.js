var Rocky,Adheera;
var ground,obstacle;
var Rockyimg,Adheeraimg,gameOver,gameOverImg;
var backgroundImg,Obstacleimg;
var backG;
var score;
var obstacleGroup;
var Reset;
var gameState = "start";

function preload()
{
  backgroundImg = loadImage("Images/BG.jpg");
  Rockyimg = loadAnimation("Images/Yash.png","Images/Yash2removebg.png","Images/Yash3removebg.png","Images/Yash4removebg.png","Images/Yash5removebg.png","Images/Yash6removebg.png","Images/Yash7removebg.png","Images/Yash8removebg.png");
  Obstacleimg = loadImage("Images/obstacleremovebg.png");
  gameOverImg = loadImage("Images/91.png");  
}

function setup() 
{
  
  createCanvas(displayWidth,displayHeight);

  obstacleGroup = new Group();

  backG = createSprite(displayWidth/2,displayHeight/2,displayWidth-5,displayHeight-200);
  backG.addImage(backgroundImg);
  backG.velocityX = -10;

  Rocky = createSprite(400, 630, 20, 20);
  Rocky.addAnimation('Rockyimg',Rockyimg);
  Rocky.scale = 0.45;

  ground = createSprite(750,730,1500,30);
  ground.x = ground.width/2;
  ground.visible = false;

  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage('gameOverImg',gameOverImg);
  gameOver.visible = false;

  Reset = createButton('Reset');

  score = 0;
  
}

function draw() 
{
  background(255);
  //image(backgroundImg,displayWidth/2,displayHeight/2,displayWidth*4,displayHeight*4);

 if(gameState === "start"){
      if(backG.x < 600 ){
        backG.x = displayWidth/2;
      }
      
      if(Rocky.x > displayWidth){
        backG.x = Rocky.x + displayWidth/2;
      }

      spawnObstacle();

      score = score + Math.round(getFrameRate()/60);

      if(keyIsDown(RIGHT_ARROW) ){
        Rocky.x = Rocky.x + 10;
      }

      if(keyWentDown("space")){
        Rocky.velocityY = -10;
     }

      if(obstacleGroup.isTouching(Rocky)){
        gameState = "end";
      }

      if(keyIsDown(LEFT_ARROW)){
        Rocky.x = Rocky.x - 10;
      }

      
   }

   else{
     console.log("Game is over");
     Rocky.visible = false;
     backG.velocityX = 0;
     gameOver.visible = true;
   }

   Rocky.velocityY = Rocky.velocityY + 0.5;

   //barStatus();

   Rocky.collide(ground);

  drawSprites();

  textSize(30); fill("black"); 

  text("Score: "+ score, displayWidth/2,displayHeight/2);

}

function spawnObstacle(){
  if(frameCount % 60 === 0){
    var randX = random(100,displayWidth - 200);
    obstacle = createSprite(randX,-10,25,25);
    obstacle.addImage(Obstacleimg);
    obstacle.velocityY = +20;
    obstacle.scale = 0.30;
    obstacle.lifetime = displayHeight/5;
    obstacleGroup.add(obstacle);
  }
}

function barStatus(type,y,w,color)
{ 
  stroke(color); fill(color); textSize(15); 
  text(type,width-150,y-10); fill("WHITE"); 
  rect(width-150,y,100,20); fill(color); 
  rect(width-150,y,w,20); 
}
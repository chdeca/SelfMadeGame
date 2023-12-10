var spaceship, aliens;
var alienGroup;
var life = 5;
var score = 0;
var gameState = "play"
var lifebar;

function preload() {
  spaceshipImg = loadImage("Spaceship.png");
  alienImg = loadImage("Alien.png");
  backgroundImg = loadImage("background.png");
  bulletImg = loadImage("bullet.png");
}

function setup() {
  createCanvas(800, 600);
 
  spaceship = createSprite(width/2, 500, 50, 50);
  spaceship.addImage(spaceshipImg)
  spaceship.scale = 0.1

  bar1 = createSprite(width-200,40,20,20)
  bar1.shapeColor = "green"

   bar2 = createSprite(width-180,40,20,20)
   bar2.shapeColor = "green"

   bar3 = createSprite(width-160,40,20,20)
   bar3.shapeColor = "green"

   bar4 = createSprite(width-140,40,20,20)
   bar4.shapeColor = "green"

   bar5 = createSprite(width-120,40,20,20)
   bar5.shapeColor = "green"

   lifebar = createSprite(width-160,50,100,1)
   lifebar.shapeColor = "white"
   lifebar = createSprite(width-160,30,100,1)
   lifebar.shapeColor = "white"
   lifebar = createSprite(width-210,40,1,20)
   lifebar.shapeColor = "white"
   lifebar = createSprite(width-110,40,1,20)
   lifebar.shapeColor = "white"
   
  bulletGroup = new Group()
  alienGroup = new Group()
}


function draw() {
  background(backgroundImg);  
  if (keyDown(LEFT_ARROW)){
    spaceship.x = spaceship.x - 8;
  }
  if (keyDown(RIGHT_ARROW)){
    spaceship.x = spaceship.x + 8;
  }
  if (keyDown("space") || keyDown(UP_ARROW)) {
    spawnBullet();
  }
  if(life===4){
    bar1.visible = true
    bar2.visible = true
    bar3.visible = true
    bar4.visible = true
    bar5.visible = false
  }
  if(life===3){
    bar1.visible = true
    bar2.visible = true
    bar3.visible = true
    bar4.visible = false
    bar5.visible = false
  }
  if(life===2){
    bar1.visible = true
    bar2.visible = true
    bar3.visible = false
    bar4.visible = false
    bar5.visible = false
  }
  if(life===1){
    bar1.visible = true
    bar2.visible = false
    bar3.visible = false
    bar4.visible = false
    bar5.visible = false
  }
  if(life===0){
    gameState = "lost"
    
  }
  spawnAliens();
  if(alienGroup.isTouching(bulletGroup)){
    for(var i=0;i<alienGroup.length;i++){     
        
     if(alienGroup[i].isTouching(bulletGroup)){
          alienGroup[i].destroy()
          bulletGroup.destroyEach()
   
          score = score+1
          } 
    
    }
  }
  if(alienGroup.isTouching(spaceship)){
 
  for(var i=0;i<alienGroup.length;i++){     
       
   if(alienGroup[i].isTouching(spaceship)){
        alienGroup[i].destroy()
       
       life=life-1
        } 
  
  }
 }
  drawSprites();

//displaying the score and remaining lives and bullets
textSize(20)
  fill("white")
text("Score = " + score,width-200,100)
text("Lives = " + life,width-200,200)

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  alienGroup.destroyEach();
  player.destroy();
}

}

function spawnAliens() 
{
      if(World.frameCount % 100 === 0) {
        alien = createSprite(400, 200, 50, 50);
        alien.addImage(alienImg);
        alien.scale = 0.1;
    
   
    alien.velocityX = Math.round(random(-7,7));
    alien.velocityY = Math.round(random(-7,7));

    //random y positions for top obstacles
    alien.y = Math.round(random(100,500));
    alien.x = Math.round(random(300,800));
   
    alienGroup.add(alien)

     //assign lifetime to the variable
   alien.lifetime = 500;

    
   spaceship.depth = spaceship.depth + 1;
   
     }
   
}



function spawnBullet() 
{
      if(World.frameCount % 10 === 0) {
        bullet = createSprite(spaceship.x, spaceship.y-55, 5, 10);
        bullet.addImage(bulletImg);
        bullet.scale = 0.05;
        bullet.velocityY = -10;

        bulletGroup.add(bullet)

     //assign lifetime to the variable
   bullet.lifetime = 500;
      }
}



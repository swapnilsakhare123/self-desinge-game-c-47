var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombiepng
var zombieGroup
var heart1,heart2,heart3
var heart1png
var heart2png
var heart3png
var life=3
var score=0
var bulletnos=50

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
   zombiepng = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
   heart1png = loadImage("assets/heart_1.png")
   heart2png = loadImage("assets/heart_2.png")
   heart3png = loadImage("assets/heart_3.png")  
   gameoverImg=loadImage("assets/gameover.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup=createGroup() 
   bulletsGroup=createGroup()

    heart1=createSprite(width-150,40,20,20)
   heart1.addImage(heart1png)
   heart1.scale=0.4

   heart2=createSprite(width-110,40,20,20)
   heart2.addImage(heart2png)
   heart2.scale=0.4

   heart3=createSprite(width-150,40,20,20)
   heart3.addImage(heart3png)
   heart3.scale=0.4
   
   gameover=createSprite(width/2,height/2,40,40)
   gameover.addImage(gameoverImg)
   gameover.visible=false
}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)

   bullets()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}  
zombieGroup.overlap(player,function(zo,pl){
  zo.destroy()
  life=life-1
})
if (life==0) {
gameover.visible=true
zombieGroup.destroyEach()
heart1.visible=false

}
if (life==1){
  heart1.visible=true
  heart2.visible=false
  heart3.visible=false
}

if (life==2){
  heart1.visible=false
  heart2.visible=true
  heart3.visible=false
}

if (life==3){
  heart1.visible=false
  heart2.visible=false
  heart3.visible=true


}
bulletsGroup.overlap(zombieGroup,function(bu,zo){
  zo.destroy()
  bulletsGroup.destroyEach()
  score=score+2
})
enemy(); 
drawSprites();
fill("red")
textSize(15)
 text("SCORE"+score,width-400,30)

}
 function enemy () {
   if(frameCount%100===0){

   
   zombie=createSprite(width,random(100,500),10,100)
   zombie.velocityX=-3
   zombie.addImage(zombiepng)
   zombie.scale=0.15
   zombie.lifetime=400
   zombieGroup.add(zombie)
   
 }}
function bullets () {
  bullet=createSprite(player.x+20,player.y-25,20,10)
  bullet.velocityX=10
  bullet.lifetime=200
  bulletsGroup.add(bullet)
}


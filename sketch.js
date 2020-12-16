
var dog, normalDog,happyDog, database,  foodStock;

var feed,addFood,fedTime,lastFed,food;

function preload()
{
  happyDog = loadImage("dogImg1.png");
  normalDog = loadImage("dogImg.png");
  sadDog = loadImage("Lazy.png")
  bedroom = loadImage("Bed Room.png");
  bathroom = loadImage("Wash Room.png");
  garden = loadImage("Garden.png")
}

function setup() {
  createCanvas(800,500);

  database = firebase.database();
  food = new Food();

  foodStock=food.getFoodStock();
   
  dog = createSprite(550,300,20,20);
  dog.addImage(normalDog);
  dog.scale = 0.4;

  feed = createButton("Feed dog");
  feed.position(270,95);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(460,95);
  add.mousePressed(addFood);
}


function draw() {  
  background(46, 139, 87);


  food.display();

  drawSprites();

  textAlign(CENTER);
  fill(0);
  
  textSize(30);
  text("Feed Your Dog",400,50);

  textSize(20);
  if(food.lastFed >= 12)
    text("Last Feed : " + food.lastFed%12 + " PM", 200,400);
  else if(food.lastFed == 0)
    text("Last Feed : 12 Noon",200,400);
  else if(food.lastFed == 12)
    text("Last Feed : Midnight 12",200,400)
  else
    text("Last Feed : " + food.lastFed + " AM",200,400);

  text("Food Remaining: " + food.foodStock,200,180);

  imageMode(CENTER);

  if(food.currentTime > food.lastFed){
    if(food.lastFed + 2 === food.currentTime){
      dog.addImage(bedroom);
    }else if(food.lastFed + 1 === food.currentTime){
      dog.addImage(garden);
    }else if(food.lastFed + 4 === food.currentTime){
      dog.addImage(sadDog);
    }
  }
}

function feedDog(){
  dog.addImage(happyDog);
  food.deductFood();
}

function addFood(){
  if(food.foodStock<20){ 
    food.foodStock++;
    dog.addImage(normalDog);
    food.updateFoodStock();
  }
}


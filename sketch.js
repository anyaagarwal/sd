var dog,sadDog,happyDog, database;
var foodS,foodStock;

var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed

function preload(){
Dog=loadImage("Dog.png");

}

function setup() {
  database=firebase.database();
  createCanvas(900,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(Dog);
  dog.scale=0.5;

  //create feed the dog button here


  addFood=createButton("Add Food");
  addFood.position(800,200);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(700,200)
  feed.mousePressed(feedDog)

}

function draw() {
  background("yellow");
  foodObj.display();

  //write code to read fedtime value from the database 
 
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
lastFed=data.val()
  })
  
  
 
  //write code to display text lastFed time here

  fill(255,255,255)

  if(lastFed>=12){
    fill("red");
    text("LAST time fed: "+ lastFed%12+" PM",350,30)
  }else if(lastFed==0){
    fill("red");
    text("LAST time fed: 12 AM",350,30)
  }else{
    fill("red");
    text("LAST time fed: "+ lastFed+" AM",350,30)
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val * 0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
      FeedTime:hour()
    
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



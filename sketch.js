var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFeed;
var feedTimeRef;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTimeRef = database.ref("feedTime")
 feedTimeRef.on("value",(data)=>{
   lastFeed = data.val();
 }) 
 
  //write code to display text lastFed time here
fill("blue");
textSize(20);
if(lastFeed >= 12){
  text("Last Feed: "+ lastFeed%12 + " PM ",300,50);
} else if (lastFeed ==0){
    text("Last Feed = 12 AM",300,50);
} else{
  text("Last Feed: "+ lastFeed + " AM ",300,50);
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
     var foodStock = foodObj.getFoodStock();

     if(foodStock <= 0  ){
        foodObj.updateFoodStock(foodStock*0)
     } else {
      foodObj.updateFoodStock(foodStock-1);
     }
      
     
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

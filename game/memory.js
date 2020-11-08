var matched = 8;
var match_check = false;
var pick = 0;
var totalTries = 0;
var pickOne = null;
var pickTwo = null;

var interval;
var startTime;

var checking = false;

const tiles = [];

var gameWindow;
var startButton;
var missButton;

var timerElement;
var triesElement;

document.write("<div class= \"intro-ani\" id=\"gameWindow\"></div>");
gameWindow = document.getElementById("gameWindow");
gameWindow.style = "height: 700px; margin: auto;"
gameWindow.addEventListener("animationend", initialize);

function initialize(){
  gameWindow.parentNode.removeChild(gameWindow);
  document.write("<div id=\"gameWindow\"></div>");
  gameWindow = document.getElementById("gameWindow");
  gameWindow.style = "width: 645px; height: 649px; background-color: #0DB0EE; border-style: solid; margin: auto; text-align: center; padding: 22px;";
  startButton = document.createElement("button");
  startButton.setAttribute("onclick", "executeAsync(makeGame)");
  startButton.innerHTML = "Click To Start";
  startButton.style = "height: inherit; width: inherit; background: none; border: none; outline: none; font-size: 50px; padding: 20px;";
  gameWindow.appendChild(startButton);
}

function executeAsync(func){
  setTimeout(func, 0);
}

function update(){
  var timeTaken = Math.round((Date.now() - startTime)/1000);
  timerElement.innerHTML = (Math.round(timeTaken / 60)) + ":";
  if(timeTaken % 60 < 10){
    timerElement.innerHTML += "0" + (timeTaken % 60);
  }
  else{
    timerElement.innerHTML += (timeTaken % 60);
  }

  triesElement.innerHTML = "Tries: " + totalTries;

  if(matched == 8){
    clearInterval(interval);
    victory();
  }
}

//Returns number between 0 and max
function randNum(max){
  return Math.floor(Math.random() * (Math.floor(max) + 1));
}

function imgClick(id){
  if(checking == true){
    return;
  }
  checking = true;
  var img = document.getElementById(id).children[0];
  if(img.id != "matched" || pick == 2){
    if(pick == 0){
      pick = pick + 1;
      pickOne = id;
      img.src = "images/img" + tiles[parseInt(id.match(/\d+/), 10)] + ".gif";
    }
    else if(pick == 1 && id != pickOne){
      pick = pick + 1;
      totalTries = totalTries + 1;
      pickTwo = id;
      img.src = "images/img" + tiles[parseInt(id.match(/\d+/), 10)] + ".gif";
      if(tiles[parseInt(id.match(/\d+/), 10)] == tiles[parseInt(pickOne.match(/\d+/), 10)]){
        matched = matched + 1;
        match_check = true;
        img.id = "matched";
        document.getElementById(pickOne).children[0].id = "matched";
        document.getElementById(id).style.borderColor = "lime";
        document.getElementById(pickOne).style.borderColor = "lime";
      }
      else{
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(pickOne).style.borderColor = "red";
      }
    }
    else if(pick == 2){
      if(!match_check){
        document.getElementById(pickOne).children[0].src = "images/def.gif";
        document.getElementById(pickTwo).children[0].src = "images/def.gif";
      }
      document.getElementById(pickOne).style.borderColor = "black";
      document.getElementById(pickTwo).style.borderColor = "black";
      pick = 0;
      match_check = false;
    }
  }
  //sleep(3000);
  checking = false;
  return;
}

function makeGame(){

  matched = 0;
  match_check = false;
  pick = 0;
  totalTries = 0
  pickOne = null;
  pickTwo = null;
  checking = false;

  var table;
  var tr;
  var td;
  var tile;
  var tileImg;

  while(gameWindow.firstChild){
    gameWindow.removeChild(gameWindow.lastChild);
  }

  for(var x = 0; x < 8; x++){
    tiles[x * 2] = x;
    tiles[(x * 2) + 1] = x;
  }

  for(var x = 0, tileOne = 0, tileTwo = 0, temp = 0; x < 1500; x++){
    tileOne = randNum(15);
    tileTwo = randNum(15);

    temp = tiles[tileOne];
    tiles[tileOne] = tiles[tileTwo];
    tiles[tileTwo] = temp;
  }

  table = document.createElement("table");
  table.style = "border-spacing: 4px; padding: 0px; margin: 0px;"
  for(var x = 0; x < 4; x++){
    tr = document.createElement("tr");
    for(var y = 0; y < 4; y++){
      td = document.createElement('td');
      td.style = "padding: 0px;"

      tile = document.createElement("button");
      tile.type = "button";
      tile.setAttribute("onclick", "executeAsync(imgClick(this.id))");
      tile.id = "tile" + ((x * 4) + y);
      tile.style = "border-style: solid; border-color: black; border-width: 3px; outline: none; background: inherit; height: 156px; width: 156px; padding: 0px; margin: 0px;";

      tileImg = document.createElement("img");
      tileImg.src = "images/def.gif";//"images/img" + tiles[(x * 4) + y] + ".gif";
      tileImg.style = "height: 150px; width: 150px;";
      tileImg.setAttribute("ondragstart", "executeAsync(imgClick(this.parentNode.id)); return false;");

      tile.appendChild(tileImg);
      td.appendChild(tile);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  tr = document.createElement("tr");
  td = document.createElement("td");
  td.id = "timer";
  td.setAttribute("colspan", "2");
  td.appendChild(document.createTextNode("0:00"));
  td.style = "text-align: center;"
  tr.appendChild(td);
  timerElement = td;
  td = document.createElement("td");
  td.id = "tries";
  td.setAttribute("colspan", "2");
  td.appendChild(document.createTextNode("Tries: 0"));
  td.style = "text-align: center;"
  tr.appendChild(td);
  table.appendChild(tr);
  triesElement = td;

  gameWindow.appendChild(table);

  startTime = Date.now();
  interval = setInterval(update, 100);
  return;

}

function victory(){

  var img;
  var div;
  var table;
  var tr;
  var td;
  var time = timerElement.innerHTML;
  var tries = triesElement.innerHTML;
  var restartButton;

  while(gameWindow.firstChild){
    gameWindow.removeChild(gameWindow.lastChild);
  }

  div = document.createElement("div");
  div.style = "position: relative; left: -22px; height: 80px; width: 689px; padding: 0xp; margin: 0px; font-weight: bold; font-size: 40px;"
  div.innerHTML = "<marquee>CONGRADULATIONS!!!</marquee>";
  gameWindow.appendChild(div);
  div = document.createElement("div");
  div.style = "display: inline-block; height: 425px; padding: 0px; margin: 0px;"
  img = document.createElement("img");
  img.style = "height: 400px; width: auto; border-style: solid; border-color: black;"
  img.src = "images/durkin.PNG";
  div.appendChild(img);
  gameWindow.appendChild(div);
  div = document.createElement("div");
  div.style = "height: 80px; width: 645px; padding: 0xp; margin: 0px;"
  table = document.createElement("table");
  tr = document.createElement("tr");
  td = document.createElement("td");
  td.innerHTML = "Final Time: " + time;
  td.style = "width: 380px; text-align: center; font-size: 40px;"
  tr.appendChild(td);
  td = document.createElement("td");
  td.innerHTML = tries;
  td.style = "width: 300px; text-align: center; font-size: 40px;"
  tr.appendChild(td);
  table.appendChild(tr);
  gameWindow.appendChild(table);

  restartButton = document.createElement("button");
  restartButton.style = "height: 60px; width: 240px; outline: none; background-color: #0C77E2; border-color: #098AF5; outline: none; margin-top: 20px;";
  restartButton.innerHTML = "<h2>Play Again</h2>";
  restartButton.setAttribute("onclick", "executeAsync(makeGame)");
  gameWindow.appendChild(restartButton);

  return;
}

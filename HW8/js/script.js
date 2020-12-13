var tiles = [];
var tiles_index = 0;
var placed_tiles = 0;

var starting_tile = 0;
var new_word = true;

var tiles_per_row = 15;
var number_of_rows = 1;
var double_word = [2, 12];
var double_letter = [6, 8];

var hand_size = 7;
var tiles_in_hand = 0;

var score = 0;

initialize();

function initialize(){
  var piece_array_index;
  var gameWindow = document.getElementById("scrabbleWindow");
  var board;
  var hand;
  var controls;
  var image;
  var tr;
  var td;
  var element;

  tiles_index = 0;
  placed_tiles = 0;
  tiles_in_hand = 0;
  starting_tile = 0;
  new_word = false;
  score = 0;

  for(var x = 0; x < 26; x++){
    piece_array_index = (x + 10).toString(36).toUpperCase();
    for(y = 0, z = Object.values(ScrabbleTiles[piece_array_index])[1]; y < z; y++){
      tiles.push(piece_array_index);
    }
  }

  for(var x = 0, size = tiles.length, tileOne, tileTwo, temp; x < 1500; x++){
    tileOne = randNum(size - 1);
    tileTwo = randNum(size - 1);

    temp = tiles[tileOne];
    tiles[tileOne] = tiles[tileTwo];
    tiles[tileTwo] = temp;
  }

  board = document.createElement('div');
  board.id = "board";
  board.style.backgroundImage = "url('images/Scrabble_Board_OneLine.png')";

  for(var x = 0; x < number_of_rows; x++){
    for(var y = 0; y < tiles_per_row; y++){
      image = document.createElement('img');
      image.style.visibility = "hidden";
      image.id = (x * tiles_per_row) + y;
      image.src = "images/Scrabble_Tiles/Scrabble_Tile_A.jpg"
      image.classList.add("tile", "b_none");
      image.setAttribute("ondrop", "drop(event)");
      image.setAttribute("ondragover", "allow_drop(event)");
      board.appendChild(image);
    }
  }

  gameWindow.appendChild(board);

  for(var x = 0, temp; x < double_word.length; x++){
    temp = document.getElementById(double_word[x]);
    temp.classList.remove("b_none");
    temp.classList.add("b_dw");
  }

  for(var x = 0, temp; x < double_letter.length; x++){
    temp = document.getElementById(double_letter[x]);
    temp.classList.remove("b_none");
    temp.classList.add("b_dl");
  }

  hand = document.createElement('div');
  hand.id = "hand";
  hand.style.backgroundImage = "url('images/scrabble-tile-holder-406774_640.png')"

  gameWindow.appendChild(hand);

  for(var image, letter; tiles_in_hand < hand_size; tiles_in_hand++){
    letter = tiles[tiles_index++]
    image = document.createElement('img');
    image.id = "h" + tiles_in_hand;
    image.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
    image.classList.add("tile", letter);
    image.setAttribute("draggable", true);
    image.setAttribute("ondragstart", "drag(event)");

    hand.appendChild(image);
  }

  controls = document.createElement('div');
  controls.id = "controls";
  tr = document.createElement('tr');
  controls.appendChild(tr);

  td = document.createElement('td');
  element = document.createElement('p');
  element.id = "score";
  element.innerHTML = "Score: " +  score;
  td.appendChild(element);
  tr.appendChild(td);

  td = document.createElement('td');
  element = document.createElement('button');
  element.id = "submit_word";
  element.setAttribute("onclick", "submit_word(" + starting_tile + ")");
  element.innerHTML = "Submit Word";
  td.appendChild(element);
  tr.appendChild(td);

  td = document.createElement('td');
  element = document.createElement('button');
  element.id = "new_hand";
  element.setAttribute("onclick", "new_hand()");
  element.innerHTML = "New Hand";
  td.appendChild(element);
  tr.appendChild(td);

  td = document.createElement('td');
  element = document.createElement('button');
  element.id = "reset";
  element.setAttribute("onclick", "reset()");
  element.innerHTML = "Reset";
  td.appendChild(element);
  tr.appendChild(td);

  gameWindow.appendChild(controls);

  return;
}


function randNum(max){
  return Math.floor(Math.random() * (Math.floor(max) + 1));
}

function new_hand(){
  if(tiles_in_hand == hand_size){
    for(var temp, letter; tiles_in_hand > 0;){
      temp = document.getElementById("h" + (tiles_in_hand-- - 1));
      letter = temp.classList.item(1);
      tiles[--tiles_index] = letter;
      temp.classList.remove(letter);
    }

    for(var x = 0, size = tiles.length, tileOne, tileTwo, temp; x < 1500; x++){
      tileOne = randNum(size - 1 - tiles_index) + tiles_index;
      tileTwo = randNum(size - 1 - tiles_index) + tiles_index;

      temp = tiles[tileOne];
      tiles[tileOne] = tiles[tileTwo];
      tiles[tileTwo] = temp;
    }

    for(var temp, letter; tiles_in_hand < hand_size;){
      temp = document.getElementById("h" + tiles_in_hand++);
      letter = tiles[tiles_index++];
      temp.classList.add(letter);
      temp.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
    }
  }
  return;
}

function submit_word(starting_tile){

}

function allow_drop(event){
  event.preventDefault();
  return;
}

function drag(event){
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event){
  event.preventDefault();
  var tile = document.getElementById(event.dataTransfer.getData('text'));
  var letter;
  var slot = event.target;

  if(tile.style.visibility == "visible" && slot.style.visibility == "hidden" &&
    (!placed_tiles ||
    document.getElementById(parseInt(slot.id) - 1).style.visibility == "visible" ||
    document.getElementById(parseInt(slot.id) + 1).style.visibility == "visible")){
      tile.style.visibility = "hidden";
      tiles_in_hand--;
      letter = tile.classList.item(1);
      tile.classList.remove(letter);

      if(new_word){
        new_word == false;
        starting_tile == parseInt(slot.id);
      }

      slot.classList.add(letter);
      slot.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
      slot.style.visibility = "visible";
      placed_tiles++;
  }
  return;
}

function reset(){
  while(scrabbleWindow.firstChild){
    scrabbleWindow.removeChild(scrabbleWindow.lastChild);
  }
  initialize();
}

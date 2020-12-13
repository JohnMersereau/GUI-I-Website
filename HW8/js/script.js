var tiles = [];
var tiles_index = 0;
var placed_tiles = 0;

var starting_tile = 0;
var new_word = true;

const tiles_per_row = 15;
const number_of_rows = 1;
const double_word = [2, 12];
const double_letter = [6, 8];

const hand_size = 7;
var tiles_in_hand = 0;

var score = 0;

initialize();

function initialize(){
  var piece_array_index;
  const gameWindow = document.getElementById("scrabbleWindow");
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
  new_word = true;
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
      image.style.opacity = 0;
      image.id = (x * tiles_per_row) + y;
      image.src = "images/Scrabble_Tiles/Scrabble_Tile_A.jpg"
      image.classList.add("tile", "b_none");
      image.setAttribute("ondrop", "drop(event)");
      image.setAttribute("ondragover", "allow_drop(event)");
      image.setAttribute("draggable", "false")
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
    image.src = "images/Scrabble_tiles/Scrabble_Tile_" + letter + ".jpg";
    image.classList.add("tile", letter);
    image.setAttribute("draggable", "true");
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
  element.setAttribute("onclick", "submit_word()");
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

function submit_word(){
  var word_score = 0;
  var word_multiplier = 1;
  const score_card = document.getElementById("score");

  if(new_word){ return; }
  new_word = true;

  for(var x = starting_tile, tile, letter, val; x >= 0;){
    tile = document.getElementById(x--);
    letter = tile.classList.item(2);
    if(letter == null){ break; }
    val = Object.values(ScrabbleTiles[letter])[0];

    word_score += val;
    if(tile.classList.contains("b_dl")){
      word_score += val;
      tile.classList.remove("b_dl", letter);
      tile.classList.add("b_none", letter);
    }
    else if(tile.classList.contains("b_dw")){
      word_multiplier++;
      tile.classList.remove("b_dw", letter);
      tile.classList.add("b_none", letter);
    }
  }

  for(var x = starting_tile + 1, tile, letter, val; x < tiles_per_row;){
    tile = document.getElementById(x++);
    letter = tile.classList.item(2);
    if(letter == null){ break; }
    val = Object.values(ScrabbleTiles[letter])[0];

    word_score += val;
    if(tile.classList.contains("b_dl")){
      word_score += val;
      tile.classList.remove("b_dl", letter);
      tile.classList.add("b_none", letter);
    }
    else if(tile.classList.contains("b_dw")){
      word_multiplier++;
      tile.classList.remove("b_dw", letter);
      tile.classList.add("b_none", letter);
    }
  }

  word_score = word_score * word_multiplier;
  score += word_score;
  score_card.innerHTML = "Score: " + score;

  refill_hand();

  return;
}

function refill_hand(){
  for(var x = 0, tile, letter; x < hand_size && tiles_index < tiles.length;){
    tile = document.getElementById("h" + x++);
    if(tile.style.visibility == "hidden"){
      letter = tiles[tiles_index++];
      tile.classList.remove(tile.classList.item(1));
      tile.classList.add(letter);
      tile.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
      tiles_in_hand++;

      tile.style.visibility = "visible";
    }
  }
  return;
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
  const tile = document.getElementById(event.dataTransfer.getData('text'));
  var letter;
  const slot = event.target;

  if(tile.style.visibility != "hidden" && slot.style.opacity == 0 &&
    (!placed_tiles ||
    (parseInt(slot.id) - 1 >= 0 && document.getElementById(parseInt(slot.id) - 1).style.opacity != 0) ||
    (parseInt(slot.id) + 1 <= tiles_per_row && document.getElementById(parseInt(slot.id) + 1).style.opacity != 0))){
      tile.style.visibility = "hidden";
      tiles_in_hand--;
      letter = tile.classList.item(1);
      tile.classList.remove(letter);

      if(new_word){
        new_word = false;
        starting_tile = parseInt(slot.id);
      }

      slot.classList.add(letter);
      slot.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
      slot.style.opacity = 1;
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

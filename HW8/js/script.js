//John Mersereau
//John_Mersereau@student.uml.edu
//Student of UMass Lowell in course 91.61 GUI Programming I
//Created on 12/14/20
//Sources:
//Image and array files given in assignment handout.

var tiles = []; //Holds the game's tiles.
var tiles_index = 0;
var placed_tiles = 0;

var starting_tile = 0;
var new_word = true;


//Setting board size and bonus squares.
const tiles_per_row = 15;
const number_of_rows = 1;
const double_word = [2, 12];
const double_letter = [6, 8];

const hand_size = 7;
var tiles_in_hand = 0;

var score = 0;

initialize();

//Creates / Sets up a new game.
function initialize(){
  //Grabbing the game window made in the html file.
  const gameWindow = document.getElementById("scrabbleWindow");

  var piece_array_index;
  var board;
  var hand;
  var controls;
  var image;
  var tr;
  var td;
  var element;


  //Reset values.
  tiles_index = 0;
  placed_tiles = 0;
  tiles_in_hand = 0;
  starting_tile = 0;
  new_word = true;
  score = 0;

  //Filling the tiles array with all the tiles, with correct distribution.
  for(var x = 0; x < 26; x++){
    piece_array_index = (x + 10).toString(36).toUpperCase();
    for(y = 0, z = Object.values(ScrabbleTiles[piece_array_index])[1]; y < z; y++){
      tiles.push(piece_array_index);
    }
  }

  //Randomize tile order within tiles array.
  for(var x = 0, size = tiles.length, tileOne, tileTwo, temp; x < 1500; x++){
    tileOne = randNum(size - 1);
    tileTwo = randNum(size - 1);

    temp = tiles[tileOne];
    tiles[tileOne] = tiles[tileTwo];
    tiles[tileTwo] = temp;
  }

  //Creating the board.
  board = document.createElement('div');
  board.id = "board";
  board.style.backgroundImage = "url('images/Scrabble_Board_OneLine.png')";

  //Fills the board with the appropriate amount of slots.
  //Gives each slot their ID, the default classes, and drag/drop attributes and functions.
  for(var x = 0; x < number_of_rows; x++){
    for(var y = 0; y < tiles_per_row; y++){
      image = document.createElement('img');
      image.style.opacity = 0;
      image.id = (x * tiles_per_row) + y;
      image.src = "images/Scrabble_Tiles/Scrabble_Tile_A.jpg" //placeholder img.
      image.classList.add("tile", "b_none");
      image.setAttribute("ondrop", "drop(event)");
      image.setAttribute("ondragover", "allow_drop(event)");
      image.setAttribute("draggable", "false")
      board.appendChild(image);
    }
  }

  gameWindow.appendChild(board);

  //Giving each bonus square their appropriate bonus class.
  //b_none (default) = no bonus.
  //b_dw = double word.
  //b_dl = double letter.

  //Double Word bonus.
  for(var x = 0, temp; x < double_word.length; x++){
    temp = document.getElementById(double_word[x]);
    temp.classList.remove("b_none");
    temp.classList.add("b_dw");
  }

  //Double Letter bonus.
  for(var x = 0, temp; x < double_letter.length; x++){
    temp = document.getElementById(double_letter[x]);
    temp.classList.remove("b_none");
    temp.classList.add("b_dl");
  }

  //Creating the hand.
  hand = document.createElement('div');
  hand.id = "hand";
  hand.style.backgroundImage = "url('images/scrabble-tile-holder-406774_640.png')"

  gameWindow.appendChild(hand);

  //Creating the slots for the hand, and gives each slot a tile from the tiles array.
  //Sets their ID and drag/drop attributes and functions.
  for(var image, letter; tiles_in_hand < hand_size; tiles_in_hand++){
    letter = tiles[tiles_index++]
    image = document.createElement('img');
    image.id = "h" + tiles_in_hand;
    image.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
    image.classList.add("tile", letter);
    image.setAttribute("draggable", "true");
    image.setAttribute("ondragstart", "drag(event)");

    hand.appendChild(image);
  }

  //Creating the controls board. which includes buttons to control the game
  //and their total score.

  controls = document.createElement('div');
  controls.id = "controls";
  tr = document.createElement('tr');
  controls.appendChild(tr);

  //Score card
  td = document.createElement('td');
  element = document.createElement('p');
  element.id = "score";
  element.innerHTML = "Score: " +  score;
  td.appendChild(element);
  tr.appendChild(td);

  //Submit Word button
  td = document.createElement('td');
  element = document.createElement('button');
  element.id = "submit_word";
  element.setAttribute("onclick", "submit_word()");
  element.innerHTML = "Submit Word";
  td.appendChild(element);
  tr.appendChild(td);

  //New Hand button
  td = document.createElement('td');
  element = document.createElement('button');
  element.id = "new_hand";
  element.setAttribute("onclick", "new_hand()");
  element.innerHTML = "New Hand";
  td.appendChild(element);
  tr.appendChild(td);

  //Restart button.
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

//Random Number Generator
//Takes the max number you want it to return.
//Returns any number between 0 and max.
function randNum(max){
  return Math.floor(Math.random() * (Math.floor(max) + 1));
}

//Gives the user a new hand
//If the user currently has a full hand:
//Places the tiles in their hand back into array, randomizes the unused tiles
//and gives them a new full hand.
//Otherwise: Nothing.
function new_hand(){
  if(tiles_in_hand == hand_size){
    //Places tiles in hand back into the tiles array.
    for(var temp, letter; tiles_in_hand > 0;){
      temp = document.getElementById("h" + (tiles_in_hand-- - 1));
      letter = temp.classList.item(1);
      tiles[--tiles_index] = letter;
      temp.classList.remove(letter);
    }

    //Randomizes the unused portion of the array.
    for(var x = 0, size = tiles.length, tileOne, tileTwo, temp; x < 1500; x++){
      tileOne = randNum(size - 1 - tiles_index) + tiles_index;
      tileTwo = randNum(size - 1 - tiles_index) + tiles_index;

      temp = tiles[tileOne];
      tiles[tileOne] = tiles[tileTwo];
      tiles[tileTwo] = temp;
    }

    //Deals a new hand.
    for(var temp, letter; tiles_in_hand < hand_size;){
      temp = document.getElementById("h" + tiles_in_hand++);
      letter = tiles[tiles_index++];
      temp.classList.add(letter);
      temp.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
    }
  }
  return;
}

//Scores the most recently placed word.
//Starts at the first tile placed, then counts all the tiles to the left.
//The counts all tiles to the right.
//Bonus letter tiles are applied first, then bonus word tiles.
//Adds the word's score to the total score and updates the score card.
function submit_word(){
  var word_score = 0;
  var word_multiplier = 1;
  const score_card = document.getElementById("score");

  //If there wasn't a new word placed, do nothing.
  //Immediately sets new_word to true if it passes the check in order to
  //help stop people from submitting their word twice.
  if(new_word){ return; }
  new_word = true;

  //Counts tiles to the left and initial tile.
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

  //Counts tiles to the right.
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

  //Applies word bonus and updates the score card.
  word_score = word_score * word_multiplier;
  score += word_score;
  score_card.innerHTML = "Score: " + score;

  //Refills hand.
  refill_hand();

  return;
}

//Refills the user's hand.
//Checks for any empty slots in the hand, and fills them with tiles from the
//tiles array.
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

//Disables defaults that can stop my functions from working.
function allow_drop(event){
  event.preventDefault();
  return;
}

//Sets the data that is sent with the drag.
//Sets the data as the ID of the thing being dragged.
function drag(event){
  event.dataTransfer.setData("text", event.target.id);
  return;
}

//Grabs the data set from the drag function.
//Checks if the slot is open, and the tile being dragged from the hand exists
//If those are true, sets the board tile to the tile dragged from the hand,
//and removes the tile from the hand.
//If this is the first letter being placed on the board, it can be placed anywhere,
//otherwise the tile must be next to another tile.
function drop(event){
  event.preventDefault();
  //Grab the sent data.
  const tile = document.getElementById(event.dataTransfer.getData('text'));
  var letter;
  const slot = event.target;

  if(tile.style.visibility != "hidden" && slot.style.opacity == 0 &&
    (!placed_tiles ||
    (parseInt(slot.id) - 1 >= 0 && document.getElementById(parseInt(slot.id) - 1).style.opacity != 0) ||
    (parseInt(slot.id) + 1 <= tiles_per_row && document.getElementById(parseInt(slot.id) + 1).style.opacity != 0))){

      //Removes tile from hand, and grabs that tile's data.
      //Removes first to help prevent tile duplication.
      tile.style.visibility = "hidden";
      tiles_in_hand--;
      letter = tile.classList.item(1);
      tile.classList.remove(letter);

      //If this is a new word, set the appropriate values.
      if(new_word){
        new_word = false;
        starting_tile = parseInt(slot.id);
      }

      //Set the board slot to the tile dragged from hand.
      slot.classList.add(letter);
      slot.src = "images/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg";
      slot.style.opacity = 1;
      placed_tiles++;
  }
  return;
}

//Reset function
//Deletes everything within the game, then calls the initialize functions
//to create a new game.
function reset(){
  while(scrabbleWindow.firstChild){
    scrabbleWindow.removeChild(scrabbleWindow.lastChild);
  }
  initialize();
  return;
}

//John Mersereau
//John_Mersereau@student.uml.edu
//Student of UMass Lowell in course 91.61 GUI Programming I
//Created on 10/29/20
//Sources:
//greaterThan validator: https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
//

$.validator.addMethod("greaterThanEqu",
  function (value, element, param) {
      var $otherElement = $(param);
      return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
  }
);

$.validator.addMethod("wholeNumber",
  function (value, element, param) {
    var num = parseInt(value, 10);
    return Number.isInteger(num);
  }
);

function setError (id){
  document.getElementById(id).style.borderColor = "red";
}

$("form").submit(function(){
  if($(this).valid()){
    create_table();
  }
  return false;
});

$(document).ready(function(){

  $('#iForm').validate({
      rules: {
        col_min: {
          required: true,
          wholeNumber: true,
          range: [-50, 50],
        },
        col_max: {
          required: true,
          wholeNumber: true,
          range: [-50, 50],
          greaterThanEqu: "#col_min"
        },
        row_min: {
          required: true,
          wholeNumber: true,
          range: [-50, 50],
        },
        row_max: {
          required: true,
          wholeNumber: true,
          range: [-50, 50],
          greaterThanEqu: "#row_min"
        }
      },

      messages: {
        col_min: {
          required: function(){
            setError("col_min");
            return "</br>Enter a minimum column value.";
          },
          digits: function(){
            setError("col_min");
            return "</br>Min Column Value must be a whole number.";
          },
          range: function(){
            setError("col_min");
            return "</br>Min Column Value must be within range -50 to 50.";
          }
        },
        col_max: {
          required: function(){
            setError("col_max");
            return "</br>Enter a maximum column value."
          },
          digits: function(){
            setError("col_max");
            return "</br>Max Column Value must be a whole number.";
          },
          range: function(){
            setError("col_max");
            return "</br>Max Column Value must be within range -50 to 50."
          },
          greaterThanEqu: function(){
            setError("col_max");
            return "</br>Max Column Value must be greater than or equal to Min Column Value."
          }
        },
        row_min: {
          required: function(){
            setError("row_min");
            return "</br>Enter a minimum row value.";
          },
          digits: function(){
            setError("row_min");
            return "</br>Min Row Value must be a whole number.";
          },
          range: function(){
            setError("row_min");
            return "</br>Min Row Value must be within range -50 to 50.>";
          }
        },
        row_max: {
            required: function(){
              setError("row_max");
              return "</br>Enter a maximum row value.";
            },
            digits: function(){
              setError("row_max");
              return "</br>Max Row Value must be a whole number.";
            },
            range: function(){
              setError("row_max");
              return "</br>Max Row Value must be within range -50 to 50.";
            },
            greaterThanEqu: function(){
              setError("row_max");
              return "</br>Max Row Value must be greather than or equal to Min Column Value.";
            }
        }
      },

      success: function(label, element){
        $(element).css({"border-color" : "black"});
      }

  });



});

function create_table(){
  //grabbing error field and table field
  var err_field = document.getElementById("error");
  var mult_table = document.getElementById("mult_table");

  //grabbing input values
  var min_col = document.getElementById("col_min").value;
  var max_col = document.getElementById("col_max").value;
  var min_row = document.getElementById("row_min").value;
  var max_row = document.getElementById("row_max").value;

  //resetting fields
  err_field.innerHTML = "";
  mult_table.innerHTML = "";

  //Error Handling
  //If they left an input blank
  //if(min_col == "" || max_col == "" || min_row == "" || max_row == ""){
  //  err_field.innerHTML += "Submit values for every field.</br>";
  //  return;
  //}

  //If the number they entered is not a whole number
  //if(min_col % 1 || max_col % 1 || min_row % 1 || max_row % 1){
  //  err_field.innerHTML += "Only submit whole numbers.</br>";
  //  return;
  //}

  //If any of the numbers are outside of the working range
  //if(min_col > 50 || max_col > 50 || min_row > 50 || max_row > 50 ||
  //   min_col < -50 || max_col < -50 || min_row < -50 || max_row < -50){
  //  err_field.innerHTML += "Only submit values between -50 and 50.</br>";
  //  return;
  //}

  //If any of the min values are greater than the max values
  //if(min_col > max_col || min_row > max_row){
  //  err_field.innerHTML += "Only submit min values that are less than or equal to respective max value.</br>";
  //  return;
  //}

  //Making the multiplication table
  table = document.createElement('table');

  //Creating first header row
  row = document.createElement('tr');
  //Create the corner block
  block = document.createElement('td');
  block.id = "blank";
  row.appendChild(block);
  //Filling up the header row with collumn numbers
  for (var x = min_col; x <= max_col; x++) {
    block = document.createElement('td');
    block.id = "header";
    block.innerHTML = x;
    row.appendChild(block);
  }
  //Adding row
  table.appendChild(row);

  //Making the rest of the table
  for(var x = min_row; x <= max_row; x++) {
    //making header cell for the row number
    row = document.createElement('tr');
    block = document.createElement('td');
    block.id = "header";
    block.innerHTML = x;
    //putting cell into row
    row.appendChild(block);
    //filling row with multiplied numbers
    for(var y = min_col; y <= max_col; y++){
      block = document.createElement('td');
      block.innerHTML = x * y;
      //putting cell into row
      row.appendChild(block);
    }
    //putting row into table
    table.appendChild(row);
  }
  //insertingt he table into the page
  mult_table.appendChild(table);

  return;
}

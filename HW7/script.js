//John Mersereau
//John_Mersereau@student.uml.edu
//Student of UMass Lowell in course 91.61 GUI Programming I
//Created on 11/12/20
//Sources:
//greaterThan validator: https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
//general reference: w3schools.com
//handouts given linked to in assignment

//update sliders when textboxes are changed.
$(function(){
  $("#col_min").change(function(){
    $("#cmin-slider").slider("value", this.value);
    $("#iForm").submit();
  })
  $("#col_max").change(function(){
    $("#cmax-slider").slider("value", this.value);
    $("#iForm").submit();
  })
  $("#row_min").change(function(){
    $("#rmin-slider").slider("value", this.value);
    $("#iForm").submit();
  })
  $("#row_max").change(function(){
    $("#rmax-slider").slider("value", this.value);
    $("#iForm").submit();
  })
});

//adding the sliders.
$(function() {
  //settings for the sliders
  var cmin_settings = {
    //range -50 to 50
    min: -50,
    max: 50,

    value: 0,
    step: 1,

    //update text block when sliding.
    slide: function(){
      $("#col_min").val($(this).slider("option", "value"));
    },
    //create table when changed.
    change: function(){
      $("#iForm").submit();
    },
  };
  var cmax_settings = {
    min: -50,
    max: 50,

    value: 0,
    step: 1,

    slide: function(){
      $("#col_max").val($(this).slider("option", "value"));
    },
    change: function(){
      $("#iForm").submit();
    },
  };
  var rmin_settings = {
    min: -50,
    max: 50,

    value: 0,
    step: 1,

    slide: function(){
      $("#row_min").val($(this).slider("option", "value"));
    },
    change: function(){
      $("#iForm").submit();
    },
  };
  var rmax_settings = {
    min: -50,
    max: 50,

    value: 0,
    step: 1,

    slide: function(){
      $("#row_max").val($(this).slider("option", "value"));
    },
    change: function(){
      $("#iForm").submit();
    },
  };
  $("#cmin-slider").slider(cmin_settings);
  $("#cmax-slider").slider(cmax_settings);
  $("#rmin-slider").slider(rmin_settings);
  $("#rmax-slider").slider(rmax_settings);
});

//check for if something is >=
$.validator.addMethod("greaterThanEqu",
  function (value, element, param) {
      var $otherElement = $(param);
      return Number.parseInt(value, 10) >= parseInt($otherElement.val(), 10);
  }
);

//check if something is a pos or neg whole number.
$.validator.addMethod("wholeNumber",
  function (value, element, param) {
    var num = parseInt(value, 10);
    return Number.isInteger(num);
  }
);

//Make text box with error red.
function setError (id){
  document.getElementById(id).style.borderColor = "red";
}

$(document).ready(function(){

  $('#iForm').validate({
    //added requirements to fields
    //each requires input
    //each requires it to be a whole number
    //each reqires it to be with -50 and 50
    //maxes require to be greater than or equal to min
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
      //added relative messages to the errors.
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
      //make validated text boxes black again.
      success: function(label, element){
        $(element).css({"border-color" : "black"});
      }

  });



});

function create_table(){
  //grabbing input values
  var min_col = Number.parseInt(document.getElementById("col_min").value,10);
  var max_col = Number.parseInt(document.getElementById("col_max").value,10);
  var min_row = Number.parseInt(document.getElementById("row_min").value,10);
  var max_row = Number.parseInt(document.getElementById("row_max").value,10);

  //No Table Duplicates.
  if(document.getElementById(min_col + " " + max_col + " " + min_row + " " + max_row) != null){
    $('.table').hide();
    document.getElementById(min_col + " " + max_col + " " + min_row + " " + max_row).style = ""
    return;
  }

  //grabbing error field and table field
  var err_field = document.getElementById("error");
  //create tab label
  var mult_lable = document.createElement('li');
  var mult_a = document.createElement('a');
  var mult_del = document.createElement('button');

  //create tab content
  var mult_table = document.createElement('div');
  mult_table.className = "table";

  mult_lable.id = min_col + " " + max_col + " " + min_row + " " + max_row + "l";

  //set up tab label
  //mult_a.href = "#" + min_col + " " + max_col + " " + min_row + " " + max_row;
  mult_a.setAttribute("onclick", "select_tab(\"" +  min_col + " " + max_col + " " + min_row + " " + max_row + "\")");
  mult_a.innerHTML = min_col + " " + max_col + " " + min_row + " " + max_row;
  mult_lable.appendChild(mult_a);



  //set ID of the table tab content
  mult_table.id = min_col + " " + max_col + " " + min_row + " " + max_row;

  //Make the delete button
  mult_del.type = "button";
  mult_del.innerHTML = "X";
  //Giving it associated elements
  mult_del.setAttribute("onclick", "delete_table(\"" + mult_lable.id + "\", \"" + mult_table.id + "\")");
  mult_lable.appendChild(mult_del);

  //resetting fields
  err_field.innerHTML = "";
  mult_table.innerHTML = "";

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

  //add in the lable and table
  document.getElementById("table_tabs").appendChild(mult_lable);
  document.getElementById("mult_table").appendChild(mult_table);

  //hide all tables and show the newly created table.
  $(".table").hide();
  mult_table.style = "";

  return;
}

function select_tab(id){
  //hide all other tables and show the selected tab.
  $('.table').hide();
  document.getElementById(id).style = "";
}

function delete_table(lable, table){
  //grab the two elements
  var l = document.getElementById(lable);
  var t = document.getElementById(table);

  //delete the two elements
  l.parentNode.removeChild(l);
  t.parentNode.removeChild(t);
}

// ADD NEW ITEM TO END OF LIST

var table = document.querySelector('#page ul');

// ADD NEW ITEM START OF LIST

var item = document.createElement('li');
item.id = "one";
item.innerHTML = "kale";
table.prepend(item);

// ADD A CLASS OF COOL TO ALL LIST ITEMS

item = document.createElement('li');
item.id = "five";
item.innerHTML = "cream";
table.append(item);

//change class to cool

var items = table.children;
for(x = 0; x < items.length; x++){
  items[x].classList.add('cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// Not sure if I did the circle the right way, but I definitely have a circle.
var header = document.querySelector('#page h2');
item = document.createElement('span');
item.style = "display: inline-block; background: black; font-size: 12px; height: 18px; width: 18px; border-radius: 50%; text-align: center; margin-left: auto; margin-right: auto; padding-left: 3px; padding-top: 3px; padding-bottom: 3px";
item.innerHTML = " " + items.length;
header.append(item);

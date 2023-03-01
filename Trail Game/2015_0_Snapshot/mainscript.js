//Written by Volante

var objectClock = {name:'Grandfather Clock', vname:'objectClock', weight:25, cost:20};
var objectRedhat = {name:'Red Hat', vname:'objectRedhat', weight:1.5, cost:2};
var objectOxen = {name:'Oxen', vname:'objectOxen', weight:45, cost:44};

var listTest = [{name:objectClock, amount:2}, {name:objectRedhat, amount:20}, {name:objectOxen, amount:4}];
var listTestTwo = [{name:objectClock, amount:1}, {name:objectRedhat, amount:1}, {name:objectOxen, amount:10}];

var playerInv = [{name:objectClock, amount:1}];

var playerMoney = 2000;
// ---- Window Commands ----
function hideWindow(windowName) {
var windowName;
document.getElementById(windowName).style.visibility = "hidden";
}

function showCredits() {
document.getElementById('creditswindow').style.visibility = "visible";
centerWindow('creditswindow');
}

function showDBC() {
document.getElementById('dbw').style.visibility = "visible";
addWindowThings();
}

function centerWindow(windowName) {
var windowName;
var wWidth = (window.innerWidth / 2) - 250;//the last number is the window width in half
var wHeight = (window.innerHeight / 2) - 200;
document.getElementById(windowName).style.top = '100px';
document.getElementById(windowName).style.left = Math.floor(wWidth) + 'px';
}
// ---- Money and Inventories Stuff ----
function refreshMoney(targetInv) {
var targetInv;
var playerMoneyName = targetInv + 'playermoney';
document.getElementById(playerMoneyName).innerHTML = playerMoney.toString();
}

function showBuyInv(listName) {
var listName;
var windowName = 'buyinvwindow';
var targetInv = 'buyinv';

document.getElementById(windowName).style.visibility = "visible";
centerWindow(windowName);
refreshMoney(targetInv);
refreshInvList(listName, targetInv);
var oldElement = document.getElementById(targetInv + 'buybutton');
var newElement = oldElement.cloneNode(true);
oldElement.parentNode.replaceChild(newElement, oldElement);
document.getElementById(targetInv + 'buybutton').addEventListener("click", function(){buyItems(listName, targetInv);});
}

function showPlayerInv() {
var windowName = 'playerinvwindow';
var targetInv = 'playerinv';

document.getElementById(windowName).style.visibility = "visible";
centerWindow(windowName);
refreshMoney(targetInv);
refreshPlayerInv();
}

function refreshPlayerInv() {
var windowName = 'playerinvwindow';
var targetInv = 'playerinv';
var itemArray = playerInv;
var index = 0;

var cl = '<tr><td class="smallleft">Amt</td>'
+ '<td>Item Name</td>'
+ '<td class="medium">Weight</td></tr>';

this[targetInv].innerHTML = cl;

for (index = 0;index < itemArray.length; index++) {
var itemWeight = itemArray[index].name.weight;
var itemAmount = itemArray[index].amount;
var totalItemWeight = itemAmount * itemWeight;

tr = '<tr><td class="smallleft">' + itemAmount + '</td>'
+ '<td>' + itemArray[index].name.name + '</td>'
+ '<td class="medium">' + totalItemWeight + '</td></tr>';

this[targetInv].innerHTML += tr;
if (index == itemArray.length) {break;}
}

}

function lookItup(objectName) {
var objectName;
var itemArray = playerInv;

for (index = 0;index < itemArray.length; index++) {
var testName = itemArray[index].name.vname;

if (testName == objectName) {
var fAmt = itemArray[index].amount;
return fAmt;
}

}
return '';

}

function refreshInvList(itemList, targetInv) {
var itemList;
var itemArray = this[itemList];
var targetInv;
var tr = "<tr>";
var td = "<td>";
var tds = '<td class="small">';
var tdsl = '<td class="smallleft">';
var tdm = '<td class="medium">';
var ctd = '</td>';
var index = 0;

var cl = '<tr><td class="small">You</td><td class="small">Max</td>'
+ '<td class="smallleft">Buy</td><td>Item Name</td><td class="medium">Unit Cost</td>'
+ '<td class="small">Cost</td></tr>';

this[targetInv].innerHTML = cl;

for (index = 0;index < itemArray.length; index++) {
var objectName = itemArray[index].name.vname;
var cNum = lookItup(objectName);

tr = tds + cNum + ctd // Carry Variable
+ '<td class="small" id="' + itemList + 'Max' + index + '" >' + itemArray[index].amount + ctd // Maxiumum Buy
+ tdsl + '<input type="number" value="0" min="0" id="' + itemList + 'Input' + index + '" max="' + itemArray[index].amount + '" />' + ctd // Buy Input
+ '<td id="' + itemList + '' + index + '" >' + itemArray[index].name.name + ctd // Item Name
+ tdm + itemArray[index].name.cost + ctd // Unit Cost
+ '<td class="small" id="' + itemList + 'Total' + index + '" >' + "$0" + ctd // Total Cost
+ "</tr>";

this[targetInv].innerHTML += tr;

if (index == itemArray.length) {break;}
}
listEvents(itemList, targetInv);
refreshMoney(targetInv);
sumTotalCost(itemList, targetInv);

}

function listEvents(itemList, targetInv) {
var itemList, targetInv;
var itemArray = this[itemList];

for (index = 0;index < itemArray.length; index++) {
addInputListeners(index, itemList, targetInv);
}

}

function addInputListeners(index, itemList, targetInv) {
var index, itemList, targetInv;
var idInput = itemList + 'Input' + index;
document.getElementById(idInput).addEventListener("input", function(){testEvent(index, itemList, targetInv);});
}

function testEvent(index, itemList, targetInv) {
var index, itemList, targetInv;
var itemArray = this[itemList];

var inputName = itemList + 'Input' + index;
var inputVar = document.getElementById(inputName).value;
var inputInt = parseInt(inputVar, 10);
var totalName = itemList + 'Total' + index;
var costVar = itemArray[index].name.cost;
var maxInput = itemArray[index].amount;

if (inputInt >= 0 && inputInt <= maxInput) {
var sumCost = inputVar * costVar;
var costEle = '$' + sumCost;

document.getElementById(totalName).innerHTML = costEle;
}
sumTotalCost(itemList, targetInv);

}

function sumTotalCost(itemList, targetInv) {
var itemList;
var itemArray = this[itemList];
var sumTotal = 0;

for (index = 0;index < itemArray.length; index++) {
var idTotal = itemList + 'Total' + index;
var totalVar = document.getElementById(idTotal).innerHTML;
var totalNum = totalVar.replace('$', '');
var totalInt = parseInt(totalNum, 10);

sumTotal = sumTotal + totalInt;
if (index == itemArray.length) {break;}
}
var totalCountName = targetInv + 'sumtotal';
document.getElementById(totalCountName).innerHTML = sumTotal.toString();

}

function buyItems(itemList, targetInv) {
var itemList, targetInv;
var itemArray = this[itemList];

for (index = 0;index < itemArray.length; index++) {
var idInput = itemList + 'Input' + index;
var inputVar = document.getElementById(idInput).value;
var inputInt = parseInt(inputVar, 10);
var itemName = itemList + '' + index;
var totalName = itemList + 'Total' + index;
var itemObjectName = itemArray[index].name.name;
var costVar = itemArray[index].name.cost;
var maxInput = document.getElementById(idInput).max;
var itemCost = inputInt * costVar;//Total cost of the stuff
var changeMax = maxInput;
var maxName = itemList + 'Max' + index;
var listAmount = itemArray[index].amount;
var objectName = itemArray[index].name.vname;

if (itemCost <= playerMoney) {

if (inputInt == 0) {} else {

if (inputInt >= 0 && inputInt <= maxInput) {
playerMoney = playerMoney - itemCost;
dbcWrite(inputInt + 'x ' + objectName + ' was bought.');
changeMax = changeMax - inputInt;
document.getElementById(idInput).max = changeMax;
this[itemList][index].amount = changeMax;
appendItem(objectName, inputInt);
} else {dbcWrite('Invalid inputed number at ' + itemObjectName + '.');}

}

} else {dbcWrite('Insufficient funds. ' + itemObjectName + ' was not bought.');}

if (index == (itemArray.length - 1)) {break;}
}
var totalCountName = targetInv + 'sumtotal';
document.getElementById(totalCountName).innerHTML = '0';
document.getElementById(totalName).innerHTML = '$0';
document.getElementById(idInput).value = 0;
refreshMoney(targetInv);
refreshInvList(itemList, targetInv);
hideWindow('buyinvwindow');

}

function appendItem(itemName, amount) {
var itemName, amount, foundIndex;
var amountInt = parseInt(amount, 10);

for (index = 0;index < playerInv.length; index++) {
var itemSearch = playerInv[index].name.name;
var testItem = this[itemName].name;

if (itemSearch == testItem) {
var foundIndex = index;
break;
}

}

if (typeof foundIndex === 'undefined') {
	if (amountInt >= 1) {
		dbcWrite('Item not found... Apending.');
		playerInv.push({name:this[itemName], amount:amountInt});
	} else {
		dbcWrite('NO NEGATIVES!!');
	}
} else {
dbcWrite('Item found at index: ' + foundIndex + '. Replacing item amount.');
var changeAmt = (playerInv[foundIndex].amount) + amountInt;
	if (changeAmt <= 0) {
		playerInv.splice(foundIndex, 1);
	} else {
		playerInv[foundIndex] = {name:this[itemName], amount:changeAmt};
	}
}

}
// ---- Screen Stuff ---- //width:596px;height:358px;
var sceneTest = [{name:"sceneTest", background:"url('images/testbg.png')"},
{action:"showBuyInv('listTest');", image:"url('images/stripes.png')", height:104, width:40, x:524, y:150, cursor:"url('images/cursors/buy.cur'), auto", hide:'visible'},
{action:"", image:"url('images/timetraveldisplay.png')", height:140, width:103, x:246, y:218, cursor:"default", hide:'visible'},
{action:"", image:"url('images/sandtile.png')", height:64, width:64, x:((32 * 12) - 10), y:(16 * 6), cursor:"crosshair", hide:'visible'},
{action:"changeCanvas(indyAN);", image:"url('images/shotty.png')", height:16, width:64, x:100, y:280, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];

var progScene = [{name:"progScene", background:"url('images/ot/indy_A_E_store3.png')"}];

var indyAN = [{name:"indyAN", background:"url('images/ot/indy_A_N.png')"},
{action:"changeCanvas(indyAW);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAE);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(progScene);", image:"none", height:198, width:532, x:32, y:0, cursor:"url('images/cursors/forward.cur'), auto", hide:'visible'}];

var indyAW = [{name:"indyAW", background:"url('images/ot/indy_A_W.png')"},
{action:"changeCanvas(indyAS);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAN);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAE);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyAE = [{name:"indyAE", background:"url('images/ot/indy_A_E.png')"},
{action:"changeCanvas(indyAN);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAS);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAW);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyAS = [{name:"indyAS", background:"url('images/ot/indy_A_S.png')"},
{action:"changeCanvas(indyAE);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAW);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBS);", image:"none", height:198, width:532, x:32, y:0, cursor:"url('images/cursors/forward.cur'), auto", hide:'visible'}];

var indyBN = [{name:"indyBN", background:"url('images/ot/indy_B_N.png')"},
{action:"changeCanvas(indyBW);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBE);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAN);", image:"none", height:198, width:532, x:32, y:0, cursor:"url('images/cursors/forward.cur'), auto", hide:'visible'}];

var indyBW = [{name:"indyBW", background:"url('images/ot/indy_B_W.png')"},
{action:"changeCanvas(indyBS);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBN);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBE);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyBE = [{name:"indyBE", background:"url('images/ot/indy_B_E.png')"},
{action:"changeCanvas(indyBN);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBS);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBW);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyBS = [{name:"indyBS", background:"url('images/ot/indy_B_S.png')"},
{action:"changeCanvas(indyBE);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBW);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'}];

var dialogueTest = ["MessageTitle", {action:"nothing", message:"Rub it with snow."}];

var progClock = 0;

function changeCanvas(scene, dialogue) {
var scene, dialogue;
var canvas = document.getElementById('gamecanvas');
var sceneBG = scene[0].background;

canvas.style.backgroundImage = sceneBG;

canvas.innerHTML = '';

for (index = 1;index < scene.length; index++) {
var eleId = scene[0].name + '' + index;
var eleAction = scene[index].action;
var eleImage = scene[index].image;
var eleHeight = scene[index].height;
var eleWidth = scene[index].width;
var eleX = scene[index].x;
var eleY = scene[index].y;
var eleCursor = scene[index].cursor;
var eleHide = scene[index].hide;

canvas.innerHTML += '<div class="canvaselement" onclick="'
+ eleAction + '"' + ' style="background-image:' + eleImage
+ ';height:' + eleHeight + 'px;width:' + eleWidth
+ 'px;left:' + eleX + 'px;top:' + eleY
+ 'px;cursor:' + eleCursor + ';visibility:' + eleHide + ';" id="'
+ eleId +'"></div>';
}
if (scene[0].name == 'progScene') {progClock = 1;progTickOn();}
else {progClock = 0;progTickOff();}

}
// ---- Trail Variables ----
var trailTest = [{name:"Start", distance:0, scene:sceneTest, events:[], image:""},
{name:"End", distance:100, scene:sceneTest, events:[], image:""}];

var travelPace = 4; // Hours of travel
var distanceTraveled = 0;

// D = R * T
// Based on how many oxen the player has, the mph is dependent on the amount of oxen they have.
// Also based on how much time they travel a day
function progTickOn () {
if (progClock == 1) {setTimeout(function(){progTickOff()}, 1000);}
incDate();
}

function progTickOff () {
if (progClock == 1) {setTimeout(function(){progTickOn()}, 1000);}
}
// ---- Player Party Stuff ----
var wagonParty = [{name:"Tim", color:"#000", age:2, days:100, health:[], moral:"?maybe", deceased:false},
{name:"Team Red", color:"#f00", age:2, days:100, health:[], moral:"?maybe", deceased:false},
{name:"Team Green", color:"#0f0", age:2, days:0, health:[], moral:"?maybe", deceased:true},
{name:"Team Blue", color:"#00f", age:2, days:100, health:[], moral:"?maybe", deceased:false},
{name:"Team Pink", color:"#f88", age:2, days:100, health:[], moral:"?maybe", deceased:false},
{name:"Subcribers", color:"#000", age:2, days:100, health:[], moral:"?maybe", deceased:false}];
// ---- Date Stuff ----
var gameDate = new Date(1855, 6, 1);

var newMonthNumber = gameDate.getMonth();
var newDayNumber = gameDate.getDate();
var newYearNumber = gameDate.getFullYear();

var monthDays = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateDate() {
document.getElementById('date').innerHTML = monthName[newMonthNumber] + ', ' + newDayNumber + ', ' + newYearNumber;
diaryEntry(monthName[newMonthNumber] + ', ' + newDayNumber + ', ' + newYearNumber);
}

function incDate() {
newDayNumber = ++newDayNumber;

if (newDayNumber > monthDays[newMonthNumber]) {
newDayNumber = 1;
newMonthNumber = ++newMonthNumber;
}

if (newMonthNumber >= 12) {
newMonthNumber = 0;
newYearNumber = ++newYearNumber;
}

if (newYearNumber >= 10000) {
newYearNumber = 0;
}
updateDate();

}
// ---- Diary Stuff ----
function diaryEntry(stringToWrite) {
var stringToWrite;
var diaryDiv = document.getElementById('diary');
diaryDiv.innerHTML += '\n \n' + stringToWrite.toString();
diaryDiv.scrollTop = diaryDiv.scrollHeight;
}
// ---- Debug Console STUFF ----
function addWindowThings(windowHeadName) {
document.getElementById('dbchead').addEventListener('mousedown', mouseDownThing, false);
window.addEventListener('mouseup', mouseUpThing, false);
}

function mouseUpThing() {
window.removeEventListener('mousemove', divMove, true);
}

function mouseDownThing(e) {
window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
var e;
var div = document.getElementById('dbw');
var divX = document.getElementById('dbw').offsetWidth;
var divY = document.getElementById('dbw').offsetHeight;
var dddX = divX / 2;
var dddY = divY / 2;
var winX = window.innerWidth;
var winY = window.innerHeight;
var wwwX = winX - dddX;
var wwwY = winY - dddY;
var offX = e.clientX - dddX;
var offY = e.clientY - dddY;
// This works sort of... needs some tweaking
div.style.left = offX + 'px';
div.style.top = offY + 'px';
if (offY <= 0) {div.style.top = '0px';}
if (offX <= 0) {div.style.left = '0px';}
if ((offY + dddY) >= wwwY) {div.style.top = (winY - divY) + 'px';}
if ((offX + dddX) >= wwwX) {div.style.left = (winX - divX) + 'px';}
}
// Remove before releasing!
function keyHandle(e) {
var e;
if (e.keyCode === 13) {inputDebug();}
}

function inputDebug() {
var consoleInput = document.getElementById('dbi').value;
var inputString = consoleInput.split(' ');
var userOutput = '<span style="color:#ff0;">User: ' + consoleInput + '</span><br />';
var cwDiv = document.getElementById('dbscr');

if (inputString[0] == 'lookitup')
{document.getElementById('consolewindow').innerHTML += userOutput;
lookItup(inputString[1]);}

if (inputString[0] == 'showbuyinv')
{document.getElementById('consolewindow').innerHTML += userOutput;
showBuyInv(inputString[1]);dbcWrite('Showing buy inventory with list set: ' + inputString[1]);}

if (inputString[0] == 'showplayerinv')
{document.getElementById('consolewindow').innerHTML += userOutput;
showPlayerInv();dbcWrite('Showing player inventory.');}

if (inputString[0] == 'appenditem')
{document.getElementById('consolewindow').innerHTML += userOutput;
appendItem(inputString[1], inputString[2]);}

if (inputString[0] == 'diary')
{document.getElementById('consolewindow').innerHTML += userOutput;
diaryEntry(consoleInput.replace('diary ', ''));}

document.getElementById('dbi').value = '';
cwDiv.scrollTop = cwDiv.scrollHeight;
}

function dbcWrite(stringToWrite) {
var stringToWrite;
var time = new Date();
var timeLog = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
var cwDiv = document.getElementById('dbscr');
document.getElementById('consolewindow').innerHTML += timeLog + ': ' + stringToWrite.toString() + '<br />';
cwDiv.scrollTop = cwDiv.scrollHeight;
}
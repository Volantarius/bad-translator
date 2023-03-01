//Written by Volante

var objectClock = {name:'Grandfather Clock', vname:'objectClock', weight:25, cost:20};
var objectRedhat = {name:'Red Hat', vname:'objectRedhat', weight:1.5, cost:2};

var listTest = [{name:objectClock, amount:2}, {name:objectRedhat, amount:20}];
var listTestTwo = [{name:objectRedhat, amount:10}];

var playerInv = [{name:objectClock, amount:1}];

var playerMoney = 100;

function hideWindow(windowName) {
var windowName;
document.getElementById(windowName).style.visibility = "hidden";
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

var cl = '<tr><td class="smallleft">Carry</td>'
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

var cl = '<tr><td class="small">Carry</td><td class="small">Max</td>'
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
if (index == itemArray.length) {break;}
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

if (index == itemArray.length) {break;}
}
var totalCountName = targetInv + 'sumtotal';
document.getElementById(totalCountName).innerHTML = '0';
document.getElementById(totalName).innerHTML = '$0';
document.getElementById(idInput).value = 0;
refreshMoney(targetInv);
refreshInvList(itemList, targetInv);

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

// ---- MOVE WINDOWS CRAP ----
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
// ---- DEBUG CONSOLE STUFF ----

function keyHandle(e) {
var e;
if (e.keyCode === 13) {inputDebug();}
}

function inputDebug() {
var consoleInput = document.getElementById('dbi').value;
var inputString = consoleInput.split(' ');
var userOutput = '<span style="color:#ff0;">User: ' + consoleInput + '</span><br />';
var cwDiv = document.getElementById('dbscr');

if (inputString[0] == 'echo')
{document.getElementById('consolewindow').innerHTML += userOutput;}

if (inputString[0] == 'dbcwrite')
{document.getElementById('consolewindow').innerHTML += userOutput;
dbcWrite(inputString[1]);}

if (inputString[0] == 'centerwindow')
{document.getElementById('consolewindow').innerHTML += userOutput;
centerWindow(inputString[1]);dbcWrite('Centering window ' + inputString[1]);}

if (inputString[0] == 'lookitup')
{document.getElementById('consolewindow').innerHTML += userOutput;
lookItup(inputString[1]);}

if (inputString[0] == 'showbuyinv')
{document.getElementById('consolewindow').innerHTML += userOutput;
showBuyInv(inputString[1]);dbcWrite('Showing buy inventory with list set: ' + inputString[1]);}

if (inputString[0] == 'showplayerinv')
{document.getElementById('consolewindow').innerHTML += userOutput;
showPlayerInv();dbcWrite('Showing player inventory.');}

if (inputString[0] == 'showinv')
{document.getElementById('consolewindow').innerHTML += userOutput;
dbcWrite(playerInv[inputString[1]].amount + 'x ' + playerInv[inputString[1]].name.name);}

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

function diaryEntry(stringToWrite) {
var stringToWrite;
var diaryDiv = document.getElementById('diary');
diaryDiv.innerHTML += '\n' + stringToWrite.toString();
diaryDiv.scrollTop = diaryDiv.scrollHeight;
}
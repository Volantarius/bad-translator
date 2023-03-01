//Written by Volante
var version = '0.1.2';

var objectClock = {name:'Grandfather Clock', vname:'objectClock', weight:25, cost:20};
var objectPot = {name:'Pot', vname:'objectPot', weight:1, cost:2};
var objectThing = {name:'Thing', vname:'objectThing', weight:5, cost:1};

var pfood = {name:'Hunted Meat', vname:'pfood', weight:2, cost:1};

var npfoodCandy = {name:'Candy', vname:'npfoodCandy', weight:2, cost:1};

var clothingHats = {name:'Hats', vname:'clothingHats', weight:0.5, cost:1};

var animalOxen = {name:'Oxen', vname:'animalOxen', weight:0.5, cost:44};

//BEGINNING OF INVENTORIES
var listTest = [{name:objectClock, amount:2}, {name:clothingHats, amount:16}, {name:animalOxen, amount:5}, {name:objectPot, amount:10}, {name:objectThing, amount:4}];
var listTestTwo = [{name:objectClock, amount:10}, {name:animalOxen, amount:10}, {name:pfood, amount:10}, {name:npfoodCandy, amount:10}];

var playerInv = [{name:animalOxen, amount:20}];
//the player inventory can not at any time be empty, it must always have an ox inside

//Global variables here
var playerMoney = 1000;
var oxenAmount = playerInv[0].amount;
var globalPFood = 0; // Perisable Food
var globalNPFood = 0; // Non-Perisable Food
// HUH HUH ENTER P = NP JOKE HERE
var globalClocks = 0;
var globalClothing = 0;
var globalWWeight = 0;

var canvasName = 'blank';
var globalDate = 'blank';
var dbChance = 0;
// Game version display
function runThis() {
var viv = version + ' unstable . debug';

document.getElementById('dver').innerHTML = viv;
document.getElementById('cver').innerHTML = version;
document.getElementById('dbcver').innerHTML = viv;
document.getElementById('bsodver').innerHTML = viv;
}
// ---- Window Commands ----
function hideWindow(windowName) {
var windowName;
document.getElementById(windowName).style.visibility = "hidden";
}

function hideAllWindows() {
var windows = ['buyinvwindow','playerinvwindow','notwindow','creditswindow','wsettingswindow'];

for (index = 0;index < windows.length; index++) {
var windowName = windows[index];
document.getElementById(windowName).style.visibility = "hidden";
}

}

function showCredits() {
document.getElementById('creditswindow').style.visibility = "visible";
centerWindow('creditswindow');
}

function showNotification(message) {
var message;
document.getElementById('notwindow').style.visibility = "visible";
centerWindow('notwindow');

document.getElementById('notmessage').innerHTML = message;
}

function showDBC() {
document.getElementById('dbw').style.visibility = "visible";
addWindowThings();
//document.getElementById('dbw').remove();
}

function showCheats() {
document.getElementById('ccon').style.visibility = "visible";
}

function showWagonSettings() {
document.getElementById('wsettingswindow').style.visibility = "visible";
centerWindow('wsettingswindow');
}

function showWagonRest() {
document.getElementById('wrestwindow').style.visibility = "visible";
centerWindow('wrestwindow');
}

function crash()
{
	//document.getElementById('bsod').style.visibility = "visible";
	//document.getElementById('bs').style.visibility = "visible";
	glitchControl(1000);
	
	setTimeout(function(){ document.getElementById('bs').style.visibility = "visible"; }, 1000);
	setTimeout(function(){ document.getElementById('bs').style.visibility = "hidden"; }, 2000);
	setTimeout(function(){ document.getElementById('bsod').style.visibility = "visible";logitself(); }, 1750);
	setTimeout(function(){ glitchControl(500, 1); }, 2000);
	setTimeout(function(){ document.getElementById('bs').style.visibility = "visible"; }, 5000);
	setTimeout(function(){ document.getElementById('bsod').style.visibility = "hidden"; dbcWrite("Reactor voltage normal", "error2");}, 5250);
	setTimeout(function(){ document.getElementById('bs').style.visibility = "hidden"; dbcWrite("Ready for time travel", "error2");}, 8000);
	setTimeout(function(){ dbcWrite("script: timetravel loaded", "error2"); }, 8500);
}

function logitself()
{
	dbcWrite("Unreachable code after time travel phase (dont mind this error)", "error2");
	dbcWrite("Reactor voltage dropped", "error2");
	dbcWrite("False crash screen engage", "error2");
	dbcWrite("Backup generator engage", "error2");
	
}

function centerWindow(windowName) {
var windowName;
var windowDoc = document.getElementById(windowName);
var testin = windowDoc.style.width.replace('px', '');
var dwWidth = parseInt(testin, 10);
var wWidth = (window.innerWidth / 2) - (dwWidth / 2);//the last number is the window width in half
var wHeight = (window.innerHeight / 2) - (400 / 2);
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

var testweight = 0;

for (index = 0;index < itemArray.length; index++) {
var itemWeight = itemArray[index].name.weight;
var itemAmount = itemArray[index].amount;
var totalItemWeight = itemAmount * itemWeight;

tr = '<tr><td class="smallleft">' + itemAmount + '</td>'
+ '<td>' + itemArray[index].name.name + '</td>'
+ '<td class="medium">' + totalItemWeight + '</td></tr>';

this[targetInv].innerHTML += tr;

testweight += itemWeight * itemAmount;
}

globalWWeight = testweight;

document.getElementById('playerinvweight').innerHTML = testweight;

}

function lookItup(objectName) {
var objectName;
var itemArray = playerInv;

for (index = 0;index < itemArray.length; index++) {
var testName = itemArray[index].name.vname;

if (testName == objectName) {
var fAmt = itemArray[index].amount;
return fAmt;
} else {}

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

for (index = 0; index < itemArray.length; index++) {
var idInput = itemList + 'Input' + index;
var inputVar = document.getElementById(idInput).value;
var inputInt = parseInt(inputVar, 10);
var totalName = itemList + 'Total' + index;
var itemObjectName = itemArray[index].name.name;
var costVar = itemArray[index].name.cost;
var maxInput = document.getElementById(idInput).max;
var itemCost = inputInt * costVar;
var changeMax = maxInput;
var maxName = itemList + 'Max' + index;
var listAmount = itemArray[index].amount;
var objectName = itemArray[index].name.vname;

if (objectName == "objectPot" && inputInt == 420) {
showCheats();
dbcWrite('Cheat console unlocked!', "achi");
showNotification('Cheat console unlocked!');}
//THIS ACTIVATES THE CHEAT MENU TO SHOW UP
//THIS SHOULD WORK ONLY ON THE POT OBJECT

if (itemCost <= playerMoney) {

if (inputInt !== 0) {

if (inputInt > 0 && inputInt <= maxInput) {
playerMoney = playerMoney - itemCost;
dbcWrite(inputInt + 'x ' + objectName + ' was bought.');
changeMax = changeMax - inputInt;
document.getElementById(idInput).max = changeMax;
this[itemList][index].amount = changeMax;

appendItem(objectName, inputInt); //Trouble maker right here
} else {dbcWrite('Invalid inputed number at ' + itemObjectName , "error");continue;}

} else {continue;}

} else {dbcWrite('Insufficient funds. ' + itemObjectName + ' was not bought', "error");continue;}

}
var totalCountName = targetInv + 'sumtotal';
document.getElementById(totalCountName).innerHTML = '0';
document.getElementById(totalName).innerHTML = '$0';
document.getElementById(idInput).value = 0;
refreshMoney(targetInv);
refreshInvList(itemList, targetInv);
refreshPlayerInv();
//hideWindow('buyinvwindow');

}

function appendItem(itemName, amount) {
var itemName, amount, foundIndex;
var amountInt = parseInt(amount, 10);

for (indextest = 0;indextest < playerInv.length; indextest++) {
var itemSearch = playerInv[indextest].name.vname;

if (itemSearch == itemName) {
var foundIndex = indextest;
break;
}

}

if (itemName == "pfood")
{globalPFood += amountInt;}

if (itemName == "npfoodCandy")
{globalNPFood += amountInt;}

if (itemName == "clothingHats")
{globalClothing += amountInt;}

if (itemName == "objectClock") {globalClocks += amountInt;}

if (itemName == "animalOxen") {oxenAmount += amountInt;}

if (typeof foundIndex === 'undefined') {
	if (amountInt >= 1) {
		dbcWrite('Item not found... Appending instead');
		playerInv.push({name:this[itemName], amount:amountInt});
	} else {dbcWrite('NO NEGATIVES!!', "error");}
}

if (foundIndex >= 0) {
dbcWrite('Item found at index: ' + foundIndex + '. Replacing item amount');
var changeAmt = (playerInv[foundIndex].amount) + amountInt;
	if (changeAmt <= 0) {
		playerInv.splice(foundIndex, 1);
	} else {playerInv[foundIndex] = {name:this[itemName], amount:changeAmt};}
}

}

function nothing() {/*What are you doing here????*/}
// ---- Screen Stuff ---- //width:596px;height:358px;
var sceneTest = [{name:"sceneTest", background:"url('images/ot/indy_A_W_store1.png')"},
{action:"showBuyInv('listTest');", image:"none", height:104, width:36, x:524, y:150, cursor:"url('images/cursors/buy.cur'), auto", hide:'visible'},
{action:"glitchScreen();", image:"url('images/stripes.png')", height:40, width:40, x:100, y:190, cursor:"default", hide:'visible'},
{action:"addElement(testElement);", image:"url('images/stripes.png')", height:40, width:40, x:180, y:150, cursor:"default", hide:'visible'},
{action:"addElement(testOverlay);", image:"url('images/stripes.png')", height:40, width:40, x:260, y:150, cursor:"default", hide:'visible'},
{action:"changeCanvas(indyAN, testTwoDia);", image:"url('images/shotty.png')", height:16, width:64, x:500, y:310, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];

var progScene = [{name:"progScene", background:"none"}];

var blankScene = [{name:"blankScene", background:"none"}];

var testRanEvent = [{name:"testRanEvent", background:"url('images/pokebg.png')"}];

var graveScene = [{name:"graveScene", background:"none"}];

var sickScene = [{name:"sickScene", background:"url('images/pokebg.png')"}];

var indyAN = [{name:"indyAN", background:"url('images/ot/indy_A_N.png')"},
{action:"changeCanvas(indyAW);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAE);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAS);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'},
{action:"changeCanvas(progScene, progDiaPause)", image:"none", height:198, width:532, x:32, y:0, cursor:"url('images/cursors/forward.cur'), auto", hide:'visible'}];

var indyAW = [{name:"indyAW", background:"url('images/ot/indy_A_W.png')"},
{action:"changeCanvas(indyAWstoreOne);", image:"none", height:84, width:60, x:504, y:144, cursor:"url('images/cursors/enter.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAWstoreTwo);", image:"none", height:58, width:40, x:275, y:170, cursor:"url('images/cursors/enter.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAWstoreThree);", image:"none", height:64, width:36, x:114, y:160, cursor:"url('images/cursors/enter.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAS);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAN);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAE);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyAWstoreOne = [{name:"indyAWstoreOne", background:"url('images/ot/indy_A_W_store1.png')"},
{action:"changeCanvas(indyAW);", image:"none", height:32, width:596, x:0, y:326, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];
var indyAWstoreTwo = [{name:"indyAWstoreTwo", background:"url('images/ot/indy_A_W_store2.png')"},
{action:"changeCanvas(indyAW);", image:"none", height:32, width:596, x:0, y:326, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];
var indyAWstoreThree = [{name:"indyAWstoreThree", background:"url('images/ot/indy_A_W_store3.png')"},
{action:"changeCanvas(indyAW);", image:"none", height:32, width:596, x:0, y:326, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];

var indyAE = [{name:"indyAE", background:"url('images/ot/indy_A_E.png')"},
{action:"changeCanvas(indyAEstoreOne);", image:"none", height:56, width:32, x:512, y:166, cursor:"url('images/cursors/enter.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAN);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAS);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAW);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyAEstoreOne = [{name:"indyAEstoreOne", background:"url('images/ot/indy_A_E_store1.png')"},
{action:"changeCanvas(indyAE);", image:"none", height:32, width:596, x:0, y:326, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];

var indyAS = [{name:"indyAS", background:"url('images/ot/indy_A_S.png')"},
{action:"changeCanvas(indyAE);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAW);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAN);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBS);", image:"none", height:198, width:532, x:32, y:0, cursor:"url('images/cursors/forward.cur'), auto", hide:'visible'}];

var indyBN = [{name:"indyBN", background:"url('images/ot/indy_B_N.png')"},
{action:"changeCanvas(indyBW);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBE);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBS);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyAN);", image:"none", height:198, width:532, x:32, y:0, cursor:"url('images/cursors/forward.cur'), auto", hide:'visible'}];

var indyBW = [{name:"indyBW", background:"url('images/ot/indy_B_W.png')"},
{action:"changeCanvas(indyBWstoreOne);", image:"none", height:56, width:32, x:38, y:174, cursor:"url('images/cursors/enter.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBS);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBN);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBE);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyBWstoreOne = [{name:"indyBWstoreOne", background:"url('images/ot/indy_B_W_store1.png')"},
{action:"changeCanvas(indyBW);", image:"none", height:32, width:596, x:0, y:326, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];

var indyBE = [{name:"indyBE", background:"url('images/ot/indy_B_E.png')"},
{action:"changeCanvas(indyBEstoreOne);", image:"none", height:94, width:80, x:100, y:138, cursor:"url('images/cursors/enter.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBEstoreTwo);", image:"none", height:56, width:32, x:518, y:172, cursor:"url('images/cursors/enter.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBN);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBS);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBW);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'}];

var indyBEstoreOne = [{name:"indyBEstoreOne", background:"url('images/ot/indy_B_E_store1.png')"},
{action:"changeCanvas(indyBE);", image:"none", height:32, width:596, x:0, y:326, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];
var indyBEstoreTwo = [{name:"indyBEstoreTwo", background:"url('images/ot/indy_B_E_store2.png')"},
{action:"changeCanvas(indyBE);", image:"none", height:32, width:596, x:0, y:326, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];

var indyBS = [{name:"indyBS", background:"url('images/ot/indy_B_S.png')"},
{action:"changeCanvas(indyBE);", image:"none", height:358, width:32, x:0, y:0, cursor:"url('images/cursors/left.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBW);", image:"none", height:358, width:32, x:564, y:0, cursor:"url('images/cursors/right.cur'), auto", hide:'visible'},
{action:"changeCanvas(indyBN);", image:"none", height:32, width:532, x:32, y:326, cursor:"url('images/cursors/back.cur'), auto", hide:'visible'},];

// Dialogues!!!!!!
var testDia = [{title:"Debug Menu<br />Test &amp; stuff"},
{action:'changeCanvas(progScene, progDiaPause);', name:'Travel the Trail!'},
{action:"showBuyInv('listTest');", name:"Buy Menu 1"},
{action:"showBuyInv('listTestTwo');", name:"Buy Menu 2"},
{action:"showPlayerInv();", name:"Wagon Inventory"},
{action:"showWagonSettings();", name:"Wagon Settings"},
{action:"addElement(fadeIn);", name:"Transition Test"},
{action:"addElement(testScrollin);", name:"Transition Test TWO"},
{action:"gainMorale(6, -5);", name:"Good Morale"},
{action:"gainMorale(6, 5);", name:"Bad Morale"},
{action:"glitchControl(1000);", name:"Glitch Control"},
{action:"crash();", name:"Crash Game"},
{action:"showNotification('Howdy!!');resetTravel(oregonTrailOne, 7);", name:"Change Trail"},
{action:"checkItem('objectThing');", name:"Check Item"},
{action:"showCredits();", name:"Show Credits"},
{action:"showWagonRest();", name:"Wagon Rest Test"},
{action:"calcWeather();updateDate()", name:"Generate Weather"}];

var tcDia = [{title:"Time Circuits"},
{action:"changeCanvas(sceneTest, testDia);", name:"Go Back"}];

var graveDia = [{title:"Gravestone Thing"},
{action:"changeCanvas(progScene, progDiaPause);", name:"Go Back"}];

var testTwoDia = [{title:"Independence"},
{action:"diaryEntry('Buttocks');", name:"Diary"}];

var testRanEventDia = [{title:"Test Random Event"},
{action:"changeCanvas(progScene, progDiaPause);", name:"Travel the Trail"}];

var progDiaPause = [{title:"The Oregon Trail <br /> Paused"},
{action:"startTravel();", name:"Continue Travel"},
{action:"showPlayerInv();", name:"Wagon Inventory"}, //Put drop items thing in the inventory menu instead
{action:"showWagonSettings();", name:"Wagon Settings"},
{action:"", name:"Hunt"},
{action:"", name:"Trade"},
{action:"", name:"Rest"}];

var progDiaRest = [{title:"The Oregon Trail <br /> Resting"},
{action:"pauseTravel(true);", name:"Pause Travel"}];

var progDiaPlay = [{title:"The Oregon Trail <br /> Traveling"},
{action:"", name:"Traveling..."}];

var testSick = [{title:"BLANK got sick!"},
{action:"changeCanvas(progScene, progDiaPause);", name:"Travel the Trail"}];
// Sick dialogues
var sickMemNum = 0; //Index of party member who is sick
var sickMemNumBetter = 0; //Index of party member who is better

var sickTitle = 'error';

var sickDiaillTest = [{title:'sickTitle'},
{action:"getSick(illTest, sickMemNum);changeCanvas(progScene, progDiaPause);", name:"Get sick and die"}];

var sickBetter = [{title:'sickTitle'},
{action:"getBetter(sickMemNumBetter);changeCanvas(progScene, progDiaPause);", name:"Get better"}];
// In action add getsick and gainmorale

// End dialogues

//CHANGE CANVAS DEBUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var canvasDebug = 0;

setInterval ( function(){ refreshDBCanvas(); }, 1000);

var glitchCheat = 0; //cheatcode!

function changeCanvas(scene, dialogue, element) {
var scene, dialogue, element;
var canvas = document.getElementById('gamecanvas');
var diaTitle = document.getElementById('dtitle');
var diaMenu = document.getElementById('dmenu');
var sceneBG = scene[0].background;

refreshHealthInd();
canvasName = scene[0].name;
if (glitchCheat == 1) {glitchScreen();}//Glitch cheat mode

dbcWrite('Changed Canvas: ' + canvasName);

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

var dbActString = eleAction.toString();
var dbActSplit = dbActString.split('(');
var dbAction = dbActSplit[1].replace(');', '');

var dbBG = '0';
var dbText = 'hidden';
var dbBorder = 'none';
var dbColor = '000';

if (canvasDebug == 1) {
dbBG = '0.25';
dbText = 'visible';
dbBorder = 'solid';
dbColor = 'fff';
}

canvas.innerHTML += '<div class="canvaselement" onclick="'
+ eleAction + '"' + ' style="' + 'color:#' + dbColor + ';' + 'background:rgba(0,255,0,'
+ dbBG + ');border:1px ' + dbBorder + ' #ff0;background-image:' + eleImage
+ ';height:' + eleHeight + 'px;width:' + eleWidth
+ 'px;left:' + eleX + 'px;top:' + eleY
+ 'px;cursor:' + eleCursor + ';visibility:' + eleHide + ';" id="'
+ eleId +'">' + '<div style="overflow:visible;visibility:' + dbText + ';">' + index + ':'
+ dbActSplit[0] + '<br />' + dbAction + '</div>' + '</div>';
}

if (typeof dialogue !== 'undefined') {
var diaId = dialogue[0].title;

if (diaId === 'sickTitle') {
var diaNewTitle = sickTitle;
} else {
var diaNewTitle = diaId;
}

diaTitle.innerHTML = diaNewTitle.toString();
diaMenu.innerHTML = '<br/>';

for (index = 1;index < dialogue.length; index++) {
var diaAction = dialogue[index].action;
var diaName = dialogue[index].name;

diaMenu.innerHTML += '<button class="diabutton" onclick="' + diaAction + '">' + diaName + '</button>';

}

} else {dbcWrite('Dialogue was not defined', 'error');}

if (scene == progScene) {showPS();} else {hidePS();}
if (scene == graveScene) {showGrave();} else {hideGrave();}

if (typeof element !== 'undefined') {addElement(element);}

refreshPlayerInv();
updateLoc();
hideAllWindows();

}

var testElement = {vname:"testElement", action:"",
image:"url('images/timetraveldisplay.png')", color:'none', height:1, width:103,
x:246, y:0, cursor:"default", delay:250, style:'height', anim:'140px',
tran:'height 5s linear', hide:'visible', life:'none', canvas:''};

var testOverlay = {vname:"testOverlay", action:"",
image:"url('images/ot/indy_B_E_store1.png')", color:'none', height:0, width:596,
x:0, y:0, cursor:"default", delay:500, style:'height', anim:'358px',
tran:'height 5s linear', hide:'visible', life:5550, canvas:[indyBEstoreOne, testTwoDia]};

var fadeOut = {vname:"fadeOut", action:"",
image:"none", color:"rgba(255,255,255,1.0)", height:358, width:596,
x:0, y:0, cursor:"default", delay:100, style:'backgroundColor', anim:'rgba(255,255,255,0.0)',
tran:'background-color 0.4s linear', hide:'visible', life:600, canvas:''};

var fadeIn = {vname:"fadeIn", action:"",
image:"none", color:"rgba(255,255,255,0.0)", height:358, width:596,
x:0, y:0, cursor:"default", delay:100, style:'backgroundColor', anim:'rgba(255,255,255,1.0)',
tran:'background-color 0.4s linear', hide:'visible', life:500, canvas:[sceneTest, testDia, fadeOut]};

var testScrollout = {vname:"testScrollout", action:"",
image:"url('images/pokebg.png')", color:'none', height:358, width:596,
x:0, y:0, cursor:"default", delay:500, style:'height', anim:'0px',
tran:'height 5s linear', hide:'visible', life:5600, canvas:''};

var testScrollin = {vname:"testScrollin", action:"",
image:"url('images/pokebg.png')", color:'none', height:0, width:596,
x:0, y:0, cursor:"default", delay:500, style:'height', anim:'358px',
tran:'height 5s linear', hide:'visible', life:5600, canvas:[indyBEstoreTwo, testDia, testScrollout]};

//elements that use transitions need to have the out transition declared first!

function addElement(element) {
var element;
var canvas = document.getElementById('gamecanvas');

var eleId = element.vname;
var eleAction = element.action;
var eleImage = element.image;
var eleColor = element.color;
var eleHeight = element.height;
var eleWidth = element.width;
var eleX = element.x;
var eleY = element.y;
var eleCursor = element.cursor;
var eleDelay = element.delay;
var eleStyle = element.style;
var eleAnim = element.anim;
var eleTran = element.tran;
var eleHide = element.hide;
var eleLife = element.life;
var eleCanvas = element.canvas;

var dbBG = '0';
var dbText = 'hidden';
var dbBorder = 'none';
var dbColor = '000';

if (canvasDebug == 1) {
dbBG = '0.25';
dbText = 'visible';
dbBorder = 'solid';
dbColor = 'fff';
}

if (glitchCheat == 1) {glitchScreen();}

if (document.getElementById(eleId) == null) {
canvas.innerHTML += '<div class="canvaselement" onclick="'
+ eleAction + '"' + ' style="' + 'color:#' + dbColor + ';' + 'background:rgba(0,255,0,'
+ dbBG + ');border:1px ' + dbBorder + ' #ff0;background-image:' + eleImage
+ ';background-color:' + eleColor + ';height:' + eleHeight + 'px;width:' + eleWidth
+ 'px;left:' + eleX + 'px;bottom:' + eleY
+ 'px;cursor:' + eleCursor + ';visibility:' + eleHide + ';-moz-transition:' + eleTran + ';" id="'
+ eleId +'">' + '<div style="overflow:visible;visibility:' + dbText + ';">Add:'
+ eleId + '<br />' + eleAction + '</div>' + '</div>';

setTimeout(function(){ document.getElementById(eleId).style[eleStyle] = eleAnim; }, eleDelay);

if (eleLife != 'none')
{
	if (eleCanvas != '')
	{
		//setTimeout(function(){ document.getElementById(eleId).remove(); }, eleLife);
	} else {
		setTimeout(function(){ document.getElementById(eleId).remove(); }, eleLife);
	}
}

if (eleCanvas != '')
{
	console.log(eleCanvas);
	if (typeof eleCanvas[2] !== 'undefined')
	{
		setTimeout(function(){ changeCanvas(eleCanvas[0], eleCanvas[1], eleCanvas[2]); }, eleLife);
	} else {
		setTimeout(function(){ changeCanvas(eleCanvas[0], eleCanvas[1]); }, eleLife);
	}
}

} else {showNotification('Element already exists!');dbcWrite('Element already exists','error');}

}

function checkItem(itemName, action)
{
	var itemName, action;
	var inv = playerInv;
	// ACTIONS: goto wagontrail
	
	for (cindex = 0; cindex < inv.length; cindex++)
	{
		var testName = inv[cindex].name.vname;
		
		if (testName == itemName)
		{
			showNotification("You have the item YAY! <br/> This shouldn't be seen this will just do the action");
		}
		
		if (cindex >= (inv.length - 1) && testName !== itemName)
		{
			showNotification("You don't have the item to complete this action.");
		}
	
	}

}

// ---- Trail Variables ----
var trailTest = [{name:"trailTest", distance:0, scene:sceneTest, dia:testDia, events:1},
{name:"Mid", distance:200, scene:sceneTest, dia:testDia, events:0},
{name:"End", distance:300, scene:blankScene, dia:testTwoDia, events:0}];

var oregonTrailOne = [{name:"oregonTrailOne", distance:0, scene:sceneTest, dia:testDia, events:0},
{name:"Kansas R. crossing", distance:100, scene:sceneTest, dia:testDia, events:0},
{name:"Big Blue R. crossing", distance:85, scene:sceneTest, dia:testDia, events:0},
{name:"Fort Kearney", distance:120, scene:sceneTest, dia:testDia, events:0},
{name:"Chimney Rock", distance:250, scene:sceneTest, dia:testDia, events:0},
{name:"Fort Laramie", distance:61, scene:sceneTest, dia:testDia, events:0},
{name:"Independence Rock", distance:190, scene:sceneTest, dia:testDia, events:0},
{name:"South Pass", distance:102, scene:sceneTest, dia:testDia, events:0},
{name:"Green R. crossing", distance:125, scene:sceneTest, dia:testDia, events:0},
{name:"Soda Springs", distance:144, scene:sceneTest, dia:testDia, events:0},
{name:"Fort Hall", distance:57, scene:sceneTest, dia:testDia, events:0},
{name:"Snake R. crossing", distance:182, scene:sceneTest, dia:testDia, events:0},
{name:"Fort Boise", distance:114, scene:sceneTest, dia:testDia, events:0},
{name:"Grande Ronde", distance:160, scene:sceneTest, dia:testDia, events:0},
{name:"The Dalles", distance:125, scene:sceneTest, dia:testDia, events:0}];

var trailGraves = [{text:"I HONK FOR CHOLERA", distance:40, deadname:'Tim', date:'3/3/1845'},
{text:"Watch out for leg measles!", distance:400, deadname:'Team Read', date:'4/12/1843'},
{text:"You shouldn't see this grave.", distance:0,end:true}];

function wagonPace(pace)
{
	var pace;
	if (typeof pace !== 'undefined' && pace <= 2 && pace >= 0)
	{
		if (pace == 0)
		{
			travelPace = 1.5;
			document.getElementById('wspace0').style.border = '2px inset #e1a858';
			document.getElementById('wspace1').style.border = '2px outset #e1a858';
		}
		if (pace == 1)
		{
			travelPace = 2;
			document.getElementById('wspace0').style.border = '2px outset #e1a858';
			document.getElementById('wspace1').style.border = '2px inset #e1a858';
		}
	}
}

var currentTrail = oregonTrailOne;

var trailPosition = 0;//Position in the trail array the player is in
var gravePosition = 0;//Position in graves array

var distanceTraveled = 0;
var currentDistance = 0;
var distanceToGo = 0;

var trailEvent = 0; // Don't remove again you idiot
var travelPace = 1.5; // Miles to travel today
var eventsPlayed = 0; // Events to play counter

var gamePaused = false;

var restDays = 0;

function resetTravel(trailName, trailPos) {
var trailName, trailPos;

if (typeof trailName !== 'undefined') {currentTrail = trailName;}
if (typeof trailPos !== 'undefined') {trailPosition = trailPos;currentDistance = 0;}

dbcWrite('Travel reset to: ' + currentTrail[0].name + ' | Position:' + trailPosition);

var destEle = document.getElementById('psdest');
var destPos = destEle.style.left;
var destVar = destPos.replace('px', '');
var destInt = parseInt(destVar, 10);
destEle.style.transition = "none";

var bgEle = document.getElementById('psbg');
var bgPos = bgEle.style.backgroundPosition;
var bgVar = bgPos.replace('px 0px', '');
var bgInt = parseInt(bgVar, 10);
bgEle.style.transition = "none";

bgEle.style.backgroundPosition = '0px 0px';
destEle.style.left = '20px';

updateLoc();
}

function pauseTravel(state) {
var state;
dbcWrite('Travel paused');
gamePaused = state;
}

function restTravel() { //HMM
changeCanvas(progScene, progDiaRest);
dbcWrite('Travel resting');
diaryEntry('Resting...');

setTimeout(function(){ if (gamePaused == true) {changeCanvas(progScene, progDiaPause);} else {startTravel();} }, 1500);
}

function testResting()
{
	//restDays is the amount of days to rest, global
	//just a test right now
	
	changeCanvas(progScene, progDiaRest);
	dbcWrite('Travel resting');
	diaryEntry('Resting...');
	
}

function randomEvent() {
//var weatMid = ["Sunny", "Cloudy"];
//var weatLow = ["Cloudy", "Stormy", "Raining", "Snowing", "Blizzard"];
var eventArray = [ ];

var randomChance = Math.floor(Math.random() * 100);

dbChance = randomChance;

if (globalClothing <= 10 && globalTemp <= 75 && randomChance < 30)//SICKNESS
{
	var nonSickMembers = [];
	if (wagonParty[0].ill.length <= 0 && wagonParty[0].morale >= 10 && wagonParty[0].deceased == false) {nonSickMembers.push(0);} //tim
	if (wagonParty[1].ill.length <= 0 && wagonParty[1].morale >= 10 && wagonParty[1].deceased == false) {nonSickMembers.push(1);} //red
	if (wagonParty[2].ill.length <= 0 && wagonParty[2].morale >= 10 && wagonParty[2].deceased == false) {nonSickMembers.push(2);} //green
	if (wagonParty[3].ill.length <= 0 && wagonParty[3].morale >= 10 && wagonParty[3].deceased == false) {nonSickMembers.push(3);} //blue
	if (wagonParty[4].ill.length <= 0 && wagonParty[4].morale >= 10 && wagonParty[4].deceased == false) {nonSickMembers.push(4);} //pink
	if (wagonParty[5].ill.length <= 0 && wagonParty[5].morale >= 10 && wagonParty[5].deceased == false) {nonSickMembers.push(5);} //subs

	if (nonSickMembers.length > 0)
	{
		var memPicker = Math.floor(Math.random() * nonSickMembers.length);
		var pickedMem = nonSickMembers[memPicker];
		var memberMorale = wagonParty[pickedMem].morale;

		if (memberMorale >= illTest.morale) //Test Illness!
		{
			var sickDiary = wagonParty[pickedMem].name + ' got illTest';
			eventArray.push( [true, testRanEvent, sickDiaillTest, sickDiary, pickedMem, 'none', ' got illTest'] );
		}

	}

}

if (globalClothing >= 5 && globalTemp >= 65 && randomChance < 30)//SICKNESS REMOVE
{
// THE getting better thing here will check all sicknesses to get better from!
	var SickMembers = [];
	if (wagonParty[0].ill.length >= 1 && wagonParty[0].deceased == false) {SickMembers.push(0);} //tim
	if (wagonParty[1].ill.length >= 1 && wagonParty[1].deceased == false) {SickMembers.push(1);} //red
	if (wagonParty[2].ill.length >= 1 && wagonParty[2].deceased == false) {SickMembers.push(2);} //green
	if (wagonParty[3].ill.length >= 1 && wagonParty[3].deceased == false) {SickMembers.push(3);} //blue
	if (wagonParty[4].ill.length >= 1 && wagonParty[4].deceased == false) {SickMembers.push(4);} //pink
	if (wagonParty[5].ill.length >= 1 && wagonParty[5].deceased == false) {SickMembers.push(5);} //subs

	if (SickMembers.length > 0)
	{
		var memPicker = Math.floor(Math.random() * SickMembers.length);
		var pickedMem = SickMembers[memPicker];
		var memberMorale = wagonParty[pickedMem].morale;
		var memberSickName = wagonParty[pickedMem].ill[0].name;

		if (memberMorale < illTest.morale && memberSickName == illTest.name)
		{
			var sickDiary = wagonParty[pickedMem].name + ' got better!';
			eventArray.push( [true, testRanEvent, sickBetter, sickDiary, 'none', pickedMem, ' got better'] );
		}

	}

}

if (globalWeat == "Blizzard" && globalTemp <= 65 && randomChance < 40)
{eventArray.push( [true,testRanEvent,testRanEventDia,"Blizzard!"] );}

if (globalWeat == "Sunny" && globalTemp > 88 && randomChance < 20 && trailEvent == 1)
{eventArray.push( [true,testRanEvent,testRanEventDia,"Bad Water"] );}

if (eventArray.length > 0) {
var randomPos = Math.floor(Math.random() * eventArray.length);
return eventArray[randomPos];
eventArray.splice(0,eventArray.length,"");
} else {return false;}

}

function startTravel() {
var oxen = oxenAmount;
var delayTime = 2500;//The time it takes to move is determined by the travel speed

pauseTravel(false);
incDate();
changeCanvas(progScene, progDiaPlay);//switches the dialogue so you cant double travel
dbcWrite('Travel started! Temp: ' + globalTemp + ' | Weather: ' + globalWeat + ' | Date: ' + globalDate);

var totalDistance = Math.floor(oxen * travelPace);
//total distance is the main modifier for changing how much the wagon moves
//the total number is miles traveled a day
//maybe based on the average morale they get bonus miles.

var distanceToLocation = currentTrail[(trailPosition + 1)].distance;
var locationName = currentTrail[(trailPosition + 1)].name;

distanceTraveled = distanceTraveled + totalDistance;
currentDistance = currentDistance + totalDistance;

var distToGo = distanceToLocation - currentDistance;

var destEle = document.getElementById('psdest');
var destPos = destEle.style.left;
var destVar = destPos.replace('px', '');
var destInt = parseInt(destVar, 10);
destEle.style.transition = "left 2.4s linear";

var bgEle = document.getElementById('psbg');
var bgPos = bgEle.style.backgroundPosition;
var bgVar = bgPos.replace('px 0px', '');
var bgInt = parseInt(bgVar, 10);
bgEle.style.transition = "background-position 2.4s linear";

//350 is total distance for the wagon and dest to meet
var distanceCon = (350 - 40)/distanceToLocation;
var distancePix = Math.floor(totalDistance*distanceCon);

var bgCon = 200/distanceToLocation;
var bgPix = Math.floor(totalDistance*bgCon);

//var playEvent = false;
var playEvent = randomEvent();//does calc the scene of the event in a array

if (currentDistance >= distanceToLocation) {
bgEle.style.backgroundPosition = (bgInt + bgPix) + 'px 0px';
destEle.style.left = '350px';

trailPosition = trailPosition + 1;
currentDistance = 0;
var locationScene = currentTrail[trailPosition].scene;
var locationDia = currentTrail[trailPosition].dia;
diaryEntry('Travel ended and we reached: ' + currentTrail[trailPosition].name );
dbcWrite('Travel ended and we reached: ' + currentTrail[trailPosition].name );
setTimeout(function(){ changeCanvas(locationScene, locationDia);resetTravel(); }, delayTime);
} else {
bgEle.style.backgroundPosition = (bgInt + bgPix) + 'px 0px';
destEle.style.left = (destInt + distancePix) + 'px';

if (playEvent[0] == true) {
sickMemNum = playEvent[4];
sickMemNumBetter = playEvent[5];

if (sickMemNum >= 0 && sickMemNumBetter == 'none') //SICK
{
var sickName = wagonParty[sickMemNum].name;
sickTitle = sickName + '' + playEvent[6];
}

if (sickMemNum == 'none' && sickMemNumBetter >= 0) //BETTER
{
var betName = wagonParty[sickMemNumBetter].name;
sickTitle = betName + '' + playEvent[6];
}

setTimeout(function(){ changeCanvas(playEvent[1], playEvent[2]);diaryEntry(playEvent[3]); }, delayTime);
++eventsPlayed;
} else {

var graveDistance = trailGraves[gravePosition].distance;
if (typeof trailGraves[gravePosition].end === 'undefined') {
var graveEnd = false;
} else {
var graveEnd = trailGraves[gravePosition].end;
}

if (distanceTraveled >= graveDistance && !(graveEnd === true)) {
setTimeout(function(){ changeCanvas(graveScene, graveDia);updateGrave(gravePosition); }, delayTime);
++gravePosition;
} else {
setTimeout(function(){ restTravel(); }, delayTime);
}

}

}

if (newDayNumber <= 2 && newMonthNumber == 10) {diaryEntry('Today we set out to the Oregon Trail!');}

}

function hidePS() {
var bgEle = document.getElementById('psbg');
var wagonEle = document.getElementById('pswagon');
var destEle = document.getElementById('psdest');

bgEle.style.visibility = 'hidden';
wagonEle.style.visibility = 'hidden';
destEle.style.visibility = 'hidden';
}

function showPS() {
var bgEle = document.getElementById('psbg');
var wagonEle = document.getElementById('pswagon');
var destEle = document.getElementById('psdest');

bgEle.style.visibility = 'visible';
wagonEle.style.visibility = 'visible';
destEle.style.visibility = 'visible';
}

function hideGrave() {
var graveStone = document.getElementById('grave');
graveStone.style.visibility = 'hidden';
}

function showGrave() {
var graveStone = document.getElementById('grave');
graveStone.style.visibility = 'visible';
}

function updateGrave(position) {
var position;
var graveText = trailGraves[position - 1].text;
var graveDName = trailGraves[position - 1].deadname;
var graveDate = trailGraves[position - 1].date;
var graveStone = document.getElementById('grave');

var parsedText = graveDName + '<br/>' + graveDate + '<br/><br/>' + graveText;

graveStone.innerHTML = parsedText;
}

function updateLoc() {
document.getElementById('dtraveled').innerHTML = distanceTraveled;

var locationName = currentTrail[(trailPosition + 1)].name;
document.getElementById('nxtloc').innerHTML = locationName;

var distanceToLocation = currentTrail[(trailPosition + 1)].distance;
distanceToGo = distanceToLocation - currentDistance;

if (distanceToGo <= 0) {
document.getElementById('nxtdist').innerHTML = 0;
} else {
document.getElementById('nxtdist').innerHTML = distanceToGo;
}

}

// ---- Player Party Stuff ----
var wagonParty = [{name:"Tim", color:"#000", age:24, morale:0, ill:[], deceased:false},
{name:"Team Red", color:"#f00", age:6, morale:0, ill:[], deceased:false},
{name:"Team Green", color:"#080", age:9, morale:0, ill:[], deceased:true},
{name:"Team Blue", color:"#00f", age:56, morale:0, ill:[], deceased:false},
{name:"Team Pink", color:"#f88", age:20, morale:0, ill:[], deceased:false},
{name:"Subscribers", color:"#000", age:14, morale:0, ill:[{name:"TestSick", morale:15}], deceased:false}];

var illTest = {name:"TestSick", morale:15, type:'ill'};

function getSick(sickness, member)
{
	var sickness, member;
	var type = sickness.type;
	if (typeof sickness != 'undefined' && typeof member != 'undefined' && type == 'ill')
	{
		wagonParty[member].ill.push(sickness);
	} else {dbcWrite('Error making sick', 'error');}
}

function getBetter(member)
{
	var member;
	if (typeof member != 'undefined')
	{
		wagonParty[member].ill.splice(0, 1); //Make sure to erase all other sick types
	} else {dbcWrite('Error making better', 'error');}
}

function gainMorale(memIndex, count) // 6 selects all members!
{
	var memIndex, count;
	if (typeof memIndex == 'undefined') {memIndex = 6;}
	if (typeof count == 'undefined') {count = 0;}
	var memInt = parseInt(memIndex);

	if (memIndex < 6)
	{
		var thing = wagonParty[memIndex].morale;
		dbcWrite(thing);
		if (wagonParty[memIndex].deceased !== true) {wagonParty[memIndex].morale += count;}
	}

	if (memIndex == 6)
	{
		if (wagonParty[0].deceased !== true) {wagonParty[0].morale += count;}
		if (wagonParty[1].deceased !== true) {wagonParty[1].morale += count;}
		if (wagonParty[2].deceased !== true) {wagonParty[2].morale += count;}
		if (wagonParty[3].deceased !== true) {wagonParty[3].morale += count;}
		if (wagonParty[4].deceased !== true) {wagonParty[4].morale += count;}
		if (wagonParty[5].deceased !== true) {wagonParty[5].morale += count;}
	}
}

function refreshPartyNames()
{
	var playerOne = document.getElementById('p0'); //TIM
	var playerTwo = document.getElementById('p1'); //RED
	var playerThree = document.getElementById('p2'); //GREEN
	var playerFour = document.getElementById('p3'); //BLUE
	var playerFive = document.getElementById('p4'); //PINK
	var playerSix = document.getElementById('p5'); //SUBS
	
	var playerTwoC = document.getElementById('cn1'); //CHAT RED
	var playerThreeC = document.getElementById('cn2'); //CHAT GREEN
	var playerFourC = document.getElementById('cn3'); //CHAT BLUE
	var playerFiveC = document.getElementById('cn4'); //CHAT PINK
	var playerSixC = document.getElementById('cn5'); //CHAT SUBS
	
	playerOne.innerHTML = wagonParty[0].name;
	playerTwo.innerHTML = wagonParty[1].name;
	playerThree.innerHTML = wagonParty[2].name;
	playerFour.innerHTML = wagonParty[3].name;
	playerFive.innerHTML = wagonParty[4].name;
	playerSix.innerHTML = wagonParty[5].name;
	
	playerOne.style.color = wagonParty[0].color;
	playerTwo.style.color = wagonParty[1].color;
	playerThree.style.color = wagonParty[2].color;
	playerFour.style.color = wagonParty[3].color;
	playerFive.style.color = wagonParty[4].color;
	playerSix.style.color = wagonParty[5].color;
	
	playerTwoC.innerHTML = wagonParty[1].name;
	playerThreeC.innerHTML = wagonParty[2].name;
	playerFourC.innerHTML = wagonParty[3].name;
	playerFiveC.innerHTML = wagonParty[4].name;
	playerSixC.innerHTML = wagonParty[5].name;
	
	playerTwoC.style.color = wagonParty[1].color;
	playerThreeC.style.color = wagonParty[2].color;
	playerFourC.style.color = wagonParty[3].color;
	playerFiveC.style.color = wagonParty[4].color;
	playerSixC.style.color = wagonParty[5].color;
}

function refreshHealthInd() //refreshes the indicator
{
	var playerOne = document.getElementById('p0h'); //TIM
	var playerTwo = document.getElementById('p1h'); //RED
	var playerThree = document.getElementById('p2h'); //GREEN
	var playerFour = document.getElementById('p3h'); //BLUE
	var playerFive = document.getElementById('p4h'); //PINK
	var playerSix = document.getElementById('p5h'); //SUBS
	
	var playerTwoC = document.getElementById('cl1'); //CHAT RED
	var playerThreeC = document.getElementById('cl2'); //CHAT GREEN
	var playerFourC = document.getElementById('cl3'); //CHAT BLUE
	var playerFiveC = document.getElementById('cl4'); //CHAT PINK
	var playerSixC = document.getElementById('cl5'); //CHAT SUBS

	var playerOneIll = wagonParty[0].ill;
	var playerTwoIll = wagonParty[1].ill;
	var playerThreeIll = wagonParty[2].ill;
	var playerFourIll = wagonParty[3].ill;
	var playerFiveIll = wagonParty[4].ill;
	var playerSixIll = wagonParty[5].ill;

	var playerOneMorale = wagonParty[0].morale;
	var playerTwoMorale = wagonParty[1].morale;
	var playerThreeMorale = wagonParty[2].morale;
	var playerFourMorale = wagonParty[3].morale;
	var playerFiveMorale = wagonParty[4].morale;
	var playerSixMorale = wagonParty[5].morale;

	var playerOneDead = wagonParty[0].deceased;
	var playerTwoDead = wagonParty[1].deceased;
	var playerThreeDead = wagonParty[2].deceased;
	var playerFourDead = wagonParty[3].deceased;
	var playerFiveDead = wagonParty[4].deceased;
	var playerSixDead = wagonParty[5].deceased;

// ONE
if (playerOneDead != true) {
if (playerOneIll.length > 0)
{
	playerOne.innerHTML = 'Sick';
	playerOne.title = playerOneIll[0].name;
} else {playerOne.innerHTML = 'Good';playerOne.title = 'Test Better';}//This is where we add the title display
} else {playerOne.style.color = '#f00';playerOne.innerHTML = 'Dead';playerOne.title = 'Dead from:';}

// TWO

if (playerTwoDead != true) {
if (playerTwoIll.length > 0)
{
	playerTwo.innerHTML = 'Sick';
	playerTwo.title = playerTwoIll[0].name;
} else {playerTwo.innerHTML = 'Good';playerTwo.title = 'Test Better';}
} else {
	playerTwo.style.color = '#f00';playerTwo.innerHTML = 'Dead';
	playerTwo.title = 'Dead from:';
	playerTwoC.style.visibility = 'visible';
}

// THREE

if (playerThreeDead != true) {
if (playerThreeIll.length > 0)
{
	playerThree.innerHTML = 'Sick';
	playerThree.title = playerThreeIll[0].name;
} else {playerThree.innerHTML = 'Good';playerThree.title = 'Test Better';}
} else {
	playerThree.style.color = '#f00';playerThree.innerHTML = 'Dead';
	playerThree.title = 'Dead from:';
	playerThreeC.style.visibility = 'visible';
}

// FOUR

if (playerFourDead != true) {
if (playerFourIll.length > 0)
{
	playerFour.innerHTML = 'Sick';
	playerFour.title = playerFourIll[0].name;
} else {playerFour.innerHTML = 'Good';playerFour.title = 'Test Better';}
} else {
	playerFour.style.color = '#f00';playerFour.innerHTML = 'Dead';
	playerFour.title = 'Dead from:';
	playerFourC.style.visibility = 'visible';
}

// FIVE

if (playerFiveDead != true) {
if (playerFiveIll.length > 0)
{
	playerFive.innerHTML = 'Sick';
	playerFive.title = playerFiveIll[0].name;
} else {playerFive.innerHTML = 'Good';playerFive.title = 'Test Better';}
} else {
	playerFive.style.color = '#f00';playerFive.innerHTML = 'Dead';
	playerFive.title = 'Dead from:';
	playerFiveC.style.visibility = 'visible';
}

// SIX

if (playerSixDead != true) {
if (playerSixIll.length > 0)
{
	playerSix.innerHTML = 'Sick';
	playerSix.title = playerSixIll[0].name;
} else {playerSix.innerHTML = 'Good';playerSix.title = 'Test Better';}
} else {
	playerSix.style.color = '#f00';playerSix.innerHTML = 'Dead';
	playerSix.title = 'Dead from:';
	playerSixC.style.visibility = 'visible';
}

refreshPartyNames();
}

// ---- Date Stuff ----
var gameDate = new Date(1852, 10, 1);

var newMonthNumber = gameDate.getMonth();
var newDayNumber = gameDate.getDate();
var newYearNumber = gameDate.getFullYear();

var monthDays = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var tempMonth = [58, 62, 70, 78, 88, 98, 104, 102, 94, 80, 66, 56];

var globalTemp = 10;
var globalWeat = "Sunny";

function updateDate() {
document.getElementById('date').innerHTML = monthName[newMonthNumber] + ', ' + newDayNumber + ', ' + newYearNumber;
diaryEntry('\n' + monthName[newMonthNumber] + ', ' + newDayNumber + ', ' + newYearNumber);
globalDate = newMonthNumber + '/' + newDayNumber + '/' + newYearNumber;
}

function calcWeather() {
var randomTemp = tempMonth[newMonthNumber] + (Math.floor(Math.random() * 10) - 5);
var weatMid = ["Sunny", "Cloudy"];
var weatLow = ["Cloudy", "Stormy", "Raining", "Snowing", "Blizzard"];
var newTemp = randomTemp;

if (randomTemp >= 90) {
globalWeat = "Sunny";
newTemp = randomTemp;}

if (randomTemp < 90 && randomTemp > 70) {
var weatChange = Math.floor(Math.random() * 2);
globalWeat = weatMid[weatChange];
newTemp = randomTemp - weatChange;}

if (randomTemp < 70) {
var weatChange = Math.floor(Math.random() * 5);
globalWeat = weatLow[weatChange];
newTemp = randomTemp - weatChange;}

globalTemp = newTemp;
document.getElementById('temp').innerHTML = newTemp;

document.getElementById('weather').innerHTML = globalWeat;
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

calcWeather();
updateDate();
}
// ---- Diary Stuff ----
function clearDiary() {
var diaryDiv = document.getElementById('diary');
diaryDiv.value = 'Welcome to the Monotone Trail!\nCreated by Volante!';
}

function diaryEntry(stringToWrite) {
var stringToWrite;
var diaryDiv = document.getElementById('diary');
diaryDiv.value += '\n' + stringToWrite.toString();
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

function keyHandle(e) {
var e;
if (e.keyCode === 13) {inputDebug();}
}

function inputDebug() {
var consoleInput = document.getElementById('dbi').value;
var filter = /^$|^[a-zA-Z0-9]+$/.test(consoleInput);

if (filter == true)
{
	var inputString = consoleInput.split(' ');
} else {
	var inputString = [''];
	dbcWrite('INVALID INPUT STRING', 'error');
}

var userOutput = '<span style="color:#ff0;">User: ' + consoleInput + '</span><br />';
var cwDiv = document.getElementById('dbscr');

if (inputString[0] == 'togglecheats')
{document.getElementById('consolewindow').innerHTML += userOutput;
showCheats();dbcWrite('Showing the cheat code menu.');}

if (inputString[0] == 'cheat')
{document.getElementById('consolewindow').innerHTML += userOutput;
cheat(inputString[1]);}

if (inputString[0] == 'debugmenu')
{document.getElementById('consolewindow').innerHTML += userOutput;
changeCanvas(sceneTest, testDia);dbcWrite('Showing the debug menu.');}

if (inputString[0] == 'canvasdebug')
{document.getElementById('consolewindow').innerHTML += userOutput;
canvasDebug = inputString[1];refreshDBCanvas();dbcWrite('Refresh the canvas to see changes.','error');}

if (inputString[0] == 'glitch')
{document.getElementById('consolewindow').innerHTML += userOutput;
glitchScreen();}

if (inputString[0] == 'showbuyinv')
{document.getElementById('consolewindow').innerHTML += userOutput;
showBuyInv(inputString[1]);dbcWrite('Showing buy inventory with list set: ' + inputString[1] + '.');}

if (inputString[0] == 'showplayerinv')
{document.getElementById('consolewindow').innerHTML += userOutput;
showPlayerInv();dbcWrite('Showing player inventory.');}

if (inputString[0] == 'appenditem')
{document.getElementById('consolewindow').innerHTML += userOutput;
appendItem(inputString[1], inputString[2]);}

if (inputString[0] == 'diary')
{document.getElementById('consolewindow').innerHTML += userOutput;
diaryEntry(consoleInput.replace('diary ', ''));dbcWrite(consoleInput.replace('diary ', ''));}

document.getElementById('dbi').value = '';
cwDiv.scrollTop = cwDiv.scrollHeight;
}

function dbcWrite(stringToWrite, state) {
var stringToWrite, state;
var time = new Date();
var timeLog = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
var cwDiv = document.getElementById('dbscr');

if (typeof state == "undefined") {
document.getElementById('consolewindow').innerHTML += timeLog + ': ' + stringToWrite.toString() + '<br />';
}

if (state == "error") {
document.getElementById('consolewindow').innerHTML += '<span style="color:#f00;">' + timeLog + ': ' + stringToWrite.toString() + '<br /></span>';
}

if (state == "error2") {
document.getElementById('consolewindow').innerHTML += '<span style="color:#f00;">' + timeLog + ': ' + stringToWrite.toString() + '<br /></span>';
var butts = stringToWrite.toString();
console.log("%c"+butts, "color: red;");
}

if (state == "achi") {
document.getElementById('consolewindow').innerHTML += '<span style="color:#ff0;">' + timeLog + ': ' + stringToWrite.toString() + '<br /></span>';
}

cwDiv.scrollTop = cwDiv.scrollHeight;
}

function refreshDBCanvas() {
var dbcan = document.getElementById('dbcanvas');
var dbdate = new Date();
var dbopacity = document.getElementById('dbop');

dbcan.style.opacity = dbopacity.value;
dbcan.style.visibility = 'visible';
dbopacity.style.visibility = 'visible';
document.getElementById('dbopvalue').style.visibility = 'visible';
document.getElementById('dbopvalue').innerHTML = dbopacity.value;

dbtext = 'Canvas Debug Mode: Enabled' + ' @ 1000ms :/. ' + dbdate.getMilliseconds() + '<br />' +
//Above detects the drift of the update rate
'Current Canvas: ' + canvasName + '<br />' +
'Game Pause Condition: ' + gamePaused + '<br />' +
/*'Trail Array Position: ' + trailPosition + '<br />' +
'Grave Array Position: ' + gravePosition + '<br />' +
'Current Local Distance: ' + currentDistance + '<br />' +*/
/*'Event Chances: ' + dbChance + '<br />' +
'Events Played: ' + eventsPlayed + '<br />' +
'Trail Event Condition: ' + trailEvent + '<br />' +*/
'<span style="color:#ff0;">Wagon Weight: ' + globalWWeight + '</span><br />' +
'Wagon Travel Pace: ' + travelPace + '<br />' +
'Global Oxen Count: ' + oxenAmount + '<br />' +
'Global Clothing Count: ' + globalClothing + '<br />' +
'Global Perisable Food: ' + globalPFood + '<br />' +
'Global Non-Perisable Food: ' + globalNPFood + '<br />' +
'Grandfather Clocks: ' + globalClocks + '<br />' +
'Money: ' + playerMoney + '<br />'

/* +
'0: ' + wagonParty[0].name + ' | Morale: ' + wagonParty[0].morale + ' | Sick: ' + wagonParty[0].ill.length + '<br />' +
'1: ' + wagonParty[1].name + ' | Morale: ' + wagonParty[1].morale + ' | Sick: ' + wagonParty[1].ill.length + '<br />' +
'2: ' + wagonParty[2].name + ' | Morale: ' + wagonParty[2].morale + ' | Sick: ' + wagonParty[2].ill.length + '<br />' +
'3: ' + wagonParty[3].name + ' | Morale: ' + wagonParty[3].morale + ' | Sick: ' + wagonParty[3].ill.length + '<br />' +
'4: ' + wagonParty[4].name + ' | Morale: ' + wagonParty[4].morale + ' | Sick: ' + wagonParty[4].ill.length + '<br />' +
'5: ' + wagonParty[5].name + ' | Morale: ' + wagonParty[5].morale + ' | Sick: ' + wagonParty[5].ill.length + '<br />'*/
;

dbcan.innerHTML = dbtext;
//dbcan.remove();
}

/* CHEAT CONSOLE */
function inputCheat(input) {
var input, buffer;
if (input.keyCode === 13) {cheat();}
}

function cheat(dbinput) {
var dbinput;

if (typeof dbinput !== 'undefined') {
var cconInput = dbinput;
} else {
var cconInput = document.getElementById('ccon').value;
}

var filter = /^$|^[a-zA-Z0-9]+$/.test(cconInput);
if (filter == true)
{
	//do nothing
} else {
	cconInput = '';
	dbcWrite('INVALID CHEAT INPUT', 'error');
}

if (cconInput == 'credits') {showCredits();}

if (cconInput == 'rosebud') {
dbcWrite('Player has used "rosebud" cheat code.','achi');
showNotification('No such cheat!');
playerMoney += 1000;}

if (cconInput == 'timBBQQT') {
dbcWrite('Player has used "timBBQQT" cheat code.','achi');
showNotification('Glitch Mode Activated!');
glitchCheat = 1;}

document.getElementById('ccon').value = "";

}

function glitchScreen() {
//add a times amount for how many times the glitch will happen
//IE 2 will flicker 2 glitches
//IE 10 will flicker 10 glitches
//also add a time interval for how long the glitch will happen

glitchControl(60);
setTimeout(function(){ glitchControl(60); }, 60);

}

function glitchControl(time, style)
{
	var time, style;
	//styles:
	//0: game window
	//1: bsod window
	
	for (gi = 1; gi < 21; gi++)
	{
		var eleName = 'rb' + gi;
		randomStyle(eleName, style);
	}
	
	document.getElementById('overlay').style.visibility = "visible";
	setTimeout(function(){ hideBars(); }, time);
}

function hideBars() {
document.getElementById('overlay').style.visibility = "hidden";
}

function randomStyle(element, style) {
var element, style;
//var colors = ["#e8d29c", "#b87331", "#222222", "rgba(0,0,0,0.1)"];
var randomTop = 100 - Math.floor(Math.random() * 95);
var randomHeight = Math.floor(Math.random() * 16) + 4;
var randomColor = Math.floor(Math.random() * 4);
var randomLeft  = -60 + Math.floor(Math.random() * 220);
var randomWidth = 120 - Math.floor(Math.random() * 50);

var onePal = ["#e8d29c", "#b87331", "#222222", "rgba(0,0,0,0.1)"];
var twoPal = ["rgba(0,0,128,1)", "#fff", "#000", "rgba(0,0,128,1)"];

if (randomLeft < 75) {
randomLeft = -Math.abs(randomLeft);
} else {
randomLeft = Math.abs(randomLeft) - 75;
}

document.getElementById(element).style.top = randomTop + "%";
document.getElementById(element).style.left = randomLeft + "%";
document.getElementById(element).style.height = randomHeight + "px";
document.getElementById(element).style.width = randomWidth + "%";

if (style == 0 || typeof style == 'undefined')
{document.getElementById(element).style.background = onePal[randomColor];}

if (style == 1)
{document.getElementById(element).style.background = twoPal[randomColor];}

}
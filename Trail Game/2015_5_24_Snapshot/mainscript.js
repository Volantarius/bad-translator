//Written by Volante

var objectClock = {name:'Grandfather Clock', vname:'objectClock', weight:25, cost:20};
var objectRedhat = {name:'Red Hat', vname:'objectRedhat', weight:1.5, cost:2};
var objectOxen = {name:'Oxen', vname:'objectOxen', weight:45, cost:44};
var objectPot = {name:'Pot', vname:'objectPot', weight:2, cost:2};
var objectThing = {name:'Thing', vname:'objectThing', weight:2, cost:1};

var listTest = [{name:objectClock, amount:2}, {name:objectRedhat, amount:20}, {name:objectOxen, amount:5}, {name:objectPot, amount:10}, {name:objectThing, amount:4}];
var listTestTwo = [{name:objectClock, amount:10}, {name:objectRedhat, amount:10}, {name:objectOxen, amount:10}];

var playerInv = [{name:objectOxen, amount:15}];
//the player inventory can not at any time be empty, it must always have an ox inside

var playerMoney = 1000;

var oxenAmount = 0;
// ---- Window Commands ----
function hideWindow(windowName) {
var windowName;
document.getElementById(windowName).style.visibility = "hidden";
}

function hideAllWindows() {
var windows = ['buyinvwindow','playerinvwindow','notwindow','creditswindow'];

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
}

function showCheats() {
document.getElementById('ccon').style.visibility = "visible";
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

for (index = 0;index < itemArray.length; index++) {
var itemWeight = itemArray[index].name.weight;
var itemAmount = itemArray[index].amount;
var totalItemWeight = itemAmount * itemWeight;

if (itemArray[index].name.vname == "objectOxen") {

if (typeof oxenAmount !== "undefined") {oxenAmount = itemArray[index].amount;}

}

tr = '<tr><td class="smallleft">' + itemAmount + '</td>'
+ '<td>' + itemArray[index].name.name + '</td>'
+ '<td class="medium">' + totalItemWeight + '</td></tr>';

this[targetInv].innerHTML += tr;
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
// ---- Screen Stuff ---- //width:596px;height:358px;
var sceneTest = [{name:"sceneTest", background:"url('images/ot/indy_A_W_store1.png')"},
{action:"showBuyInv('listTest');", image:"none", height:104, width:40, x:524, y:150, cursor:"url('images/cursors/buy.cur'), auto", hide:'visible'},
{action:"changeCanvas(progScene, progDiaPause);", image:"url('images/timetraveldisplay.png')", height:140, width:103, x:246, y:218, cursor:"default", hide:'visible'},
{action:"glitchScreen();", image:"url('images/stripes.png')", height:40, width:40, x:140, y:150, cursor:"default", hide:'visible'},
{action:"changeCanvas(indyAN, testTwoDia);", image:"url('images/shotty.png')", height:16, width:64, x:100, y:280, cursor:"url('images/cursors/exit.cur'), auto", hide:'visible'}];

var progScene = [{name:"progScene", background:"none"}];

var blankScene = [{name:"blankScene", background:"none"}];

var testRanEvent = [{name:"testRanEvent", background:"url('images/pokebg.png')"}];

var graveScene = [{name:"graveScene", background:"none"}];

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
{action:"showBuyInv('listTest');", name:"Buy Menu 1"},
{action:"showBuyInv('listTestTwo');", name:"Buy Menu 2"},
{action:"showNotification('Howdy!!');resetTravel(trailTest, 0);", name:"Stuff"},
{action:"showPlayerInv();", name:"Wagon"},
{action:"calcWeather();updateDate()", name:"Generate Weather"}];

var graveDia = [{title:"Gravestone Thing"},
{action:"changeCanvas(progScene, progDiaPause);", name:"Go Back"}];

var testTwoDia = [{title:"Independence"},
{action:"diaryEntry('Buttocks');", name:"Diary"}];

var testRanEventDia = [{title:"Test Random Event"},
{action:"changeCanvas(progScene, progDiaPause);", name:"Travel the Trail"}];

var progDiaPause = [{title:"The Oregon Trail <br /> Paused"},
{action:"startTravel();", name:"Continue Travel"},
{action:"showPlayerInv();", name:"Wagon"}, //Put drop items thing in the inventory menu instead
{action:"", name:"Hunt"},
{action:"", name:"Trade"},
{action:"", name:"Rest"}];

var progDiaRest = [{title:"The Oregon Trail <br /> Resting"},
{action:"pauseTravel(true);", name:"Pause Travel"}];

var progDiaPlay = [{title:"The Oregon Trail <br /> Traveling"},
{action:"", name:"Traveling..."}];
// End dialogues

//CHANGE CANVAS DEBUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var canvasDebug = 0;

var glitchCheat = 0;

function changeCanvas(scene, dialogue) {
var scene, dialogue;
var canvas = document.getElementById('gamecanvas');
var diaTitle = document.getElementById('dtitle');
var diaMenu = document.getElementById('dmenu');
var sceneBG = scene[0].background;

if (glitchCheat == 1) {glitchScreen();}//Glitch cheat mode

dbcWrite('Changing canvas to: ' + scene[0].name);

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

diaTitle.innerHTML = diaId.toString();
diaMenu.innerHTML = '<br />';

for (index = 1;index < dialogue.length; index++) {
var diaAction = dialogue[index].action;
var diaName = dialogue[index].name;

diaMenu.innerHTML += '<button class="diabutton" onclick="' + diaAction + '">' + diaName + '</button>';
}

} else {dbcWrite('Dialogue was not defined', 'error');}

if (scene == progScene) {showPS();} else {hidePS();}
if (scene == graveScene) {showGrave();} else {hideGrave();}
refreshPlayerInv();
updateLoc();
hideAllWindows();

}

// ---- Trail Variables ----
var trailTest = [{name:"Start", distance:0, scene:sceneTest, dia:testDia, events:1},
{name:"Mid", distance:200, scene:sceneTest, dia:testDia, events:0},
{name:"End", distance:300, scene:blankScene, dia:testTwoDia, events:0}];

var oregonTrailOne = [{name:"Beginning", distance:0, scene:sceneTest, dia:testDia, events:0},
{name:"Kansas R. crossing", distance:102, scene:sceneTest, dia:testDia, events:0},
{name:"Big Blue R. crossing", distance:83, scene:sceneTest, dia:testDia, events:0},
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

var trailGraves = [{text:"I HONK FOR CHOLERA",distance:40},//This needs a name of the party guide on top
{text:"The 20 dollars is behind the grave",distance:250},
{text:"You shouldn't see this grave.",distance:0,end:true}];

var currentTrail = oregonTrailOne;

var trailPosition = 0;//Position in the trail array the player is in
var gravePosition = 0;//Position in graves array

var distanceTraveled = 0;
var currentDistance = 0;
var distanceToGo = 0;

var trailEvent = 0; // Don't remove again you idiot
var travelPace = 4; // Miles to travel today
var eventsPlayed = 0; // Events to play counter

var gamePaused = false;

function resetTravel(trailName, trailPos) {
var trailName, trailPos;

dbcWrite('Travel reset');

if (typeof trailName !== 'undefined') {currentTrail = trailName;}
if (typeof trailPos !== 'undefined') {trailPosition = trailPos;currentDistance = 0;}

var destEle = document.getElementById('psdest');
var destPos = destEle.style.left;
var destVar = destPos.replace('px', '');
var destInt = parseInt(destVar, 10);

var bgEle = document.getElementById('psbg');
var bgPos = bgEle.style.backgroundPosition;
var bgVar = bgPos.replace('px 0px', '');
var bgInt = parseInt(bgVar, 10);

bgEle.style.backgroundPosition = '0px 0px';
destEle.style.left = '20px';

updateLoc();
}

function pauseTravel(state) {
var state;
dbcWrite('Travel paused');
gamePaused = state;
}

function restTravel() {
changeCanvas(progScene, progDiaRest);
dbcWrite('Travel resting');
diaryEntry('Resting...');

setTimeout(function(){ if (gamePaused == true) {changeCanvas(progScene, progDiaPause);} else {startTravel();} }, 1500);
}

function randomEvent() {
//var weatMid = ["Sunny", "Cloudy"];
//var weatLow = ["Cloudy", "Stormy", "Raining", "Snowing", "Blizzard"];
var testArray = [ ];

var randomChance = Math.floor(Math.random() * 100);

if (globalTemp < 86 && randomChance < 20)
{testArray.push( [true,testRanEvent,testRanEventDia,"Cold Weather"] );} else {}

if (globalWeat == "Sunny" && globalTemp > 88 && randomChance < 20 && trailEvent == 1)
{testArray.push( [true,testRanEvent,testRanEventDia,"Bad Water"] );} else {}

if (testArray.length > 0) {
var randomPos = Math.floor(Math.random() * testArray.length);
return testArray[randomPos];
testArray.splice(0,testArray.length,"");//This might break the array but it looks good so far
} else {return false;}

}

function startTravel() {
var oxen = oxenAmount;
var oxenPower = 1.5;

var delayTime = 2500;//The time it takes to move is determined by the travel speed

pauseTravel(false);
incDate();
changeCanvas(progScene, progDiaPlay);//switches the dialogue so you cant double travel
dbcWrite('Travel started!');

var totalDistance = Math.floor(oxen*oxenPower);
//total distance is the main modifier for changing how much the wagon moves

var distanceToLocation = currentTrail[(trailPosition + 1)].distance;
var locationName = currentTrail[(trailPosition + 1)].name;

distanceTraveled = distanceTraveled + totalDistance;
currentDistance = currentDistance + totalDistance;

var distToGo = distanceToLocation - currentDistance;

var destEle = document.getElementById('psdest');
var destPos = destEle.style.left;
var destVar = destPos.replace('px', '');
var destInt = parseInt(destVar, 10);

var bgEle = document.getElementById('psbg');
var bgPos = bgEle.style.backgroundPosition;
var bgVar = bgPos.replace('px 0px', '');
var bgInt = parseInt(bgVar, 10);

//350 is total distance for the wagon and dest to meet
var distanceCon = (350 - 40)/distanceToLocation;
var distancePix = Math.floor(totalDistance*distanceCon);

var bgCon = 200/distanceToLocation;
var bgPix = Math.floor(totalDistance*bgCon);

//var playEvent = false;
var playEvent = randomEvent();//does calc the scene of the event in a array
//Needs to take into the trail events variable

if (currentDistance >= distanceToLocation) {
bgEle.style.backgroundPosition = (bgInt + bgPix) + 'px 0px';
destEle.style.left = '350px';

trailPosition = trailPosition + 1;
//trailEvent = array position; I dont remember what this is for
currentDistance = 0;
var locationScene = currentTrail[trailPosition].scene;
var locationDia = currentTrail[trailPosition].dia;
dbcWrite('Travel ended and we reached: ' + currentTrail[trailPosition].name );
setTimeout(function(){ changeCanvas(locationScene, locationDia);resetTravel(); }, delayTime);
} else {
bgEle.style.backgroundPosition = (bgInt + bgPix) + 'px 0px';
destEle.style.left = (destInt + distancePix) + 'px';

if (playEvent[0] == true) {
setTimeout(function(){ changeCanvas(playEvent[1], playEvent[2]);diaryEntry(playEvent[3]); }, delayTime);
++eventsPlayed;
dbcWrite('Random Event Number: ' + eventsPlayed);
} else {

var graveDistance = trailGraves[gravePosition].distance;
var graveText = trailGraves[gravePosition].text;
if (typeof trailGraves[gravePosition].end === 'undefined') {
var graveEnd = false;
} else {
var graveEnd = trailGraves[gravePosition].end;
}

if (distanceTraveled >= graveDistance && !(graveEnd === true)) {
setTimeout(function(){ changeCanvas(graveScene, graveDia);updateGrave(graveText); }, delayTime);
++gravePosition;
} else {
setTimeout(function(){ restTravel(); }, delayTime);
}

}

}

if (newDayNumber <= 2) {diaryEntry('Today we set out to the Oregon Trail!');}

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

function updateGrave(text) {
var text;
var graveStone = document.getElementById('grave');
graveStone.innerHTML = text;
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
var wagonParty = [{name:"Tim", color:"#000", age:2, days:0, health:[], deceased:false},
{name:"Team Red", color:"#f00", age:2, days:0, health:[], deceased:false},
{name:"Team Green", color:"#0f0", age:2, days:0, health:[], deceased:true},
{name:"Team Blue", color:"#00f", age:2, days:0, health:[], deceased:false},
{name:"Team Pink", color:"#f88", age:2, days:0, health:[], deceased:false},
{name:"Subscribers", color:"#000", age:2, days:0, health:[], deceased:false}];
//days? maybe days that they've rested to get rid of certain sicknesses
//health: is a array that has the conditions of the player

// ---- Date Stuff ----
var gameDate = new Date(1848, 4, 1);

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

dbcWrite('Weather: ' + globalWeat + ', ' + globalTemp);
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

dbcWrite('Date: ' + newMonthNumber + '/' + newDayNumber + '/' + newYearNumber);
calcWeather();
updateDate();
}
// ---- Diary Stuff ----
function clearDiary() {
var diaryDiv = document.getElementById('diary');
diaryDiv.value = 'Welcome to the Monotone Trail!\nCreated by Volante!';
//Welcome to the Monotone Trail!! Created by Volante!
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
canvasDebug = inputString[1];dbcWrite('Refresh the canvas to see changes.');}

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

if (state == "achi") {
document.getElementById('consolewindow').innerHTML += '<span style="color:#ff0;">' + timeLog + ': ' + stringToWrite.toString() + '<br /></span>';
}

cwDiv.scrollTop = cwDiv.scrollHeight;
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
document.getElementById('overlay').style.visibility = "visible";

randomStyle('rb1');
randomStyle('rb2');
randomStyle('rb3');
randomStyle('rb4');
randomStyle('rb5');
randomStyle('rb6');
randomStyle('rb7');
randomStyle('rb8');
randomStyle('rb9');
randomStyle('rb10');

randomStyle('rb11');
randomStyle('rb12');
randomStyle('rb13');
randomStyle('rb14');
randomStyle('rb15');
randomStyle('rb16');
randomStyle('rb17');
randomStyle('rb18');
randomStyle('rb19');
randomStyle('rb20');

var cursors = ["crosshair", "e-resize", "grab", "help", "move", "progress", "wait", "no-drop"];
document.getElementById('overlay').style.cursor = cursors[Math.floor(Math.random() * 8)];

setTimeout(function(){ glitchScreenNoHide(); }, 60);
setTimeout(function(){ hideBars(); }, 120);
}

function glitchScreenNoHide() {

randomStyle('rb1');
randomStyle('rb2');
randomStyle('rb3');
randomStyle('rb4');
randomStyle('rb5');
randomStyle('rb6');
randomStyle('rb7');
randomStyle('rb8');
randomStyle('rb9');
randomStyle('rb10');

randomStyle('rb11');
randomStyle('rb12');
randomStyle('rb13');
randomStyle('rb14');
randomStyle('rb15');
randomStyle('rb16');
randomStyle('rb17');
randomStyle('rb18');
randomStyle('rb19');
randomStyle('rb20');

var cursors = ["e-resize", "progress", "wait", "no-drop", "default"];
document.getElementById('overlay').style.cursor = cursors[Math.floor(Math.random() * 5)];

}

function hideBars() {
document.getElementById('overlay').style.visibility = "hidden";
}

function randomStyle(element) {
var element;
var colors = ["#e8d29c", "#b87331", "#222222", "rgba(0,0,0,0.1)"];
var randomTop = 100 - Math.floor(Math.random() * 95);
var randomHeight = Math.floor(Math.random() * 16) + 4;
var randomColor = Math.floor(Math.random() * 4);
var randomLeft  = Math.random() * 150;
var randomWidth = 100 - Math.floor(Math.random() * 90);

if (randomLeft < 75) {
randomLeft = -Math.abs(randomLeft);
} else {
randomLeft = Math.abs(randomLeft) - 75;
}

document.getElementById(element).style.top = randomTop + "%";
document.getElementById(element).style.left = randomLeft + "%";
document.getElementById(element).style.height = randomHeight + "px";
document.getElementById(element).style.background = colors[randomColor];
document.getElementById(element).style.width = randomWidth + "%";
}
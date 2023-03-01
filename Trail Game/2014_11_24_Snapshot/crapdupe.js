//written by Christian Nye

var objectTest = {name:"Grandfather Clock", weight:"4.00", max:"2", cost:"$20.00", costnum:20};
var objectTestTwo = {name:"Red Hat", weight:"0.25", max:"20", cost:"$2.00", costnum:2};
var objectButt = {name:"Tim is a butt", weight:"10.00", max:"12", cost:"$4.00", costnum:4};

var objectListTest = [objectTest, objectTestTwo, objectButt];

var playerMoney = 5000;

function hideWindow(windowName) {
var windowName;
document.getElementById(windowName).style.visibility = "hidden";
}

function showWindow(windowName) {
var windowName;
document.getElementById(windowName).style.visibility = "visible";
}

function centerWindow(windowName) {
var windowName;
document.getElementById(windowName).style.top = 16 + "px";
document.getElementById(windowName).style.left = 16 + "px";
}

function testList(itemList, targetInv) {
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

for (index = 0;index < itemArray.length; index++) {
tr = '<td class="small" id="' + itemList + 'Carry' + index + '" >' + "0" + ctd // Carry Variable
+ tds + itemArray[index].max + ctd // Maxiumum Buy
+ tdsl + '<input type="number" value="0" min="0" id="' + itemList + 'Input' + index + '" max="' + itemArray[index].max + '" />' + ctd // Buy Input
+ td + itemArray[index].name + ctd // Item Name
+ tdm + itemArray[index].cost + ctd // Unit Cost
+ '<td class="small" id="' + itemList + 'Total' + index + '" >' + "$0" + ctd // Total Cost
+ "</tr>";

this[targetInv].innerHTML += tr;
}
listEvents(itemList);

}

function listEvents(itemList) {
var itemList;
var itemArray = this[itemList];

for (index = 0;index < itemArray.length; index++) {
var idInput = itemList + 'Input' + index;
var idTotal = itemList + 'Total' + index;
var idCost = itemArray[index].costnum;
var idMax = itemArray[index].max;

addInputListeners(idInput, idTotal, idCost, idMax, itemList);
}

}

function addInputListeners(inputName, totalName, costVar, maxInput, itemList) {
var inputName, totalName, costVar, maxInput, itemList;
document.getElementById(inputName).addEventListener("input", function(){testEvent(inputName, totalName, costVar, maxInput, itemList);});
}

function testEvent(inputName, totalName, costVar, maxInput, itemList) {
var inputName, totalName, costVar, maxInput, itemList;
var inputVar = document.getElementById(inputName).value;
var inputInt = parseInt(inputVar, 10);

if (inputInt >= 0 && inputInt <= maxInput) {
var sumCost = inputVar * costVar;
var costEle = '$' + sumCost;

document.getElementById(totalName).innerHTML = costEle;
}
butttCost(itemList);

}

function butttCost(itemList) {
var itemList;
var itemArray = this[itemList];
var sumTotal = 0;

for (index = 0;index < itemArray.length; index++) {
var idTotal = itemList + 'Total' + index;
var totalVar = document.getElementById(idTotal).innerHTML;
var totalNum = totalVar.replace('$', '');
var totalInt = parseInt(totalNum, 10);

sumTotal = sumTotal + totalInt;
}
console.log(sumTotal);

}
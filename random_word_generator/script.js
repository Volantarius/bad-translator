var vowels = ['a','e','i','o','u'];
var hiloruy = ['a','e','h','i','l','o','r','u','y'];
var noVowels = ['b','c','d','f','g','h','i','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
var iCon = ['c','e','f','g','k','l','m','n','q','r','s','t'];
var qCon = ['u'];
var sCon = ['a','c','e','g','h','i','l','m','n','o','r','t','y'];
var xCon = ['a','e','i','j','o','y'];
var yCon = ['e','i','n','r'];

var letterCon = [
noVowels, vowels, hiloruy,
hiloruy, noVowels, hiloruy,
hiloruy, vowels, iCon,
vowels, vowels, vowels,
vowels, vowels, noVowels,
hiloruy, qCon, vowels,
sCon, vowels, noVowels,
hiloruy, vowels, xCon,
yCon, vowels];

var letterNumber = {
'a': 0, 'b': 1, 'c': 2,
'd': 3, 'e': 4, 'f': 5,
'g': 6, 'h': 7, 'i': 8,
'j': 9, 'k': 10, 'l': 11,
'm': 12, 'n': 13, 'o': 14,
'p': 15, 'q': 16, 'r': 17,
's': 18, 't': 19, 'u': 20,
'v': 21, 'w': 22, 'x': 23,
'y': 24, 'z': 25};

function addHandlers()
{
	var tDoc = document.getElementById('textinput');
	var nDoc = document.getElementById('numbinput');

	tDoc.addEventListener("input", textHandler, true );
	nDoc.addEventListener("input", numbHandler, true );
}

function textHandler()
{
	var tDoc = document.getElementById('textinput');
	var tIn = document.getElementById('textinput').value.toString();

	if (tIn.length > 10 || ! /^$|^[a-z]+$/.test(tIn))
	{
		tDoc.style.boxShadow = "0px 0px 3px #f00";
	} else {
		tDoc.style.boxShadow = "0px 0px 3px #08f";
	}
}

function numbHandler()
{
	var nDoc = document.getElementById('numbinput');
	var nIn = document.getElementById('numbinput').value;

	if (nIn > 30 || isNaN(nIn))
	{
		nDoc.style.boxShadow = "0px 0px 3px #f00";
	} else {
		nDoc.style.boxShadow = "0px 0px 3px #08f";
	}
}

function inputWord()
{
	var tIn = document.getElementById('textinput').value.toString();
	var nIn = document.getElementById('numbinput').value;
	var tOut = tIn;
	var nOut = nIn;

	if (tIn.length > 10 || ! /^$|^[a-z]+$/.test(tIn)) {tOut = '';} else {tOut = tIn;}
	if (nIn > 30 || isNaN(nIn)) {nOut = 0;} else {nOut = nIn;}

	wordGen(tOut, nOut);
}

function wordGen(seed, count)
{
	var seed, count;
	var custom = 0;
	var word = "";
	if (seed !== '') {word = seed;custom = 1;} else {word = "";custom = 0;}
	var output = document.getElementById('textarea');
	var wordLength = 5;
	if (count !== '') {wordLength = count;} else {wordLength = 5;}
	var lastWord = "i";
	if (custom == 1) {var thing = seed.slice(-1);lastWord = thing;}

	for (index = 0;index < wordLength; index++)
	{
		var randomLetterPos = Math.floor(Math.random() * 26);

		if (index > 0 || custom == 1)
		{
			var randomLetter = letterCon[letterNumber[lastWord]];
		} else {
			var randomLetter = letterCon[randomLetterPos];
		}

		var pickedLetter = randomLetter[Math.floor(Math.random() * randomLetter.length)];

		lastWord = pickedLetter;

		word += pickedLetter;
	}

	output.innerHTML = word;
}
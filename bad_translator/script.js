//You shouldn't be looking at this code. It is lazy.

function replaceCharacters()
{
	var inputText = document.getElementById('inText').value;
	var outputText = document.getElementById('outText');
	
	var replaceInput = document.getElementById('replaceIn').value;
	var replaceWith = document.getElementById('replaceWith').value;
	
	var unicodeReplace1 = document.getElementById('replaceUni1').checked;
	var unicodeReplace2 = document.getElementById('replaceUni2').checked;
	
	if (unicodeReplace1)
	{
		replaceInput = String.fromCharCode(replaceInput);
	}
	
	if (unicodeReplace2)
	{
		replaceWith = String.fromCharCode(replaceWith);
	}
	
	var regex = new RegExp(replaceInput,'g');
	
	outputText.value = inputText.replace(regex, replaceWith);
}

function insertCharacters()
{
	var inputText = document.getElementById('inText').value;
	var outputText = document.getElementById('outText');
	
	var replaceInput = document.getElementById('insertIn').value;
	var replaceWith = document.getElementById('insertWith').value;
	
	var insertType = document.getElementById('insertType').checked;
	
	var unicodeReplace1 = document.getElementById('insertUni1').checked;
	var unicodeReplace2 = document.getElementById('insertUni2').checked;
	
	if (unicodeReplace1)
	{
		replaceInput = String.fromCharCode(replaceInput);
	}
	
	if (unicodeReplace2)
	{
		replaceWith = String.fromCharCode(replaceWith);
	}
	
	var regex = new RegExp(replaceInput,'g');
	
	if (insertType)
	{
		outputText.value = inputText.replace(regex, replaceWith + '' + replaceInput);
	} else {
		outputText.value = inputText.replace(regex, replaceInput + '' + replaceWith);
	}
}

function bendCharacters()
{
	var inputText = document.getElementById('inText').value;
	var outputText = document.getElementById('outText');
	
	var unicodeReplace1 = document.getElementById('bendUni1').checked;
	var unicodeReplace2 = document.getElementById('bendUni2').checked;
	
	var bendAppend1 = document.getElementById('bendAppend1').checked;
	var bendAppend2 = document.getElementById('bendAppend2').checked;
	
	var bendStart = '';
	var bendEnd = '';
	
	if (bendAppend1)
	{
		bendStart = document.getElementById('bendStart').value;
		if (unicodeReplace1) {bendStart = String.fromCharCode(bendStart);}
	}
	
	if (bendAppend2)
	{
		bendEnd = document.getElementById('bendEnd').value;
		if (unicodeReplace2) {bendEnd = String.fromCharCode(bendEnd);}
	}
	
	outputText.value = bendStart + '' + inputText + '' + bendEnd;
}

var characterBL = {
	32:true, 33:true, 34:true, 35:true,
	36:true, 37:true, 38:true, 39:true,
	40:true, 41:true, 42:true, 43:true,
	44:true, 45:true, 46:true, 47:true,
	58:true, 59:true, 60:true, 61:true,
	62:true, 63:true, 64:true, 91:true,
	92:true, 93:true, 94:true, 95:true,
	96:true, 123:true, 124:true, 125:true,
	126:true, 10:true
};

function decodeUnicode()
{
	var inputText = document.getElementById('decodeUniIn').value;
	var outputText = document.getElementById('decodeUniOut');
	
	var regex = /\W/g;
	
	var newOutput = inputText;
	var addLength = 0;
	
	while (match=regex.exec(inputText))
	{
		if (!characterBL[inputText.charCodeAt(match.index)])
		{
			var charCode = inputText.charCodeAt(match.index);
			var entity = '&#x' + charCode.toString(16) + ';';
			
			var partOne = newOutput.slice(0, (match.index + addLength));
			var partTwo = newOutput.slice((match.index + addLength + 1), newOutput.length);
			
			addLength = entity.length + addLength - 1;
			
			newOutput = partOne + '' + entity + '' + partTwo;
		}
	}
	
	outputText.value = newOutput;
}

function encodeUnicode()
{
	var inputText = document.getElementById('decodeUniIn').value;
	var outputText = document.getElementById('decodeUniOut');
	
	document.getElementById('temp').innerHTML = inputText;
	outputText.value = document.getElementById('temp').innerHTML;
}

function filterAllNoWidthSpace()
{
	var inputText = document.getElementById('inText').value;
	var outputText = document.getElementById('outText');
	
	var inputString = inputText.toString();
	var inputArray = inputString.split(' ');
	
	outputText.value = '';
	
	for (ti = 0; ti < inputArray.length; ti++)
	{
		var base = inputArray[ti];
		
		if (base.length > 3)
		{
			var partOne = base.slice(0, Math.floor(base.length / 2));
			var partTwo = base.slice(Math.floor(base.length / 2), base.length);
			
			var base = partOne + String.fromCharCode(0x200B) + partTwo;
		}
		
		outputText.value += base + ' ';
	}
}

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

var letterCap = ['A','B','C','D','E','F','G','H','i','J','k','l','m','N','o','p','Q','r','S','T','u','V','W','X','y','Z'];

function crapconvert()
{
	var inputText = document.getElementById('inText').value;
	var outputText = document.getElementById('outText');
	
	var inputString = inputText.toString();
	var inputArray = inputString.split(' ');
	
	outputText.value = '';
	
	for (ti = 0; ti < inputArray.length; ti++)
	{
		var base = inputArray[ti];
		
		var butt = base.replace(/v/g, 'v');//keep this it just does stuff
		
		var butt = butt.replace(/tion/g, 'shun');
		var butt = butt.replace(/sion/g, 'shun');
		var butt = butt.replace(/ought/g, 'awht');
		var butt = butt.replace(/ten/g, 'tan');
		var butt = butt.replace(/au/g, 'aw');
		var butt = butt.replace(/ing/g, 'in');
		var butt = butt.replace(/ee/g, 'e');
		var butt = butt.replace(/oo/g, 'ew');
		var butt = butt.replace(/lim/g, 'lem');
		var butt = butt.replace(/izza/g, 'etza');
		var butt = butt.replace(/sup/g, 'sewp');
		var butt = butt.replace(/awe/g, 'aw');
		var butt = butt.replace(/cern/g, 'sern');
		var butt = butt.replace('like', 'lik');
		var butt = butt.replace('are', 'r');
		var butt = butt.replace('your', 'ur');
		var butt = butt.replace('youre', 'your');
		var butt = butt.replace('think', 'tink');
		var butt = butt.replace('another', 'nudder');
		var butt = butt.replace('music', 'tunage');
		var butt = butt.replace('different', 'diff');
		var butt = butt.replace('anything', 'anyfink');
		var butt = butt.replace('people', 'folks');
		var butt = butt.replace('guy', 'geezer');
		var butt = butt.replace('fuck', 'fuk');
		var butt = butt.replace('fucking', 'fkin');
		var butt = butt.replace('something', 'summink');
		var butt = butt.replace('including', 'inc');
		var butt = butt.replace('that', 'tht');
		var butt = butt.replace('probably', 'prob');
		var butt = butt.replace('because', 'cuz');
		var butt = butt.replace('through', 'thru');
		var butt = butt.replace('before', 'b4');
		var butt = butt.replace('yeah', 'yea');
		var butt = butt.replace('yes', 'yea');
		var butt = butt.replace('nothing', 'nuthin');
		var butt = butt.replace('what', 'wut');
		var butt = butt.replace('wouldnt', 'wudnt');
		var butt = butt.replace('thanks', 'thx');
		var butt = butt.replace('thank', 'thx');
		var butt = butt.replace('sorry', 'sry');
		var butt = butt.replace('wrong', 'wrng');
		var butt = butt.replace('some', 'sum');
		var butt = butt.replace('mister', 'mester');
		var butt = butt.replace('come', 'cum');
		var butt = butt.replace('ate', '8');
		var butt = butt.replace('for', '4');
		var butt = butt.replace('and', '&');
		var butt = butt.replace('why', 'y');
		var butt = butt.replace('you', 'u');
		var butt = butt.replace('am', 'is');
		var butt = butt.replace('job', 'jeworb');
		/* CRAP THIS REPLACES ANYTHING WITH THESE LETTERS TO SOMETHING ELSE NEEEED TO FIX */
		
		/*var butt = butt.replace(/ate/g, '8');
		var butt = butt.replace(/o/g, '0');
		var butt = butt.replace(/s/g, '5');
		var butt = butt.replace(/l/g, '1');*/
		
		var randomNum = Math.floor( Math.random() * 10 ) + 1;
		var randComma = '';
		
		if (randomNum > 7)
		{
			if (randomNum > 9)
			{
				randComma = ',';
			} else {
				randComma = '.';
			}
		} else {
			if (randomNum == 1)
			{
				randComma = '?';
			} else {
				randComma = '';
			}
		}
		
		var firstChar = butt.charAt(0);
		var baseChar = butt.substr(1, (butt.length - 1));
		
		var capitalConvert = letterCap[letterNumber[firstChar]];
		
		if (typeof capitalConvert !== 'undefined')
		{
		butt = capitalConvert + baseChar;
		}
		
		var butt = butt.replace('pi', '\u03C0');
		
		outputText.value += butt + '' + randComma + ' ';
	}
}

function romajiTranslate()
{
	var inputText = document.getElementById('inText').value;
	var outputText = document.getElementById('outText');
	
	var inputString = inputText.toString();
	var inputArray = inputString.split(' ');
	
	outputText.value = '';
	
	for (ti = 0; ti < inputArray.length; ti++)
	{
		var base = inputArray[ti];
		
		
		var base = base.replace(/chi/g, '\u30c1');
		var base = base.replace(/dza/g, '\u30b6');
		var base = base.replace(/dze/g, '\u30bc');
		var base = base.replace(/dzo/g, '\u30be');
		var base = base.replace(/dzu/g, '\u30ba');
		var base = base.replace(/hyi/g, '\u30d2');
		var base = base.replace(/nyi/g, '\u30cb');
		var base = base.replace(/shi/g, '\u30b7');
		var base = base.replace(/tsu/g, '\u30c4');
		
		var base = base.replace(/ba/g, '\u30d0');
		var base = base.replace(/be/g, '\u30d9');
		var base = base.replace(/bi/g, '\u30d3');
		var base = base.replace(/bo/g, '\u30dc');
		var base = base.replace(/bu/g, '\u30d6');
		
		var base = base.replace(/da/g, '\u30c0');
		var base = base.replace(/de/g, '\u30c7');
		var base = base.replace(/do/g, '\u30c9');
		
		var base = base.replace(/fu/g, '\u30d5');
		
		var base = base.replace(/ga/g, '\u30ac');
		var base = base.replace(/ge/g, '\u30b2');
		var base = base.replace(/gi/g, '\u30ae');
		var base = base.replace(/go/g, '\u30b4');
		var base = base.replace(/gu/g, '\u30b0');
		
		var base = base.replace(/ha/g, '\u30cf');
		var base = base.replace(/he/g, '\u30d8');
		var base = base.replace(/ho/g, '\u30db');
		
		var base = base.replace(/ji/g, '\u30c2');
		
		var base = base.replace(/ka/g, '\u30ab');
		var base = base.replace(/ke/g, '\u30b1');
		var base = base.replace(/ki/g, '\u30ad');
		var base = base.replace(/ko/g, '\u30b3');
		var base = base.replace(/ku/g, '\u30af');
		
		var base = base.replace(/ma/g, '\u30de');
		var base = base.replace(/me/g, '\u30e1');
		var base = base.replace(/mi/g, '\u30df');
		var base = base.replace(/mo/g, '\u30e2');
		var base = base.replace(/mu/g, '\u30e0');
		
		var base = base.replace(/na/g, '\u30ca');
		var base = base.replace(/ne/g, '\u30cd');
		var base = base.replace(/no/g, '\u30ce');
		var base = base.replace(/nu/g, '\u30cc');
		
		var base = base.replace(/pa/g, '\u30d1');
		var base = base.replace(/pe/g, '\u30da');
		var base = base.replace(/pi/g, '\u30d4');
		var base = base.replace(/po/g, '\u30dd');
		var base = base.replace(/pu/g, '\u30d7');
		
		var base = base.replace(/ra/g, '\u30e9');
		var base = base.replace(/re/g, '\u30ec');
		var base = base.replace(/ri/g, '\u30ea');
		var base = base.replace(/ro/g, '\u30ed');
		var base = base.replace(/ru/g, '\u30eb');
		
		var base = base.replace(/sa/g, '\u30b5');
		var base = base.replace(/se/g, '\u30bb');
		var base = base.replace(/so/g, '\u30bd');
		var base = base.replace(/su/g, '\u30b9');
		
		var base = base.replace(/ta/g, '\u30bf');
		var base = base.replace(/te/g, '\u30c6');
		var base = base.replace(/to/g, '\u30c8');
		
		var base = base.replace(/wa/g, '\u30ef');
		
		var base = base.replace(/ya/g, '\u30e4');
		var base = base.replace(/yi/g, '\u30a4');
		var base = base.replace(/yo/g, '\u30e8');
		var base = base.replace(/yu/g, '\u30e6');
		
		var base = base.replace(/a/g, '\u30a2');
		var base = base.replace(/e/g, '\u30a8');
		var base = base.replace(/i/g, '\u30a4');
		var base = base.replace(/n/g, '\u30bd');
		var base = base.replace(/o/g, '\u30aa');
		var base = base.replace(/u/g, '\u30a6');
		
		outputText.value += base + ' ';
	}
}

var vowels = ['a','e','i','o','u'];
var hiloruy = ['a','e','h','i','l','o','r','u','y'];
var noVowels = ['b','c','d','f','g','h','i','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
var aCon = ['b','c','d','e','g','i','l','m','n','p','q','r','s','t','w','x'];
var eCon = ['a','b','c','d','f','g','h','l','n','p','q','r','s','t','v','x'];
var iCon = ['c','e','f','g','k','l','m','n','q','r','s','t'];
var qCon = ['u'];
var sCon = ['a','c','e','g','h','i','l','m','n','o','q','r','t','y'];
var xCon = ['a','e','i','j','o','y'];
var yCon = ['e','i','l','n','r'];

var letterCon = [
aCon,//a
vowels,//b
hiloruy,//c
hiloruy,//d
eCon,//e
hiloruy,//f
hiloruy,//g
vowels,//h
iCon,//i
vowels,//j
vowels,//k
vowels,//l
vowels,//m
vowels,//n
noVowels,//o
hiloruy,//p
qCon,//q
vowels,//r
sCon,//s
vowels,//t
noVowels,//u
hiloruy,//v
vowels,//w
xCon,//x
yCon,//y
vowels];//z

function randomconvert()
{
	var inputText = document.getElementById('inText').value;
	var outputText = document.getElementById('outText');
	
	var inputString = inputText.toString();
	var inputArray = inputString.split(' ');
	
	outputText.value = '';
	
	for (ti = 0; ti < inputArray.length; ti++)
	{
		var base = inputArray[ti];
		var randomBaseNumber = Math.floor( Math.random() * (base.length) ) + 1;
		
		var letcount = base.length - randomBaseNumber;
		var basechar = base.substr(0, randomBaseNumber);
		
		var butt = wordGen(basechar, letcount);
		
		outputText.value += butt + ' ';
	}
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

	return word;
}
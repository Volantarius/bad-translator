function findRegex(regex, str)
{
	//var regCheckPuncStops = /[\.\?\!]/g; //regex to find the punc stops
	
	var foundObject = [];
	
	while ( (match = regex.exec(str)) != null )
	{
		var obj = {str: str.charAt(match.index), index: match.index};
		
		foundObject.push(obj);
	}
	
	return foundObject;
}

function insertStringIntoString(strA, strB, pos)
{
	// strA goes into strB
	var leftPart = strB.slice(0, pos);
	var rightPart = strB.slice(pos, strB.length);
	
	var finalPart = leftPart + '' + strA + '' + rightPart;
	
	return finalPart;
}

var delay = 500;

function updateOutput(event)
{
	var inputString = event.target.value.toString();
	
	var regCheckWords = /[^a-zA-Z0-9\s]/g;//checks if theres any nonword characters
	
	if (!regCheckWords.test(inputString))
	{
		var inputWords = inputString.split(' ');//and seperate return
		
		document.getElementById('searchOutput').innerHTML = '';
		
		for (wi = 0; wi < inputWords.length; wi++)
		{
			var color = 'ccf';
			
			if (dictionaryGreetings[inputWords[wi].toLowerCase()]) {color = dictionaryGreetings.$col;}
			
			if (dictionaryConfirms[inputWords[wi].toLowerCase()]) {color = dictionaryConfirms.$col;}
			if (dictionaryDeclines[inputWords[wi].toLowerCase()]) {color = dictionaryDeclines.$col;}
			if (dictionaryConditions[inputWords[wi].toLowerCase()]) {color = dictionaryConditions.$col;}
			
			if (dictionaryStuff[inputWords[wi].toLowerCase()]) {color = dictionaryStuff.$col;}
			if (dictionaryQuestions[inputWords[wi].toLowerCase()]) {color = dictionaryQuestions.$col;}
			if (dictionaryVerbs[inputWords[wi].toLowerCase()]) {color = dictionaryVerbs.$col;}
			
			if (dictionaryItems[inputWords[wi].toLowerCase()]) {color = dictionaryItems.$col;}
			if (dictionaryPeople[inputWords[wi].toLowerCase()]) {color = dictionaryPeople.$col;}
			if (dictionaryNumbers[inputWords[wi].toLowerCase()]) {color = dictionaryNumbers.$col;}
			
			// need to detect if plural (s)'s
			// ownership
			// detect numbers and tys and teens with correct beginnings
			
			var rephrase = '<span style="background:#' + color + ';">' + inputWords[wi] + '</span> ';
			document.getElementById('searchOutput').innerHTML += rephrase;
		}
		
	} else {
		console.error('unacceptable character type in input', inputString.match(regCheckWords));
		
		document.getElementById('searchOutput').innerHTML = 'ERROR';
	}
	
}

var tid = setTimeout(function(){}, 100);

function testBuffer(event)
{
	clearTimeout(tid);
	tid = setTimeout(function(){updateOutput(event);}, delay);
}
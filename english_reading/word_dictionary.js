var dictionaryVerbs = {
	'$col':'ccc',
	'go':true,
	'stop':true,
	'repeat':true,
	'again':true,
	'quit':true,
	'continue':true,
	'at':true,
	'gave':true,
	'given':true,
	'went':true,
	'ask':true,
	'read':true,
	'in':true,
	'understand':true,
	'tell':true
};

var dictionaryQuestions = { //can only and forever be a question
	'$col':'cfc',
	'what':true,
	'why':true,
	'are':true,
	'where':true,
	'how':true
};

var dictionaryStuff = {
	'$col':'fcf',
	'was':true,
	'wasnt':true,
	'know':true,
	'knew':true,
	'should':true,
	'would':true,
	'could':true,
	'wont':true,
	'has':true,
	'hasnt':true,
	'did':true,
	'didnt':true,
	'do':true,
	'dont':true,
	'have':true,
	'kind':true
};

var dictionaryConfirms = {
	'$col':'afa',
	'true':true,
	'yea':true,
	'yeah':true,
	'yup':true,
	'positive':true,
	'ye':true,
	'y':true,
	'yes':true
};

var dictionaryDeclines = {
	'$col':'faa',
	'false':true,
	'negative':true,
	'decline':true,
	'n':true,
	'no':true
};

var dictionaryConditions = { //these only help with understanding, mostly to detect agression
	'$col':'fec',
	'not':true,
	'or':true,
	'nor':true,
	'and':true,
	'can':true,
	'cant':true,
	'is':true,
	'isnt':true,
	
	'always':true,
	'just':true,
	'actually':true,
	'actual':true,
	'need':true, //nueteral
	'needs':true,
	'really':true,
	'badly':true,
	'want':true,
	'never':true,
	'about':true,
	'very':true,
	'too':true,
	'slow':true,
	'fast':true,
	'will':true,
	'work':true,
	'working':true,
	'on':true,
	'off':true,
	'even':true,
	'only':true,
	
	'good':true, //good
	
	'stupid':true,
	'bad':true //bad
};

var dictionaryItems = { //knowledgable dictionary of different items
	'$col':'cff',
		'question':true,
	'this':true,
	'that':true,
	'there':true,
	'their':true,
	'theirs':true,
	'theyre':true,
	'they':true,
	'time':true,
	'us':true,
	'we':true,
	'lets':true,
	'these':true,
	'else':true,
	'its':true,
	'it':true //special case
};

var dictionaryPeople = { //knowledgable dictionary of different people
	'$col':'fdc',
	'he':true,
	'she':true,
	'me':true,
	'yourself':true,
	'i':true,
	'iam':true,
	'you':true
};

var dictionaryGreetings = {
	'$col':'fcc',
	'hello':true,
	'hi':true,
	'howdy':true,
	'yo':true,
	'greetings':true
};

var dictionaryNumbers = { //searcher needs to detect if the word is just numbers and highlight it
	'$col':'ffc',
	'a':true,
	'all':true,
	
	'single':true,
	'double':true,
	'triple':true,
	'quad':true,
	
	'once':true,
	'twice':true,
	'thrice':true,
	
	'zero':true,
	'one':true,
	'two':true,
	'three':true,
	'four':true,
	'five':true,
	'six':true,
	'seven':true,
	'eight':true,
	'nine':true,
	'ten':true,
	'eleven':true,
	'twelve':true,//teens, tys
	
	'hundred':true,
	'thousand':true,
	'million':true,
	'billion':true,
	'trillion':true, //a gazillion, bajillion or anything else can be sensed as sarcasm
	
	'nobody':true,
	'none':true
};
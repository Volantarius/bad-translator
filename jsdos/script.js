var dosColor = dosColor || {};
dosColor['0'] = '#000000'; //black
dosColor['1'] = '#000080'; //blue
dosColor['2'] = '#008000'; //green
dosColor['3'] = '#008080'; //aqua
dosColor['4'] = '#800000'; //red
dosColor['5'] = '#800080'; //purple
dosColor['6'] = '#808000'; //yellow
dosColor['7'] = '#c0c0c0'; //white
dosColor['8'] = '#808080'; //gray
dosColor['9'] = '#0000ff'; //light blue
dosColor['a'] = '#00ff00'; //light green
dosColor['b'] = '#00ffff'; //light aqua
dosColor['c'] = '#ff0000'; //light red
dosColor['d'] = '#ff00ff'; //light purple
dosColor['e'] = '#ffff00'; //light yellow
dosColor['f'] = '#ffffff'; //bright white

var colorCheck = {'0':true,'1':true,'2':true,'3':true,'4':true,
'5':true,'6':true,'7':true,'8':true,'9':true,'a':true,'b':true,
'c':true,'d':true,'e':true,'f':true};

//Current foreground and background color palette
var consoleFore = '#c0c0c0';
var consoleBack = '#000000';

//MAIN JSDOS OBJECT
var jsdos = jsdos || {};

jsdos.print = function(arg) {
	//EXAMPLE :: jsdos.print([ ['ass1', '1', 'c'],['ass2', 'c', '1'],['donkey'] ]);
	for (var i = 0; i < arg.length; i++)
	{
		
		if (arg[i].length > 1)
		{
			
			if ((colorCheck[arg[i][1]]) && (colorCheck[arg[i][2]]))
			{
				document.getElementById('mainecho').innerHTML += '<span style="background:' +
				dosColor[arg[i][1]] + ';color:' + dosColor[arg[i][2]] + ';">' +
				arg[i][0] + '</span>';
			} else {
				jsdos["echo"](['Error printing.']);
			}
			
		} else {
			document.getElementById('mainecho').innerHTML += arg[i][0];
		}
		
	}
	document.getElementById('mainecho').innerHTML += '\n';
}

jsdos.echo = function(arg) {
	var str = arg.join(' ');
	
	document.getElementById('mainecho').innerHTML += str + '\n';
}

jsdos.help = function() {
	var help1 = 'Type command-line HELP for for specific help.';
	var help2 = '\nCD         Changes the directory.';
	var help3 = '\nDIR        Displays contents of current directory.';
	var help4 = '\nECHO       Echos string to console.';
	var help5 = '\nCOLOR      Change colors of the console.';
	
	jsdos.echo([help1, help2, help3, help4, help5, '\n']);
}

var jsdosDirectory = {
	users:{
		volante:{}
	},
	programs:{
		'vmap.exe':false
	},
	games:{
		'doom.exe':false
	}
};

var sysDir = jsdosDirectory;
var currentDirectory = [];
var tempDirectory = [];

function updateDirDis()
{
	var dir = currentDirectory.join('\\');
	document.getElementById('dirdisplay').innerHTML = dir;
}

jsdos.dir = function() {
	//DIR should also show how many files and whatever are inside
	var keys = Object.keys(sysDir);
	var dir = keys.join('\n');
	
	var title = '    Directory of C:\\' + currentDirectory.join('\\');
	
	jsdos.print([ [title + '\n'],[dir + '\n'] ]);
}

jsdos.cd = function(arg) {
	var args = arg[0].toString();
	var cd = args.split('\\');
	
	tempDirectory = currentDirectory.slice();
	
	for (var ii = 0; ii < cd.length; ii++)
	{
		if (cd[ii] == '..')
		{
			tempDirectory.pop();
		} else {
			tempDirectory.push(cd[ii]);
		}
		
	}
	
	var error = false;
	
	for (var iii = -1; iii < tempDirectory.length; iii++)
	{
		if (iii == -1)
		{
			sysDir = jsdosDirectory;
		} else {
			
			if (sysDir[ tempDirectory[iii] ])
			{
				sysDir = sysDir[ tempDirectory[iii] ];
			} else {
				error = true;
				break;
			}
		}
	}
	
	if (error)
	{
		jsdos.echo(['Invalid filepath.\n']);
	} else {
		currentDirectory = tempDirectory;
		jsdos.echo(['']);
	}
}

jsdos.color = function(arg) {
	
	if (arg == 'help')
	{
		jsdos.echo(['COLOR BACKGROUND FOREGROUND\n']);
	} else {
		
		if ( arg[0].length == 2 )
		{
			var ccol = arg[0].split('');
		} else {
			var ccol = [ 0, arg[0] ];
		}
		
		if (colorCheck[ccol[1]])
		{
			var cF = ccol[1];
			document.getElementById('main').style.color = dosColor[cF];
			document.getElementById('mainecho').style.color = dosColor[cF];
			consoleFore = dosColor[cF];
		} else {
			jsdos.echo(['Invalid colors.']);
		}
		
		if (colorCheck[ccol[0]])
		{
			var cB = ccol[0];
			document.getElementById('main').style.backgroundColor = dosColor[cB];
			document.getElementById('mainecho').style.backgroundColor = dosColor[cB];
			document.getElementById('HSB').style.backgroundColor = dosColor[cB];
			
			document.body.style.backgroundColor = dosColor[cB];
			consoleBack = dosColor[cB];
		} else {
			//do nothing
		}
		jsdos.echo(['']);
	}
}

jsdos.cls = function() {
	document.getElementById('mainecho').innerHTML = '';
}

jsdos.time = function() {
	var date = new Date();
	var time = date.getHours() + ':' + date.getMinutes();
	var title = 'The time is: ' + time;
	jsdos.echo([title + '\n']);
}

//need to make a way to load false programs (like a program will specify a directory of its location)
//move, cut, paste, and delete

var jsdosCMD = true;

jsdos.inputmode = function(arg) {
	if (arg) {
		jsdosCMD = true;
		document.getElementById('inputItself').style.opacity = '0';
		return true;
	} else {
		jsdosCMD = false;
		document.getElementById('inputItself').style.opacity = '0';
		return false;
	}
}

// #####################################################

function consoleInit() {
	var line1 = 'JS-DOS [Version 1.1.00]';
	var line2 = '\nCopyright (c) 2016 Volante Corporation. All rights reserved.';
	
	updateConsoleThing();
	updateDirDis();
	jsdos.echo([line1, line2, '\n']);
}

var cSelect = false;

function consoleFocus(e) {
	if ((jsdosCMD) && (!cSelect)) {
		document.getElementById('hiddenInput').focus();
	} else {
		//e.target.focus();
	}
}

function consoleBlur(e) {
	cSelect = false;
}

function consoleSelect(e) {
	if (cSelect)
	{
		cSelect = false;
	} else {
		cSelect = true;
	}
}

function consoleInput(e) {
	//when jsdos input is disabled for like games and stuff
	//e.preventDefault();
	
	document.getElementById('main').scrollTop = document.getElementById('main').scrollHeight;
	
	document.getElementById('fakeInput').innerHTML = e.key;
}

var fakeInputSelectionStart = 0;
var fakeInputSelectionEnd = 0;

function updateConsoleThing() {
	var hiddenInput = document.getElementById('hiddenInput').value.toString() + ' ';
	
	if (fakeInputSelectionStart == fakeInputSelectionEnd)
	{
		var part1 = hiddenInput.slice(0, fakeInputSelectionStart);
		var part2 = hiddenInput.slice(fakeInputSelectionStart, (fakeInputSelectionEnd + 1));
		var part3 = hiddenInput.slice((fakeInputSelectionEnd + 1), hiddenInput.length);
	} else {
		var part1 = hiddenInput.slice(0, fakeInputSelectionStart);
		var part2 = hiddenInput.slice(fakeInputSelectionStart, fakeInputSelectionEnd);
		var part3 = hiddenInput.slice(fakeInputSelectionEnd, hiddenInput.length);
	}
	
	document.getElementById('fakeInput').innerHTML = part1 +
	'<span style="background:' + consoleFore + ';color:' + consoleBack + ';">' + part2 + '</span>' + part3;
	
	document.getElementById('main').scrollTop = document.getElementById('main').scrollHeight;
	window.scrollTo(0,document.body.scrollHeight);
}

function fakeFocus(e) {
	e.target.setSelectionRange(e.target.value.length, e.target.value.length);
	
	updateConsoleThing();
	
	//document.getElementById('main').style.outline = 'none';
}

function fakeBlur(e) {
	updateConsoleThing();
	
	//document.getElementById('main').style.outline = '2px solid #f00';
}

function fakeKeydown(e) {
	document.getElementById('main').scrollTop = document.getElementById('main').scrollHeight;
	window.scrollTo(0,document.body.scrollHeight);
	
	fakeInputSelectionStart = e.target.selectionStart;
	fakeInputSelectionEnd = e.target.selectionEnd;
	
	updateConsoleThing();
}

function fakeKeyup(e) {
	document.getElementById('main').scrollTop = document.getElementById('main').scrollHeight;
	window.scrollTo(0,document.body.scrollHeight);
	
	fakeInputSelectionStart = e.target.selectionStart;
	fakeInputSelectionEnd = e.target.selectionEnd;
	
	updateConsoleThing();
	
	if (e.key == "Enter") {
		var inputString = e.target.value.toString();
		var dir = currentDirectory.join('\\');
		
		document.getElementById('mainecho').innerHTML += 'C:\\' + dir + '\\>' + inputString + '\n';
		
		handleinput(e.target.value);
		
		e.target.value = '';
		updateConsoleThing();
		document.getElementById('fakeInput').innerHTML = '<span style="background:' + consoleFore + ';color:' + consoleBack + ';"> </span>';
		updateDirDis();
	}
	
}

function handleinput(str) {
	var inputArray = str.split(' ');
	
	var arg = str.split(' ');
	arg.reverse();
	arg.pop();
	arg.reverse();
	
	if (typeof jsdos[inputArray[0]] == 'function')
	{
		jsdos[inputArray[0]](arg);
	} else {
		var thing = inputArray[0];
		jsdos.echo(['\'' + thing + '\' was not recognized. Try using \'help\'.\n']);
	}
}

function debugPrint(str) {
	document.getElementById('debugConsole').innerHTML += str;
}

function wresize(e)
{
	if (window.innerWidth < 906) {
		document.getElementById('debugConsole').style.opacity = '0';
	} else {
		document.getElementById('debugConsole').style.opacity = '1';
	}
	
}
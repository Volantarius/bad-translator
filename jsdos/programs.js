jsdos.calctest = function() {
	var i = 0;
	
	while (i < 10) {
		jsdos.echo([i]);
		
		i++;
	}
	
	jsdos.echo(['']);
}

jsdos.modetest = function(arg) {
	jsdos.inputmode(false);
	window.focus();
	jsdos.cls();
}
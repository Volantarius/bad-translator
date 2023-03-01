var jsinternet = jsinternet || {};

var b64table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

var portTypes = {
	//only tcp ports
	'20':{type:'ftp', pri:'both'},
	'22':{type:'ssh', pri:'host'},
	'25':{type:'smtp', pri:'private'},
	'53':{type:'dns', pri:'host'},
	'70':{type:'gopher', pri:'private'},
	'80':{type:'http', pri:'host'},
	'110':{type:'pop3', pri:'private'},
	'113':{type:'auth', pri:'both'}
};

//NEED A PING AND SSH PROGRAMS

var TLD = { //can be basically the difficulty levels
	'com':true,
	'org':true,
	'net':true,
	'edu':true,
	'gov':true,
	'mil':true
};

var DNS = {
	//also includes the domain names
	'10.2.2.2':{host:'Z10N0101', tld:'com', 'private':true, portseed:false}
	
};

function encrypt(str, key) {
	var output = '';
	
	var keyNumber = 0;
	
	for (var k = 0; k < key.length; k++)
	{
		var yy = key.charCodeAt(k);
		
		keyNumber = keyNumber + yy;
	}
	
	var vv = str.split('');
	
	for (var i = 0; i < str.length; i++)
	{
		var cc = b64table.indexOf(vv[i]);
		
		var oii = cc ^ (keyNumber + i);
		
		output += oii.toString(36);
	}
	
	return output;
}

function decrypt(str, key) {
	var output = '';
	
	var keyNumber = 0;
	
	for (var k = 0; k < key.length; k++)
	{
		var yy = key.charCodeAt(k);
		
		keyNumber = keyNumber + yy;
	}
	
	var vv = str.split('');
	
	for (var i = 0; i < str.length; i++, i++)
	{
		var aa = vv[i] + '' + vv[i+1];
		
		var cc = parseInt(aa, 36);
		
		var oii = cc ^ (keyNumber + Math.ceil(i / 2) );
		
		output += b64table.charAt(oii);
	}
	
	return output;
}

jsdos.menc = function(arg) {
	jsdos.echo(['        \u003c8\u03a9~' + ' sniffing the cheese...']);
	
	var str = arg[0];
	var key = arg[1];
	
	var out = encrypt(str, key);
	
	var keyNumber = 0;
	for (var k = 0; k < key.length; k++)
	{
		var yy = key.charCodeAt(k);
		
		keyNumber = keyNumber + yy;
	}
	
	jsdos.echo(['        OUTPUT: ' + out + '\n']);
	jsdos.echo(['        KEY:    ' + keyNumber + '\n']);
}

jsdos.mdenc = function(arg) {
	jsdos.echo(['        \u003c8\u03a9~' + ' sniffing the cheese...']);
	
	var str = arg[0];
	var key = arg[1];
	
	var out = decrypt(str, key);
	
	var keyNumber = 0;
	for (var k = 0; k < key.length; k++)
	{
		var yy = key.charCodeAt(k);
		
		keyNumber = keyNumber + yy;
	}
	
	jsdos.echo(['        OUTPUT: ' + out + '\n']);
	jsdos.echo(['        KEY:    ' + keyNumber + '\n']);
}

function generateIP(str, tld) { //used for IP generation
	var hash = 0;
	
	for (var i = 0; i < str.length; i++)
	{
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	
	var neg = false;
	var hashpos = '0000000000';
	
	if (hash < 0) {
		neg = true;
		hashpos = (-1 * hash).toString();
	} else {
		neg = false;
		hashpos = hash.toString();
	}
	
	var hasharray = hashpos.split('');
	var array = [];
	var temp = 'x';
	
	for (var j = 0; j < 10; j++) //0-9 so 10 digits
	{
		
		if (typeof hasharray[j] === 'undefined') {
			hasharray[j] = 0;
		}
		
		if (((j + 1) % 2) == 0) {
			//even
			temp = temp + '' + hasharray[j];
			array.push(temp);
			temp = '';
		} else {
			//odd
			if (hasharray[j] == '0') {
				temp = '';
			} else {
				temp = hasharray[j];
			}
			
		}
		
	}
	
	if (neg) {
		//negative
		var one = 2 * parseInt(array[0], 10);
		var two = 200 - parseInt(array[1], 10);
		var three = 200 - parseInt(array[2], 10);
		var four = 200 - parseInt(array[3], 10);
		
		var ip = one + '.' + two + '.' + three + '.' + four;
	} else {
		//positive
		var one = 2 * parseInt(array[0], 10);
		var two = parseInt(array[1], 10);
		
		var ip = one + '.' + two + '.' + array[2] + '.' + array[3];
	}
	
	//VERY IMPORTANT TO AVOID DUPLICATES
	DNS[str] = {};
	DNS[str].tld = tld;
	DNS[str].ip = ip;
	
	DNS[ip] = {};
	DNS[ip].host = str;
	DNS[ip].port = {};
	DNS[ip].tld = tld;
	
	if ( (one == 10) || (one == 172) || (one == 192) )
	{
		if ( (one == 172) && (two >= 16) && (two <= 31) )
		{
			DNS[ip]['private'] = true;
		}
		
		if ( (one ==  192) && (two == 168) )
		{
			DNS[ip]['private'] = true;
		}
		
		if (one == 10)
		{
			DNS[ip]['private'] = true;
		}
		
		if (DNS[ip]['private'] == true)
		{
			DNS[ip]['private'] = true;
		} else {
			DNS[ip]['private'] = false;
		}
		
	} else {
		DNS[ip]['private'] = false;
	}
	
	debugPrint(ip + '\n');
	return ip;
}

function determineip(ip) {
	var ips = ip.split('.');
	
	DNS[ip] = {};
	DNS[ip].host = false;
	DNS[ip].port = {};
	
	var one = parseInt(ips[0], 10);
	var two = parseInt(ips[1], 10);
	var three = parseInt(ips[2], 10);
	var four = parseInt(ips[3], 10);
	
	if ( (one == 10) || (one == 172) || (one == 192) )
	{
		if ( (one == 172) && (two >= 16) && (two <= 31) )
		{
			DNS[ip]['private'] = true;
		}
		
		if ( (one ==  192) && (two == 168) )
		{
			DNS[ip]['private'] = true;
		}
		
		if (one == 10)
		{
			DNS[ip]['private'] = true;
		}
		
		if (DNS[ip]['private'] == true)
		{
			DNS[ip]['private'] = true;
		} else {
			DNS[ip]['private'] = false;
		}
		
	} else {
		DNS[ip]['private'] = false;
	}
	
}

function generateports(ip) {
	var ips = ip.split('.');
	var pri = DNS[ip]['private'];
	var port = Object.keys(portTypes);
	var priname = 'host';
	DNS[ip].port = {};
	
	//THIS BITCH NEEDS A BIG ASS OVERHAUL
	//create metadata of the server itself!
	//how many open and closed ports for example
	
	if (pri)
	{
		//private
		priname = 'private';
	} else {
		//host
		priname = 'host';
	}
	
	for (var hj = 0; hj < port.length; hj++)
	{
		var portkey = port[hj];
		
		if ( (portTypes[portkey].pri == priname) || (portTypes[portkey].pri == 'both') )
		{
			DNS[ip]['port'][portkey] = true;
		} else {
			DNS[ip]['port'][portkey] = false;
		}
		
	}
	
}

var regCheckWords = /[^a-z0-9\s]/g;

jsdos.vmap = function(arg) {
	
	if (typeof arg[0] === 'undefined') {
		jsdos.echo(['no addresses defined\n']);
		
		return false;
	} else {
		var address = arg[0].split('.');
		var addressIp = false;
		var valid = false;
		
		if ( (address.length == 4) && (!isNaN(address[0])) && (!isNaN(address[1])) && (!isNaN(address[2])) && (!isNaN(address[3])) )
		{
			if ( (address[0] < 256) && (address[1] < 256) && (address[2] < 256) && (address[3] < 256) && (address[0] >= 0) && (address[1] >= 0) && (address[2] >= 0) && (address[3] >= 0) )
			{
				// Valid IP address given
				addressIp = true;
				valid = true;
			} else {
				valid = false;
				jsdos.echo(['Invalid ip address given']);
				jsdos.echo([' ']);
			}
		} else {
			if ((address.length == 3) && (address.length < 17) && (TLD[address[2]]) && (address[1].length >= 3) && (address[0] == 'www'))
			{
				if ((!regCheckWords.test(address[1])) && (!regCheckWords.test(address[2])))
				{
					//Valid domain name given
					valid = true;
				} else {
					valid = false;
					jsdos.echo(['Invalid domain name given']);
					jsdos.echo([' ']);
				}
			} else {
				valid = false;
				jsdos.echo(['Invalid domain name given']);
				jsdos.echo([' ']);
			}
		}
		
		var d = new Date();
		var ip = false;
		
		var valid2 = false;
		
		if (valid)
		{
			valid2 = true;
			if (addressIp)
			{
				//IP ADDRESS GIVEN
				
				if ( DNS[ arg[0] ] )
				{
					//IP already generated
					generateports(arg[0]);
				} else {
					determineip(arg[0]);
					generateports(arg[0]);
				}
				ip = arg[0];
				
			} else {
				//DOMAIN NAME GIVEN
				
				if ( DNS[ address[1] ] )
				{
					//domain already generated
					if ( DNS[ address[1] ].tld == address[2] )
					{
						//same domain recieved
						generateports( DNS[ address[1] ].ip );
					} else {
						//incorrect tld for the domain
						valid2 = false;
						jsdos.echo(['Invalid tld given for domain']);
						jsdos.echo([' ']);
					}
					
				} else {
					ip = generateIP(address[1], address[2]);
					generateports(ip);
				}
			}
		}
		
		if ( (valid2) && (arg[1] !== '-nc') )
		{
			jsdos.echo(['Starting Vmap 3.14 BETA at ' + d]);
			if (addressIp) {
				if ( DNS[ip].host ) {
					jsdos.echo(['Vmap scan report for ' + ip + ' (' + DNS[ip].host + '.' + DNS[ip].tld + ')']);
				} else {
					jsdos.echo(['Vmap scan report for ' + ip + '']);
				}
			} else {
				jsdos.echo(['Vmap scan report for ' + arg[0] + ' (' + ip + ')']);
			}
			
			var delay = 1;
			var portnum = Object.keys( portTypes );
			
			setTimeout(function(){
				jsdos.echo(['Interesting ports on (' + ip + '):']);
			}, 200 + delay);
			
			setTimeout(function(){
				jsdos.echo(['(The ' + portnum.length + ' ports scanned but not shown below are in state: closed)']);
				jsdos.echo(['PORT      STATE        SERVICE']);
			}, 225 + delay);
			
			for (var p = 0; p < portnum.length; p++)
			{
				delay = delay + 20;
				var blah = portnum[p];
				
				if ( DNS[ip]['port'][blah] )
				{
					setTimeout(function(){
						jsdos.echo([ p + '/tcp    open    ssh' ]);
					}, 250 + delay);
				}
				
			}
			
		}
		
		setTimeout(function(){
			jsdos.echo(['']);
			jsdos.echo(['Vmap run completed']);
			jsdos.echo([' ']);
		}, 425 + delay);
		
		return true;
	}
	
};


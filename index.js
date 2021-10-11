var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	if (req.url === '/reg.html' || req.url === '/') {
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		fs.createReadStream(__dirname + '/reg.html', 'utf8').pipe(res);
	}
	else if (req.url === '/main.html') {
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		fs.createReadStream(__dirname + '/main.html', 'utf8').pipe(res);
	}
	else if (req.url === '/quest.html') {
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		fs.createReadStream(__dirname + '/quest.html', 'utf8').pipe(res);
	}
});

server.listen(3000, '127.0.0.1');
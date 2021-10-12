var http = require('http');
var experss = require('express');

var app = experss();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('');
app.get('/reg.html', function(req, res) {
	res.sendFile(__dirname + '/reg.html');
});

app.post('/reg', urlencodedParser, function (req, res) {
	res.send('welcome, ' + req.body.login);
});

app.get('/main.html', function(req, res) {
	res.sendFile(__dirname + '/main.html');
});

app.get('/quest.html', function(req, res) {
	res.sendFile(__dirname + '/quest.html');
});

app.listen(3000);
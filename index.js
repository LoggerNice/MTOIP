var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var express = require('express');
var app = express();
var registration = require('./modules/inputs');
var database = require('./modules/database');

app.use(express.static('links'));

app.post('/reg', urlencodedParser, function (req, res) {
	if (registration.appPost(req, res) == 5) {
		database.insertDate(req, res);
	}
});

app.listen(3000);
console.log("Сервер запущен");
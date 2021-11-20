const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const express = require('express');
const app = express();
app.use(express.static('views'));
app.set('view engine', 'ejs');

const database = require('./modules/database');
app.get('/list', function(req, res) {
	database.selectDate(res);
});

const registration = require('./modules/inputs');
app.post('/reg', urlencodedParser, function (req, res) {
	if (registration.appPost(req, res) == 5) {
		database.insertDate(req, res);
	}
});

const storage = require('./modules/upload');
app.use(multer({storage: storage.getStorage()}).single("image"));
app.post("/upload", (req, res) => {
    console.log("Файл загружен ");
});

app.post('/quest', urlencodedParser, function (req, res) {
	database.insertQuestDate(req, res);
	
});

app.listen(3000);
console.log("Сервер запущен");
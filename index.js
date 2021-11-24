const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const express = require('express');
const app = express();

app.use(express.static('views'));
app.set('view engine', 'ejs');

const database = require('./modules/database');
app.get('/list', function(req, res) {
	database.selectDate(res);
});

const storage = require('./modules/upload');
app.use(multer({storage: storage.getStorage()}).single("image"));
app.post("/uploadPhoto", (req, res) => {
	console.log("Фото загружено");
});

app.post('/quest', urlencodedParser, function (req, res) {
	database.insertQuestDate(req, res);	
	res.redirect("list");
});

app.post("/uploadDoc", (req, res) => {
	console.log("Документ загружен");
});

const registration = require('./modules/inputs');
app.post('/reg', urlencodedParser, function (req, res) {
		if (registration.appPost(req, res) == 5) {
			database.insertDate(req, res);
			res.redirect("quest.html");
		}
});

app.listen(3000);
console.log("Сервер запущен");
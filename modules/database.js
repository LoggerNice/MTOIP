var sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const e = require('express');

const storage = require('./upload');
var data;
var dataLogin;

exports.insertDate = async function(req, res) {
    var db = new sqlite3.Database('./users.db');
    data = req.body;
    const hash = await bcrypt.hash(data.inpPassword, 7);
    
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO users (login, password, phone, mail, document) VALUES (?, ?, ?, ?, ?)");
        stmt.run(data.inpLogin, hash, data.inpPhone, data.inpMail, storage.getFilename());
        stmt.finalize();
    });
    
    db.close();
}

exports.insertQuestDate = async function(req, res) {
    var db = new sqlite3.Database('./users.db');
    data = req.body;

    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO questions (quest, photo, name) VALUES (?, ?, ?)");
        stmt.run(data.inpQuestion, storage.getFilename(), data.inpLogin);
        stmt.finalize();
    });

    db.close();
}

exports.selectDate = async function(res) {
    var db = new sqlite3.Database('./users.db');
    db.all('SELECT quest, photo, name FROM questions', (err, rows) => {
        let len = rows.length
	    res.render('list', {rows: rows, len: len});
    });
}

exports.selectUser = async function(req, res) {
    dataLogin = req.body;
    let sql = 'SELECT login, password FROM users WHERE login = ?';
    var db = new sqlite3.Database('./users.db');
    
    db.get(sql, [dataLogin.loginUser], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        row ? console.log("Пользователь был найден") : console.log(`Не было найдено пользователя ${dataLogin.loginUser}`);
        
        const validPass = bcrypt.compareSync(dataLogin.loginPass, row.password);
        if (!validPass) {
            return console.log("Неверный пароль!");
        }
        else {
            res.redirect("quest.html");
            return console.log("Замечательно, все верно");
        }
    });

}
var sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const e = require('express');

var data;
var db = new sqlite3.Database('./users.db');

exports.insertDate = async function(req, res) {
    data = req.body;
    const hash = await bcrypt.hash(data.inpPassword, 7);
    
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO users (login, password, phone, mail) VALUES (?, ?, ?, ?)");
        stmt.run(data.inpLogin, hash, data.inpPhone, data.inpMail);
        stmt.finalize();
    });
    
    db.close();
}

exports.insertQuestDate = async function(req, res) {
    data = req.body;
    const storage = require('./upload');

    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO questions (quest, photo, name) VALUES (?, ?, ?)");
        stmt.run(data.inpQuestion, storage.getFilename(), data.inpLogin);
        stmt.finalize();
    });

    db.close();
}

exports.selectDate = async function(res) {
    db.all('SELECT quest, photo, name FROM questions', (err, rows) => { 
	    res.render('list', {rows: rows});
    });
}
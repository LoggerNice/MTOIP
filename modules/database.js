var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');

module.exports.insertDate = async function(req, res) {
    var data = req.body;

    try {
        const hashedPassword = await bcrypt.hash(data.inpPassword, 7);
        users.push({
            login: data.inpLogin,
            password: hashedPassword,
            phone: data.inpPhone,
            mail: data.inpMail
        });
        res.redirect('/main');
    } catch {
        res.redirect('/reg');
    }

    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
        stmt.run("Ipsum " + i);
        stmt.finalize();
    });
}

db.close();
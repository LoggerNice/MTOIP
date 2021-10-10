function errOneType(inputText, inputID) {
    if (inputText.length < 5) {
        document.getElementById(inputID).style.borderColor='red';
        return 0;
    } else {
        document.getElementById(inputID).style.borderColor='#832492';
        return 1;
    }
}

function errPhone(inputPhone, inputID) {
    if (inputPhone.length != 11) {
        document.getElementById(inputID).style.borderColor='red';
        return 0;
    } else {
        document.getElementById(inputID).style.borderColor='#832492';
        return 1;
    }
}

function errPass(inputPass, inputPass2, inputID) {
    if (inputPass === inputPass2) {
        document.getElementById(inputID).style.borderColor='#832492';
        return 1;
    } else {
        document.getElementById(inputID).style.borderColor='red';
        return 0;
    }
}

function add() {
    let inputLogin = document.getElementById("login").value;
    let inputPhone = document.getElementById("phone").value;
    let inputMail = document.getElementById("mail").value;
    let inputPass = document.getElementById("password").value;
    let inputPass2 = document.getElementById("password_repeat").value;

    let success = 0;
    success = errOneType(inputLogin, 'login') + errPhone(inputPhone, 'phone') + errOneType(inputMail, 'mail') + errOneType(inputPass, 'password') + errPass(inputPass, inputPass2, 'password_repeat');

    if (success == 5) {
        var bcrypt = require('bcryptjs');
        var bcrypt = dcodeIO.bcrypt;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("B4c0/\/", salt);
        alert(hash);
    }
}
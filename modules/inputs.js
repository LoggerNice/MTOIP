
function errOneType(inputText) {
    if (inputText.length < 5) {
        return 0;
    } else {
        return 1;
    }
}

function errPhone(inputPhone) {
    if (inputPhone.length != 11) {
        return 0;
    } else {
        return 1;
    }
}

function errPass(inputPass, inputPass2) {
    if (inputPass === inputPass2) {
        return 1;
    } else {
        return 0;
    }
}

exports.appPost = function(req, res) {
    var data = req.body;
    var count = 0;
    
    count = errOneType(data.inpLogin) + errPhone(data.inpPhone) + errOneType(data.inpMail) + errOneType(data.inpPassword) + errPass(data.inpPassword, data.inpPassword_repeat);
    return count;
}
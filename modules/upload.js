const multer = require('multer');
const path = require('path');
let fs = require('fs-extra');

let filename = ""; 
exports.getStorage = function() {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let path = `./views/uploads`;
            fs.mkdirs(path);
            cb(null, path);
        },
        filename: (req, file, cb) => {
            filename = file.originalname;
            cb(null, filename);
        },
    });
    return storage;
}

exports.getFilename = function() {
    return "../uploads/" + filename;
}
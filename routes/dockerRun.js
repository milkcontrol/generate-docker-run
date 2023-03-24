const express = require("express");
const router = express.Router();
const multer  = require('multer')

const genDRController = require("../controller/dockerRun.controller");
var fs = require('fs');


const upload = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('???????')
        const folderPath = `${__dirname}/../uploads`;
        if (!fs.existsSync(`${__dirname}/../uploads`))
            fs.mkdirSync(`${__dirname}/../uploads`);
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
        return cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        //cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
        cb(null, file.originalname.replace(/\s/g, '_'));
    }
}) })



router.post("/gen", upload.single('file'), genDRController.generateDR);


module.exports = router


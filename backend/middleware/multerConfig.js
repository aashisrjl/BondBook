const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        const date = Date.now();
        cb(null, date + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf','image/webp'];
    if (!allowedFileTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type'), false); 
    }
    cb(null, true);
};

const upload = multer({
    storage: storage
});

module.exports = {
    upload 
};